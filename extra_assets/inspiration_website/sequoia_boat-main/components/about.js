/**
 * Sequoia Boat Rentals & Concierge Services
 * About Component - New Bento Grid Design
 */

(function () {
    const aboutHTML = `
    <div class="about-section-new">
        <div class="about-background"></div>
        <div class="about-overlay"></div>
        
        <div class="about-container-new">
            <div class="about-text-content">
                <h2 class="about-heading-new">About Us</h2>
                <h3 class="about-subheading-new">Your Gateway to Kamloops Lake Adventures</h3>
            </div>
                    
            <div class="bento-grid-new">
                <div class="bento-card-new card-1">
                    <div class="card-icon-new"><i class="fas fa-leaf"></i></div>
                    <h4>Eco-Friendly</h4>
                    <p>Enjoy our quiet, eco-friendly electric boats.</p>
                </div>
                <div class="bento-card-new card-2">
                    <div class="card-icon-new"><i class="fas fa-shield-alt"></i></div>
                    <h4>Safety First</h4>
                    <p>Premium life jackets included for your safety.</p>
                </div>
                <div class="bento-card-new card-3">
                    <div class="card-icon-new"><i class="fas fa-map-marked-alt"></i></div>
                    <h4>Local Expertise</h4>
                    <p>Our local guides know all the best spots.</p>
                </div>
                <div class="bento-card-new card-4">
                    <div class="card-icon-new"><i class="fas fa-concierge-bell"></i></div>
                    <h4>Concierge Services</h4>
                    <p>Custom trip planning & catering available.</p>
                </div>
                <div class="bento-card-new card-5">
                    <div class="card-icon-new"><i class="fas fa-shipping-fast"></i></div>
                    <h4>Free Delivery</h4>
                    <p>Free delivery to all popular local lakes.</p>
                </div>
            </div>
          </div>
        </div>

    <style>
        .about-section-new {
            position: relative;
            width: 100%;
            min-height: 100vh;
            padding: 120px var(--space-lg) 60px;
            display: flex;
            align-items: center;
            overflow: hidden;
            margin-top: -60px; 
            z-index: 1;
        }
        
        .about-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('images/about_us_bg.png');
            background-size: cover;
            background-position: center center;
            z-index: -2;
        }
        
        .about-overlay {
            position: absolute;
            inset: 0;
            background: none;
            z-index: -1;
        }
        
        .about-container-new {
            width: 100%;
            max-width: 1300px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: var(--space-xl);
            align-items: center;
        }
        
        .about-text-content {
            color: var(--white);
            text-align: left;
        }

        .about-heading-new {
            font-size: 2rem;
            font-weight: 500;
            opacity: 0.9;
            margin-bottom: 0.5rem; /* Tighten rhythm */
            color: var(--white);
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .about-subheading-new {
            font-size: 3.5rem;
            font-weight: 700;
            line-height: 1.2;
            color: var(--white);
            margin-bottom: 1.5rem; /* Tighten rhythm */
        }
        
        .bento-grid-new {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 150px) 180px;
            gap: 1.25rem;
        }
        
        .bento-card-new {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(8px);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 30px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 1rem; /* Base padding for tap target */
            color: var(--white);
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);
            position: relative;
            overflow: hidden;
        }

        .bento-card-new:hover {
            transform: translateY(-8px) scale(1.03);
            background: rgba(255, 255, 255, 0.12);
            box-shadow: 0 16px 40px rgba(0,0,0,0.3);
            border-color: rgba(255, 255, 255, 0.25);
        }

        .card-icon-new {
            font-size: 24px; /* Min icon size */
            margin-bottom: 0.75rem;
            opacity: 0.9;
        }
        
        .bento-card-new h4 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--white);
        }
        
        .bento-card-new p {
            font-size: 0.9rem;
            opacity: 0.9; /* Improved contrast */
            line-height: 1.5;
            color: var(--white);
        }
        
        .card-1 { grid-column: 1 / 2; grid-row: 1 / 3; }
        .card-2 { grid-column: 2 / 3; grid-row: 1 / 3; }
        .card-3 { grid-column: 3 / 4; grid-row: 1 / 3; }
        .card-4 { grid-column: 1 / 3; grid-row: 3 / 4; }
        .card-5 { grid-column: 3 / 4; grid-row: 3 / 4; }

        /* DESKTOP FIRST BREAKPOINT */
        @media (max-width: 1024px) {
            .about-container-new {
                grid-template-columns: 1fr;
                text-align: center;
            }
            .about-text-content {
                text-align: center;
                margin-bottom: 2rem;
            }
        }
        
        /* MOBILE & TABLET STYLES */
        @media (max-width: 768px) {
            .about-section-new {
                padding-top: 48px; /* Shorten top padding */
                margin-top: -30px;
                 align-items: flex-start;
            }
            .about-background {
                background-position: 50% 20%; /* Lock background */
            }
            .about-subheading-new {
                font-size: clamp(1.75rem, 8vw, 2.5rem); /* Fluid typography */
                margin-bottom: 2rem;
            }
             .bento-grid-new {
                transform: translateY(0);
            }
        }
        
        /* MOBILE-ONLY STYLES */
        @media (max-width: 600px) {
             .bento-grid-new {
                grid-template-columns: 1fr; /* Single column stack */
                grid-auto-rows: minmax(120px, auto);
                gap: 1rem;
            }
            .bento-card-new {
                grid-column: auto !important;
                grid-row: auto !important;
                box-shadow: 0 2px 15px rgba(0,0,0,.15); /* Add shadow on mobile */
                padding: 16px; /* Ensure 44px tap target */
            }
        }
    </style>
    `;
    const container = document.getElementById('about-container');
    if (container) {
        container.innerHTML = aboutHTML;
    }
})(); 