// Kamloops regional overview — Leaflet map with custom editorial markers.
import React, { useEffect, useRef } from "react";
import L from "leaflet";

// Kamloops city anchor (used for the home marker)
const KAMLOOPS = [50.6745, -120.3273];

// Custom DivIcon factory — matches the editorial palette (ink + copper).
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

export default function KamloopsMap({ lakes, active, onSelect }) {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // Initialize map once
  useEffect(() => {
    if (mapRef.current || !mapEl.current) return;

    const map = L.map(mapEl.current, {
      center: [50.7, -120.05],
      zoom: 9,
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: true,
    });

    // CartoDB Positron — minimal cream/gray, fits editorial palette
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 18,
    }).addTo(map);

    // Kamloops home marker (non-interactive)
    L.marker(KAMLOOPS, { icon: homeIcon(), interactive: false, keyboard: false }).addTo(map);
    L.tooltip({ permanent: true, direction: "right", className: "home-tooltip", offset: [12, 0] })
      .setLatLng(KAMLOOPS)
      .setContent("Kamloops")
      .addTo(map);

    // Lake markers
    lakes.forEach((l, i) => {
      const marker = L.marker(l.coords, { icon: lakeIcon(i, i === active), riseOnHover: true });
      marker.bindTooltip(l.name, {
        direction: "top",
        offset: [0, -14],
        className: "lake-tooltip",
      });
      marker.on("click", () => onSelect(i));
      marker.addTo(map);
      markersRef.current.push(marker);
    });

    // Fit bounds to all lakes + Kamloops
    const allPts = [...lakes.map((l) => l.coords), KAMLOOPS];
    map.fitBounds(allPts, { padding: [40, 40] });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh marker icons when active changes
  useEffect(() => {
    markersRef.current.forEach((m, i) => {
      m.setIcon(lakeIcon(i, i === active));
    });
    // Pan to the active lake
    if (mapRef.current && lakes[active]) {
      mapRef.current.panTo(lakes[active].coords, { animate: true, duration: 0.6 });
    }
  }, [active, lakes]);

  return (
    <div className="relative">
      <div
        ref={mapEl}
        className="w-full h-[420px] md:h-[520px] bg-cream"
        role="region"
        aria-label="Map of Kamloops-area lakes"
      />
      {/* Editorial frame overlay */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-ink/15" />
      {/* Compass / scale ornament */}
      <div className="absolute top-4 left-4 bg-bone/90 backdrop-blur px-3 py-2 border border-ink/10 z-[400]">
        <div className="eyebrow text-copper text-[9px]">§ 03A · Regional Overview</div>
        <div className="numeral tnum text-[11px] text-ink/70 mt-1">
          {String(active + 1).padStart(2, "0")} / {String(lakes.length).padStart(2, "0")} ·{" "}
          {lakes[active]?.name}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 bg-bone/90 backdrop-blur px-3 py-2 border border-ink/10 z-[400] flex items-center gap-3 text-[10px] tracking-widest uppercase text-ink/60">
        <span className="numeral tnum">50.6764° N</span>
        <span>·</span>
        <span className="numeral tnum">120.3408° W</span>
      </div>
    </div>
  );
}
