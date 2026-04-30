// Kamloops regional overview — Leaflet map with custom editorial markers,
// service-area polygon, real OSRM driving routes (with distance + drive-time
// pills), browser-geolocation "Locate Me", and click popups with a universal
// Google Maps "Get Directions" link.
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";

const KAMLOOPS = [50.6745, -120.3273];

// Andrew's monotone chain — convex hull on [lat, lng] points (lng=x, lat=y).
function convexHull(points) {
  const pts = [...points].sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  if (pts.length <= 2) return pts;
  const cross = (O, A, B) =>
    (A[1] - O[1]) * (B[0] - O[0]) - (A[0] - O[0]) * (B[1] - O[1]);
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

function expandHull(hull, deltaDeg) {
  const cx = hull.reduce((s, p) => s + p[1], 0) / hull.length;
  const cy = hull.reduce((s, p) => s + p[0], 0) / hull.length;
  return hull.map(([lat, lng]) => {
    const dx = lng - cx;
    const dy = lat - cy;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    return [lat + (dy / len) * deltaDeg, lng + (dx / len) * deltaDeg];
  });
}

// Haversine — great-circle distance in meters (fallback if OSRM is down).
function haversineMeters([lat1, lng1], [lat2, lng2]) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Public OSRM demo server. Rate-limited; for production consider self-hosting
// or OpenRouteService.
async function fetchRoute(from, to) {
  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${from[1]},${from[0]};${to[1]},${to[0]}` +
    `?overview=full&geometries=geojson`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("OSRM " + res.status);
    const data = await res.json();
    const r = data.routes?.[0];
    if (!r) throw new Error("no route");
    return {
      geometry: r.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
      distance: r.distance,
      duration: r.duration,
      road: true,
    };
  } catch {
    const dist = haversineMeters(from, to);
    return {
      geometry: [from, to],
      distance: dist,
      // crude estimate: 60 km/h average rural BC drive
      duration: (dist / 1000 / 60) * 3600,
      road: false,
    };
  }
}

const lakeIcon = (index, active) =>
  L.divIcon({
    className: "lake-pin",
    html: `
      <div class="pin ${active ? "is-active" : ""}">
        <span class="pin-num">${String(index + 1).padStart(2, "0")}</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

const homeIcon = () =>
  L.divIcon({
    className: "home-pin",
    html: `<div class="home-pin-inner"><span>K</span></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });

const userIcon = () =>
  L.divIcon({
    className: "user-pin",
    html: `<div class="user-pin-inner"><span></span></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

const directionsUrl = ([lat, lng]) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;

const popupHtml = (l, i) => `
  <div class="lake-popup">
    <div class="popup-eyebrow">N°${String(i + 1).padStart(2, "0")} · ${escapeHtml(
  l.distance.split("(")[0].trim()
)}</div>
    <div class="popup-name">${escapeHtml(l.name)}</div>
    <a class="popup-directions"
       href="${directionsUrl(l.coords)}"
       target="_blank"
       rel="noopener noreferrer">
      Get Directions →
    </a>
  </div>
`;

const fmtKm = (m) => (m / 1000).toFixed(m < 10000 ? 1 : 0);
const fmtMin = (s) => Math.round(s / 60);

export default function KamloopsMap({ lakes, active, onSelect }) {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const routesRef = useRef([]); // { line, pill, distance, duration, road }
  const userMarkerRef = useRef(null);
  const userLineRef = useRef(null);
  const [routesReady, setRoutesReady] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Init map (once)
  useEffect(() => {
    if (mapRef.current || !mapEl.current) return;

    const map = L.map(mapEl.current, {
      center: [50.7, -120.05],
      zoom: 9,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    });

    // CartoDB Voyager — colored roads + labels, Google-Maps-like.
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · <a href="https://carto.com/attributions">CARTO</a> · routes <a href="https://project-osrm.org/">OSRM</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    // Service-area polygon
    const hull = convexHull([...lakes.map((l) => l.coords), KAMLOOPS]);
    const padded = expandHull(hull, 0.05);
    const servicePolygon = L.polygon(padded, {
      color: "#B5683B",
      weight: 2,
      opacity: 0.9,
      fillColor: "#B5683B",
      fillOpacity: 0.08,
      dashArray: "6 6",
      lineJoin: "round",
      interactive: false,
    }).addTo(map);

    // Kamloops home marker
    L.marker(KAMLOOPS, { icon: homeIcon(), interactive: false, keyboard: false }).addTo(map);
    L.tooltip({ permanent: true, direction: "right", className: "home-tooltip", offset: [12, 0] })
      .setLatLng(KAMLOOPS).setContent("Kamloops").addTo(map);

    // Lake markers + tooltip + popup
    lakes.forEach((l, i) => {
      const marker = L.marker(l.coords, { icon: lakeIcon(i, i === active), riseOnHover: true });
      marker.bindTooltip(l.name, { direction: "top", offset: [0, -18], className: "lake-tooltip" });
      marker.bindPopup(popupHtml(l, i), {
        className: "lake-popup-wrap",
        closeButton: false,
        offset: [0, -14],
        maxWidth: 260,
        autoPan: true,
      });
      marker.on("click", () => onSelect(i));
      marker.addTo(map);
      markersRef.current.push(marker);
    });

    map.fitBounds(servicePolygon.getBounds(), { padding: [40, 40] });
    mapRef.current = map;

    // Async: fetch real driving routes from Kamloops → each lake
    let cancelled = false;
    (async () => {
      const routes = await Promise.all(
        lakes.map((l) => fetchRoute(KAMLOOPS, l.coords))
      );
      if (cancelled || !mapRef.current) return;

      routes.forEach((r, i) => {
        const isActive = i === active;
        const line = L.polyline(r.geometry, {
          color: "#B5683B",
          weight: isActive ? 3 : 1.5,
          opacity: isActive ? 0.95 : 0.45,
          dashArray: isActive ? null : "4 6",
          lineCap: "round",
          lineJoin: "round",
          interactive: false,
        }).addTo(map);

        const mid = r.geometry[Math.floor(r.geometry.length / 2)];
        const pill = L.tooltip({
          permanent: true,
          direction: "center",
          className: `route-pill${isActive ? " is-active" : ""}`,
          interactive: false,
          offset: [0, 0],
        })
          .setLatLng(mid)
          .setContent(`${fmtKm(r.distance)}km · ${fmtMin(r.duration)}min`)
          .addTo(map);

        routesRef.current[i] = { line, pill, ...r };
      });
      setRoutesReady(true);
    })();

    return () => {
      cancelled = true;
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
      routesRef.current = [];
      userMarkerRef.current = null;
      userLineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React to active changes — markers, route highlight, pan
  useEffect(() => {
    markersRef.current.forEach((m, i) => m.setIcon(lakeIcon(i, i === active)));
    if (mapRef.current && lakes[active]) {
      mapRef.current.panTo(lakes[active].coords, { animate: true, duration: 0.6 });
    }
    routesRef.current.forEach((r, i) => {
      if (!r) return;
      const isActive = i === active;
      r.line.setStyle({
        weight: isActive ? 3 : 1.5,
        opacity: isActive ? 0.95 : 0.45,
        dashArray: isActive ? null : "4 6",
      });
      const el = r.pill.getElement();
      if (el) el.classList.toggle("is-active", isActive);
    });
  }, [active, lakes, routesReady]);

  // Locate Me
  const locateMe = () => {
    if (!navigator.geolocation || !mapRef.current) {
      setLocateError("Geolocation not supported.");
      return;
    }
    setLocating(true);
    setLocateError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const map = mapRef.current;
        const userLatLng = [pos.coords.latitude, pos.coords.longitude];

        if (userMarkerRef.current) userMarkerRef.current.remove();
        if (userLineRef.current) userLineRef.current.remove();

        userMarkerRef.current = L.marker(userLatLng, { icon: userIcon() })
          .bindTooltip("You", {
            direction: "right",
            offset: [12, 0],
            permanent: true,
            className: "home-tooltip",
          })
          .addTo(map);

        // Find nearest lake by great-circle distance
        const dists = lakes.map((l, i) => ({
          i,
          d: haversineMeters(userLatLng, l.coords),
          name: l.name,
        }));
        dists.sort((a, b) => a.d - b.d);
        const nearest = dists[0];

        userLineRef.current = L.polyline(
          [userLatLng, lakes[nearest.i].coords],
          {
            color: "#0E1813",
            weight: 1.5,
            opacity: 0.7,
            dashArray: "2 6",
            interactive: false,
          }
        ).addTo(map);

        map.fitBounds([userLatLng, lakes[nearest.i].coords], { padding: [60, 60] });
        setUserInfo({
          coords: userLatLng,
          nearest: nearest.name,
          distanceKm: fmtKm(nearest.d),
        });
        onSelect(nearest.i);
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        setLocateError(
          err.code === 1
            ? "Location permission denied."
            : "Could not get your location."
        );
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  };

  const activeRoute = routesRef.current[active];

  return (
    <div className="relative">
      <div
        ref={mapEl}
        className="w-full h-[420px] md:h-[520px] bg-cream"
        role="region"
        aria-label="Map of Kamloops-area lakes"
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-ink/15" />

      {/* Top-left badge — section + active lake + drive stats */}
      <div className="absolute top-4 left-4 bg-bone/90 backdrop-blur px-3 py-2 border border-ink/10 z-[400] max-w-[260px]">
        <div className="eyebrow text-copper text-[9px]">§ 03A · Service Region</div>
        <div className="numeral tnum text-[11px] text-ink/70 mt-1">
          {String(active + 1).padStart(2, "0")} / {String(lakes.length).padStart(2, "0")} ·{" "}
          {lakes[active]?.name}
        </div>
        {routesReady && activeRoute ? (
          <div className="numeral tnum text-[10px] text-copper/85 mt-1">
            {fmtKm(activeRoute.distance)} km · {fmtMin(activeRoute.duration)} min from Kamloops
            {!activeRoute.road && <span className="opacity-60"> (est.)</span>}
          </div>
        ) : (
          <div className="numeral tnum text-[10px] text-ink/40 mt-1">Loading routes…</div>
        )}
      </div>

      {/* Locate Me button — top-right */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={locateMe}
          disabled={locating}
          className="bg-bone/95 backdrop-blur px-3 py-2 border border-ink/15 text-[10px] tracking-widest uppercase text-ink/80 hover:bg-ink hover:text-bone transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <span aria-hidden>◎</span>
          {locating ? "Locating…" : "Locate Me"}
        </button>
        {locateError && (
          <div className="bg-ink/95 text-bone text-[10px] px-2 py-1 max-w-[200px] text-right">
            {locateError}
          </div>
        )}
      </div>

      {/* User-location info — bottom-left when located */}
      {userInfo && (
        <div className="absolute bottom-4 left-4 bg-ink text-bone px-3 py-2 z-[400]">
          <div className="eyebrow text-copper text-[9px]">Your location</div>
          <div className="text-[11px] mt-1 numeral tnum">
            ~{userInfo.distanceKm} km to {userInfo.nearest}
          </div>
        </div>
      )}

      {/* Coords ornament — bottom-right */}
      <div className="absolute bottom-4 right-4 bg-bone/90 backdrop-blur px-3 py-2 border border-ink/10 z-[400] flex items-center gap-3 text-[10px] tracking-widest uppercase text-ink/60">
        <span className="numeral tnum">50.6764° N</span>
        <span>·</span>
        <span className="numeral tnum">120.3408° W</span>
      </div>
    </div>
  );
}
