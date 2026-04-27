/**
 * Sequoia Boat Rentals & Concierge Services
 * Lakes Component
 */

(function () {
    const lakesHTML = `
    <div class="lakes section-padding">
        <div class="container">
            <h2 class="section-heading text-center">Explore Our Lakes</h2>
            <p class="section-subtitle text-center" style="color: #4ECDC4;">Discover the pristine waters surrounding Kamloops with our eco-friendly inflatable boats. Each lake offers a unique experience!</p>
            
            <!-- Interactive Leaflet Map -->
            <div class="lakes-map-container mb-5">
                <div class="lakes-tabs">
                    <button class="lakes-tab active" data-area="all">All Routes</button>
                    <button class="lakes-tab" data-area="kamloops">Kamloops Area</button>
                    <button class="lakes-tab" data-area="shuswap">Shuswap Area</button>
                    <button class="lakes-tab" data-area="sunpeaks">Sun Peaks Area</button>
                </div>
                
                <!-- Mobile Dropdown (hidden on desktop) -->
                <div class="lakes-dropdown">
                    <select id="lakes-mobile-selector" class="lakes-mobile-selector">
                        <option value="all">All Routes</option>
                        <option value="kamloops">Kamloops Area</option>
                        <option value="shuswap">Shuswap Area</option>
                        <option value="sunpeaks">Sun Peaks Area</option>
                    </select>
                    <div class="lakes-dropdown-icon">
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div>
                
                <div id="lakesMap" class="lakes-map"></div>
            </div>
            
            <div class="lakes-bento-grid">
                <!-- Heffley Lake -->
                <div class="lake-bento-item" style="background-image: url('images/lakes/Haffley_lakes/Heffley_Lake_1.png');" data-folder="Haffley_lakes" data-basename="Heffley_Lake_">
                    <div class="lake-bento-content">
                        <h3>Heffley Lake</h3>
                        <p>Closest to Sun Peaks</p>
                    </div>
                </div>
                
                <!-- Paul Lake -->
                <div class="lake-bento-item" style="background-image: url('images/lakes/Paul_lake/paul_lake_1.png');" data-folder="Paul_lake" data-basename="paul_lake_">
                    <div class="lake-bento-content">
                        <h3>Paul Lake</h3>
                        <p>Family Friendly</p>
                    </div>
                </div>
                
                <!-- Monte Lake -->
                <div class="lake-bento-item" style="background-image: url('images/lakes/Monte_lake/Monte_lake_1.png');" data-folder="Monte_lake" data-basename="Monte_lake_">
                    <div class="lake-bento-content">
                        <h3>Monte Lake</h3>
                        <p>Hidden Gem</p>
                    </div>
                </div>
                
                <!-- Shuswap Lake -->
                <div class="lake-bento-item" style="background-image: url('images/lakes/Shuswap_lake/shuswap_Lake_1.png');" data-folder="Shuswap_lake" data-basename="shuswap_Lake_">
                    <div class="lake-bento-content">
                        <h3>Shuswap Lake</h3>
                        <p>Worth the Drive</p>
                    </div>
                </div>
                
                <!-- Kamloops Lake -->
                <div class="lake-bento-item" style="background-image: url('images/lakes/Kamploop_lake/Kamloops_Lake_1.jpg');" data-folder="Kamploop_lake" data-basename="Kamloops_Lake_">
                    <div class="lake-bento-content">
                        <h3>Kamloops Lake</h3>
                        <p>Closest to City</p>
                    </div>
                </div>
                
                <!-- Lac Le Jeune -->
                <div class="lake-bento-item" style="background-image: url('images/lakes/Lac_Le_Jeune_lake/Lac_Le_Jeune_lake_1.jpg');" data-folder="Lac_Le_Jeune_lake" data-basename="Lac_Le_Jeune_lake_">
                    <div class="lake-bento-content">
                        <h3>Lac Le Jeune</h3>
                        <p>Perfect for Half-Day</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <style>
        /* Lakes Section Styles */
        .lakes {
            background-color: var(--section-bg);
            position: relative;
            overflow: hidden;
        }
        
        /* Remove any potential floating elements */
        .lakes .container {
            position: relative;
            overflow: hidden;
        }
        
        /* Fix for any potential absolute positioned elements */
        .lakes-map-container {
            position: relative;
            overflow: hidden;
        }
        
        .lakes-intro {
            max-width: 800px;
            margin: 0 auto var(--space-lg);
            font-size: 1.1rem;
        }
        
        .lakes-bento-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            grid-auto-rows: 250px;
            grid-gap: 1.5rem;
            margin-top: 4rem;
        }
        
        .lake-bento-item {
            position: relative;
            background-size: cover;
            background-position: center;
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-md);
            transition: box-shadow 0.4s ease;
            cursor: pointer;
        }
        
        .lake-bento-item:hover {
            box-shadow: var(--shadow-xl);
        }
        
        .lake-bento-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.5rem;
            color: var(--white);
            
            /* Improved Glassmorphism */
            background: rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            
            /* Initial state: partially visible */
            transform: translateY(calc(100% - 5rem)); /* Adjust to show title */
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .lake-bento-item:hover .lake-bento-content {
            transform: translateY(0);
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }
        
        .lake-bento-content h3 {
            font-size: 1.4rem;
            font-weight: 700;
            margin: 0 0 0.25rem 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
            color: var(--white);
        }
        
        .lake-bento-content p {
            margin: 0;
            font-size: 0.95rem;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
            color: var(--white);
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            transition-delay: 0.1s;
        }
        
        .lake-bento-item:hover .lake-bento-content p {
            opacity: 0.9;
        }
        
        /* Responsive adjustments */
        @media (min-width: 768px) {
            .lakes-bento-grid {
                grid-template-columns: 1fr 1fr;
                grid-auto-rows: 250px;
                grid-template-areas:
                    "heffley  shuswap"
                    "paul     lac-le-jeune"
                    "monte    lac-le-jeune"
                    "kamloops kamloops";
            }

            /* Reset any lingering column/row spans and display properties */
            .lake-bento-item {
                grid-column: auto;
                grid-row: auto;
                display: block !important;
            }

            .lake-bento-item:nth-child(1) { grid-area: heffley; }
            .lake-bento-item:nth-child(2) { grid-area: paul; }
            .lake-bento-item:nth-child(3) { grid-area: monte; }
            .lake-bento-item:nth-child(4) { grid-area: shuswap; }
            .lake-bento-item:nth-child(5) { grid-area: kamloops; }
            .lake-bento-item:nth-child(6) { grid-area: lac-le-jeune; }
        }
        
        @media (min-width: 1200px) {
            .lakes-bento-grid {
                grid-template-columns: repeat(3, 1fr);
                grid-auto-rows: 250px;
                grid-template-areas:
                    "heffley  heffley  shuswap"
                    "paul     lac-le-jeune lac-le-jeune"
                    "monte    lac-le-jeune lac-le-jeune"
                    "kamloops kamloops kamloops";
            }
        }

        /* Leaflet map */
        .lakes-map {
            width: 100%;
            height: 500px;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
            border: 3px solid transparent;
            transition: border-color var(--transition-medium);
        }
        
        .lakes-map.highlighted {
            border: 3px solid var(--secondary);
            box-shadow: 0 0 15px rgba(78, 205, 196, 0.5);
        }

        .lakes-map-container {
            position: relative;
        }
        
        .map-highlight-label {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 6px 12px;
            border-radius: var(--radius-md);
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--primary-dark);
            box-shadow: var(--shadow-sm);
            z-index: 1000;
            border-left: 3px solid var(--secondary);
            max-width: 150px;
            text-align: center;
            pointer-events: none;
        }

        /* Lakes-tabs styling */
        .lakes-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
            justify-content: center;
        }

        .lakes-tab {
            background: var(--white);
            border: 1px solid rgba(0,0,0,0.1);
            color: var(--dark);
            padding: 0.45rem 1rem;
            border-radius: var(--radius-full);
            font-size: 0.85rem;
            cursor: pointer;
            transition: all var(--transition-medium);
        }

        .lakes-tab.active,
        .lakes-tab:hover {
            background: var(--secondary);
            color: var(--white);
            border-color: var(--secondary);
        }

        /* Mobile Dropdown Styles */
        .lakes-dropdown {
            display: none; /* Hidden by default, shown on mobile */
            position: relative;
            margin-bottom: 1rem;
            width: 100%;
            z-index: 10;
        }

        .lakes-mobile-selector {
            width: 100%;
            padding: 0.85rem 1.25rem;
            border-radius: var(--radius-md);
            border: 1px solid rgba(0,0,0,0.08);
            background: var(--white);
            font-size: 1rem;
            font-weight: 500;
            color: var(--primary-dark);
            appearance: none;
            -webkit-appearance: none;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        }

        .lakes-mobile-selector:focus {
            outline: none;
            border-color: var(--secondary);
            box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.25);
        }

        .lakes-dropdown-icon {
            position: absolute;
            right: 1.25rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--primary);
            pointer-events: none;
            font-size: 0.9rem;
        }

        /* Mobile optimizations */
        @media (max-width: 767px) {
            .lakes-map {
                height: 300px;  /* Reduce map height on mobile */
            }
            
            .lakes-tabs {
                display: none; /* Hide tabs on mobile */
            }
            
            .lakes-dropdown {
                display: block; /* Show dropdown on mobile */
            }
            
            .lakes-bento-grid {
                grid-template-columns: 1fr;
                grid-auto-rows: 180px;
                grid-gap: 1rem;
                margin-top: 2rem;
            }
            
            .lake-bento-content {
                transform: translateY(0);
                background: rgba(0, 0, 0, 0.4);
            }
            
            .lake-bento-content p {
                opacity: 1;
                font-size: 0.85rem;
            }
            
            .lake-bento-content h3 {
                font-size: 1.2rem;
            }
            
            .section-subtitle {
                padding: 0 0.5rem;
            }
            
            .map-highlight-label {
                display: none; /* Hide the label on mobile to avoid redundancy with dropdown */
            }
        }
    </style>
    `;

    // Load the lakes component
    ComponentLoader.loadComponent('lakes-container', lakesHTML);

    // Initialize Leaflet map once component is in the DOM
    document.addEventListener('DOMContentLoaded', initLakesInteractiveMap);

    function initLakesInteractiveMap() {
        const mapContainer = document.getElementById('lakesMap');
        if (!mapContainer) return; // Component not yet in DOM
        if (typeof L === 'undefined') {
            console.error('Leaflet library not loaded.');
            return;
        }

        // Prevent multiple initializations
        if (mapContainer.dataset.mapInitialized) return;
        mapContainer.dataset.mapInitialized = 'true';

        // Create the map
        const map = L.map('lakesMap', {
            scrollWheelZoom: false,
            dragging: !L.Browser.mobile,
            tap: !L.Browser.mobile
        }).setView([50.72, -120.33], 8);

        // Enable drag and tap for mobile after user interaction
        map.on('focus', function () {
            map.dragging.enable();
            if (L.Browser.mobile) map.tap.enable();
        });

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Sample route coordinates (replace with real tour paths)
        const routes = {
            kamloops: [
                [50.7136, -120.3718],
                [50.7659, -120.4001],
                [50.7912, -120.3299]
            ],
            shuswap: [
                [50.9270, -119.5083],
                [50.9371, -119.4465],
                [50.9042, -119.4250]
            ],
            sunpeaks: [
                [50.8880, -119.9350],
                [50.9082, -119.9551],
                [50.9233, -119.8999]
            ]
        };

        // Create area labels and colors
        const areaLabels = {
            all: "All Boating Areas",
            kamloops: "Kamloops Lake Area",
            shuswap: "Shuswap Lake Area",
            sunpeaks: "Sun Peaks Area"
        };

        const areaColors = {
            kamloops: '#4ecdc4',
            shuswap: '#ff9e43',
            sunpeaks: '#6a11cb'
        };

        // Create map label
        const mapLabel = document.createElement('div');
        mapLabel.className = 'map-highlight-label';
        mapLabel.textContent = areaLabels['all'];
        mapLabel.style.display = 'none'; // Hide the label initially
        document.querySelector('.lakes-map-container').appendChild(mapLabel);

        const layers = {};
        Object.keys(routes).forEach(area => {
            // Create a featureGroup so we can add multiple layers (polyline + markers)
            const group = L.featureGroup();

            // Create polyline for the route
            const polyline = L.polyline(routes[area], {
                color: areaColors[area] || '#4ecdc4',
                weight: 5,
                dashArray: '6 8',
                lineJoin: 'round',
                opacity: 0.9
            }).addTo(group);

            // Add markers to highlight route points
            routes[area].forEach(coord => {
                L.circleMarker(coord, {
                    radius: 6,
                    fillColor: areaColors[area] || '#4ecdc4',
                    color: '#ffffff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.9
                }).addTo(group);
            });

            layers[area] = group;
        });

        // Group containing all areas so we can show everything initially
        const allLayer = L.featureGroup(Object.values(layers));
        layers['all'] = allLayer;
        allLayer.addTo(map);

        // Adjust padding for mobile
        const padding = L.Browser.mobile ? [10, 10] : [20, 20];
        map.fitBounds(allLayer.getBounds(), { padding: padding });

        // Add highlighted border to map
        mapContainer.classList.add('highlighted');

        // Tab switching logic
        const tabs = document.querySelectorAll('.lakes-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                switchArea(tab.dataset.area);

                // Active state styling for tabs
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });

        // Mobile dropdown handling
        const mobileSelector = document.getElementById('lakes-mobile-selector');
        if (mobileSelector) {
            mobileSelector.addEventListener('change', function () {
                const selectedArea = this.value;
                switchArea(selectedArea);

                // Update tab active state to keep desktop/mobile in sync
                tabs.forEach(t => {
                    if (t.dataset.area === selectedArea) {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
            });
        }

        // Function to switch the map area
        function switchArea(area) {
            // Update map label
            mapLabel.textContent = areaLabels[area] || 'Selected Area';
            mapLabel.style.display = 'block'; // Show the label

            // Remove all layers
            Object.values(layers).forEach(layer => {
                if (map.hasLayer(layer)) map.removeLayer(layer);
            });

            // Add selected route(s)
            layers[area].addTo(map);

            // Adjust viewport with proper padding for mobile
            const fitPadding = L.Browser.mobile ? [20, 20] : [40, 40];
            map.fitBounds(layers[area].getBounds(), { padding: fitPadding });

            // Highlight effect
            mapContainer.classList.remove('highlighted');
            // Dynamically update border color based on selected area for extra clarity
            const newBorderColor = areaColors[area] || getComputedStyle(document.documentElement).getPropertyValue('--secondary');
            mapContainer.style.borderColor = newBorderColor.trim();

            // Re-trigger highlight animation by toggling the class
            setTimeout(() => {
                mapContainer.classList.add('highlighted');
            }, 10);
        }
    }

    /* ---------------- Ken Burns Slideshow (4-second cadence) ---------------- */
    (function () {
        const IMAGE_EXTS = ['.webp', '.jpg', '.jpeg', '.png'];
        const DISPLAY_MS = 4000;   // how long each image is fully visible
        const FADE_MS = 1000;      // cross-fade duration (must be < DISPLAY_MS)

        /* Inject necessary CSS only once */
        const styleId = 'ken-burns-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .lake-bento-item { position: relative; overflow: hidden; }
                .lake-bento-item .ken-layer {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    opacity: 0;
                    transition: opacity ${FADE_MS}ms ease-in-out;
                    will-change: transform, opacity;
                }
                .lake-bento-item .ken-layer.active {
                    opacity: 1;
                    animation: kenBurnsAnim ${DISPLAY_MS * 2}ms linear forwards;
                }
                @keyframes kenBurnsAnim {
                    0%   { transform: scale(1) translate(0, 0); }
                    100% { transform: scale(1.12) translate(-3%, -3%); }
                }
                /* Ensure text overlay stays on top */
                .lake-bento-content { z-index: 2; }
            `;
            document.head.appendChild(style);
        }

        /* Helper: test if an image exists (preload) */
        function loadImage(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(url);
                img.onerror = reject;
                img.src = url;
            });
        }

        async function gatherImages(folder, basename) {
            const urls = [];
            for (let i = 1; i <= 20; i++) {
                for (const ext of IMAGE_EXTS) {
                    const candidate = `images/lakes/${folder}/${basename}${i}${ext}`;
                    try {
                        await loadImage(candidate);
                        urls.push(candidate);
                        break; // go to next index once we found a file
                    } catch (_) {
                        /* ignore and continue */
                    }
                }
            }
            return urls;
        }

        // Return candidate low-res URLs derived from a hi-res path
        function deriveLowResCandidates(hiUrl) {
            const parts = hiUrl.split('/');
            const file = parts.pop();
            const match = file.match(/^(.*?)(\d+)(\.[^.]+)$/); // base, index, ext
            if (!match) return [];
            const [, base, index, ext] = match;
            const variant1 = `${base}_compress_${index}${ext}`; // e.g. Lake_compress_1.png
            const variant2 = `${base}_compress${index}${ext}`;   // Lake_compress1.png
            const variant3 = `${base}compress_${index}${ext}`;   // Lakecompress_1.png
            const variant4 = `${base}compress${index}${ext}`;    // Lakecompress1.png
            return [variant1, variant2, variant3, variant4].map(v => [...parts, v].join('/'));
        }

        // Apply progressive image: low-res first, then hi-res when ready
        async function applyImage(layer, hiUrl) {
            // Attempt low-res candidates
            const lowResCandidates = deriveLowResCandidates(hiUrl);
            let shownUrl = hiUrl;
            for (const low of lowResCandidates) {
                try {
                    await loadImage(low);
                    shownUrl = low;
                    break;
                } catch (e) { /* continue */ }
            }
            layer.style.backgroundImage = `url('${shownUrl}')`;

            if (shownUrl !== hiUrl) {
                // Preload hi-res in background, then swap
                loadImage(hiUrl).then(() => {
                    // Ensure we swap only if layer is still showing this logical image
                    if (layer.style.backgroundImage.includes(shownUrl)) {
                        layer.style.backgroundImage = `url('${hiUrl}')`;
                    }
                }).catch(() => {/* ignore */ });
            }
        }

        function setupCard(card, images) {
            // Create two layers and append to card
            const layerA = document.createElement('div');
            const layerB = document.createElement('div');
            layerA.className = layerB.className = 'ken-layer';
            card.appendChild(layerA);
            card.appendChild(layerB);

            let currLayer = layerA;
            let nextLayer = layerB;
            let idx = 0;

            // initialise first image/layer
            applyImage(currLayer, images[idx]);
            currLayer.classList.add('active');

            if (images.length <= 1) {
                // Only one image: keep Ken-Burns anim looping via CSS (animation-iteration)
                currLayer.style.animationIterationCount = 'infinite';
                return;
            }

            const switchImage = () => {
                idx = (idx + 1) % images.length;

                // Prepare next layer
                applyImage(nextLayer, images[idx]);

                // Start cross-fade
                nextLayer.classList.add('active');

                // After fade time, hide previous layer and swap refs
                setTimeout(() => {
                    currLayer.classList.remove('active');
                    [currLayer, nextLayer] = [nextLayer, currLayer];
                }, FADE_MS);

                setTimeout(switchImage, DISPLAY_MS); // schedule next switch
            };

            setTimeout(switchImage, DISPLAY_MS);
        }

        async function initKenBurns() {
            const cards = document.querySelectorAll('.lake-bento-item[data-folder][data-basename]');
            for (const card of cards) {
                const folder = card.dataset.folder;
                const basename = card.dataset.basename;
                if (!folder || !basename) continue;

                const imgs = await gatherImages(folder, basename);
                if (imgs.length === 0) continue;
                setupCard(card, imgs);
            }
        }

        document.addEventListener('DOMContentLoaded', initKenBurns);
    })();
})();