/**
 * Sequoia Boat Rentals & Concierge Services
 * Turo Partnership Component
 */

(function () {
    const turoPartnershipHTML = `
    <div class="turo-partnership section-padding">
        <div class="turo-background"></div>
        <div class="turo-overlay"></div>
        
        <div class="container">
            <div class="turo-hero-section">
                <div class="turo-logo-wrapper-main fade-in">
                    <span class="border-line top"></span>
                    <span class="border-line right"></span>
                    <span class="border-line bottom"></span>
                    <span class="border-line left"></span>
                    <img src="images/turo-logo.png" alt="Turo - Car Sharing Marketplace" class="turo-logo-main">
                </div>
                <div class="turo-banner-animated fade-in delay-100">
                     <span class="border-line top"></span>
                     <span class="border-line right"></span>
                     <span class="border-line bottom"></span>
                     <span class="border-line left"></span>
                    <h2 class="section-heading">Our Partnership with Turo</h2>
                    <p class="section-subtitle">Explore Beyond the Lakes with Premium Vehicle Rentals</p>
                </div>
            </div>
            
            <div class="turo-content">
                <div class="turo-text-content fade-in delay-400">
                    <div class="turo-description">
                        
                        <div class="turo-benefits">
                            <div class="benefit-item fade-in delay-100">
                                <div class="benefit-icon"><i class="fas fa-car" aria-hidden="true"></i></div>
                                <div class="benefit-text">
                                    <h4>Convenience</h4>
                                    <p>Skip the rental counter - use the app for pickup and return instructions</p>
                                </div>
                            </div>
                            
                            <div class="benefit-item fade-in delay-200">
                                <div class="benefit-icon"><i class="fas fa-user-plus" aria-hidden="true"></i></div>
                                <div class="benefit-text">
                                    <h4>Add Additional Drivers</h4>
                                    <p>Add additional drivers for free - perfect for sharing driving duties</p>
                                </div>
                            </div>
                            
                            <div class="benefit-item fade-in delay-300">
                                <div class="benefit-icon"><i class="fas fa-clock" aria-hidden="true"></i></div>
                                <div class="benefit-text">
                                    <h4>30-Minute Return Grace Period</h4>
                                    <p>No need to extend your trip unless you're running more than 30 minutes late</p>
                                </div>
                            </div>

                            <div class="benefit-item fade-in delay-400">
                                <div class="benefit-icon"><i class="fas fa-shield-alt" aria-hidden="true"></i></div>
                                <div class="benefit-text">
                                    <h4>Peace of Mind</h4>
                                    <p>24/7 customer support and basic roadside assistance included</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="turo-cta fade-in delay-400">
                            <a href="https://turo.com/ca/en/suv-rental/canada/kamloops-bc/mazda/cx-5/3271945" target="_blank" class="btn btn-primary">Book Our Mazda CX-5 on Turo</a>
                            <p class="turo-note">All inclusive pricing with no hidden fees</p>
                        </div>
                    </div>
                </div>
                
                <div class="turo-vehicle-container fade-in delay-300">
                    <div class="featured-vehicle-card">
                        <div class="featured-label">Our Featured Vehicle</div>
                        <div class="vehicle-image">
                            <img src="images/maz.png" alt="2021 red Mazda CX-5 parked lakeside" class="vehicle-img" loading="lazy" width="450" height="280">
                        </div>
                        <div class="vehicle-details">
                            <h5>Mazda CX-5</h5>
                            <div class="vehicle-price">$362 total</div>
                            <div class="vehicle-rating">
                                <i class="fas fa-star" aria-hidden="true"></i>
                                <i class="fas fa-star" aria-hidden="true"></i>
                                <i class="fas fa-star" aria-hidden="true"></i>
                                <i class="fas fa-star" aria-hidden="true"></i>
                                <i class="fas fa-star" aria-hidden="true"></i>
                                <span class="vehicle-rating-text">5.0 (8 ratings)</span>
                            </div>
                            <div class="vehicle-features">
                                <span><i class="fas fa-users" aria-hidden="true"></i> 5 seats</span>
                                <span><i class="fas fa-gas-pump" aria-hidden="true"></i> Fuel efficient</span>
                            </div>
                            <div class="vehicle-includes">
                                <h6>Included in the price:</h6>
                                <ul>
                                    <li><i class="fas fa-check" aria-hidden="true"></i> Skip rental counter</li>
                                    <li><i class="fas fa-check" aria-hidden="true"></i> Free additional drivers</li>
                                    <li><i class="fas fa-check" aria-hidden="true"></i> 30-min return grace period</li>
                                    <li><i class="fas fa-check" aria-hidden="true"></i> No need to wash before return</li>
                                    <li><i class="fas fa-check" aria-hidden="true"></i> 24/7 customer support</li>
                                </ul>
                            </div>
                            <a href="https://turo.com/ca/en/suv-rental/canada/kamloops-bc/mazda/cx-5/3271945" target="_blank" class="btn btn-modern btn-turo">Book This Vehicle</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <style>
        .turo-partnership {
            position: relative;
            padding: var(--space-xl) 0;
            overflow: hidden;
            color: white;
            background: #000000;
            min-height: 80vh;
            display: flex;
            align-items: center;
        }
        
        /* Animation classes */
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }
        .delay-400 { transition-delay: 0.4s; }
        
        .turo-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000000;
            z-index: -2;
        }
        
        .turo-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            z-index: -1;
        }
        
        .turo-hero-section {
            text-align: center;
            margin-bottom: var(--space-xxl);
            position: relative;
        }
        
        /* Remove any blue line/separator */
        .turo-hero-section:before,
        .turo-hero-section:after {
            display: none;
        }
        
        .turo-logo-wrapper-main {
            position: relative;
            display: inline-block;
            padding: 1rem;
            margin-bottom: 2rem;
            overflow: hidden;
        }
        
        .turo-logo-wrapper-main .border-line.top,
        .turo-logo-wrapper-main .border-line.bottom {
            height: 2px;
            width: 0;
            background-color: white;
            transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .turo-logo-wrapper-main .border-line.left,
        .turo-logo-wrapper-main .border-line.right {
            width: 2px;
            height: 0;
            background-color: white;
            transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .turo-logo-wrapper-main.animate .border-line.top,
        .turo-logo-wrapper-main.animate .border-line.bottom {
            width: 100%;
        }
        
        .turo-logo-wrapper-main.animate .border-line.left,
        .turo-logo-wrapper-main.animate .border-line.right {
            height: 100%;
        }
        
        .turo-logo-main {
            width: 180px;
            height: auto;
            transition: transform var(--transition-medium);
            object-fit: contain;
        }
        
        .turo-logo-main:hover {
            transform: scale(1.05);
        }
        
        .turo-banner {
            position: relative;
            background-color: #000000;
            color: white;
            padding: 20px 40px;
            margin: 20px auto 40px;
            max-width: 80%;
            text-align: center;
            border-left: 2px solid #1DB9FF;
            border-top: 2px solid #1DB9FF;
            border-bottom: 2px solid #1DB9FF;
        }
        
        .turo-banner::after {
            content: '';
            position: absolute;
            top: -2px;
            right: -30px;
            height: calc(100% + 4px);
            width: 30px;
            background-color: #000000;
            clip-path: polygon(0 0, 100% 50%, 0 100%);
            border-top: 2px solid #1DB9FF;
            border-right: 2px solid #1DB9FF;
            border-bottom: 2px solid #1DB9FF;
            z-index: 1;
        }
        
        .turo-banner .section-heading {
            font-size: 2.5rem;
            margin-bottom: var(--space-sm);
            font-weight: 700;
            color: white;
        }
        
        .turo-banner .section-subtitle {
            font-size: 1.2rem;
            margin-bottom: 0;
            font-weight: 400;
            color: white;
        }
        
        .section-heading {
            font-size: 3rem;
            margin-bottom: var(--space-md);
            font-weight: 700;
        }
        
        .section-subtitle {
            font-size: 1.3rem;
            margin-bottom: var(--space-lg);
            font-weight: 400;
        }
        
        .turo-intro {
            color: #FFFFFF !important;
            font-size: 1.1rem;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto var(--space-xxl);
        }
        
        .turo-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: clamp(var(--space-xl), 5vw, var(--space-xxl));
            align-items: start;
            margin-top: var(--space-xxl);
        }
        
        .turo-text-content {
            max-width: 100%;
        }
        
        .turo-description {
            margin-top: 0;
            font-size: 1.05rem;
            line-height: 1.6;
        }
        
        .turo-benefits {
            margin: var(--space-lg) 0;
        }
        
        .turo-benefits {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-lg);
        }
        
        .benefit-item {
            display: flex;
            min-height: 120px;
            padding: var(--space-lg);
            background-color: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: var(--radius-lg);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            transition: all var(--transition-medium);
        }
        
        .benefit-item:hover {
            transform: translateY(-5px) scale(1.02);
            background-color: rgba(255, 255, 255, 0.12);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }
        
        .benefit-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
            color: white;
            border-radius: var(--radius-full);
            margin-right: var(--space-lg);
            flex-shrink: 0;
            font-size: 1.5rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            padding: 14px;
        }
        
        .benefit-text h4 {
            margin-bottom: var(--space-sm);
            font-size: 1.2rem;
            font-weight: 600;
            color: white;
        }
        
        .benefit-text p {
            margin: 0;
            font-size: 1rem;
            color: #FFFFFF;
            line-height: 1.5;
        }
        
        .turo-vehicle-container {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .featured-vehicle-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            transition: all var(--transition-medium);
            position: relative;
            max-width: 450px;
            margin: 0 auto;
        }
        
        .featured-vehicle-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
            background: rgba(255, 255, 255, 0.15);
        }
        
        .featured-label {
            position: absolute;
            top: 15px;
            right: 15px;
            background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
            color: white;
            padding: 8px 16px;
            border-radius: var(--radius-full);
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 2;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .vehicle-image {
            height: 240px;
            overflow: hidden;
            position: relative;
        }
        
        .vehicle-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform var(--transition-slow);
            loading: lazy;
        }
        
        .featured-vehicle-card:hover .vehicle-img {
            transform: scale(1.05);
        }
        
        .vehicle-details {
            padding: var(--space-lg);
            text-align: center;
        }
        
        .vehicle-details h5 {
            margin-bottom: var(--space-sm);
            font-weight: 700;
            font-size: 1.5rem;
            color: white;
        }
        
        .vehicle-price {
            font-size: 1.8rem;
            font-weight: 600; /* Lighter weight */
            color: #FFFFFF;
            margin-bottom: var(--space-md);
            position: relative;
        }
        
        .vehicle-rating {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            margin-bottom: var(--space-md);
            color: #FFFFFF;
        }
        
        .vehicle-rating-text {
            color: #FFFFFF;
            font-size: 0.9rem;
            margin-left: 5px;
        }
        
        .vehicle-features {
            display: flex;
            justify-content: center;
            gap: var(--space-lg);
            margin-bottom: var(--space-lg);
            color: #FFFFFF;
            font-size: 1rem;
        }
        
        .vehicle-features span {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
        }
        
        .vehicle-includes {
            background: rgba(255, 255, 255, 0.05);
            padding: var(--space-lg);
            border-radius: var(--radius-md);
            margin-bottom: var(--space-lg);
            text-align: left;
            border: 1px solid rgba(255, 255, 255, 0.2); /* More visible border */
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .vehicle-includes h6 {
            font-size: 1rem;
            margin-bottom: var(--space-md);
            color: white;
            font-weight: 600;
        }
        
        .vehicle-includes ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-sm);
        }
        
        .vehicle-includes li {
            font-size: 0.9rem;
            margin-bottom: 0;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .vehicle-includes i {
            color: #FFFFFF;
            font-size: 1rem;
            aria-hidden: true; /* Hide from screen readers */
        }
        
        .btn-modern {
            padding: 16px 30px; /* Taller for accessibility */
            min-height: 48px;
            font-size: 1rem;
            font-weight: 600;
            border-radius: var(--radius-full);
            border: none;
            text-decoration: none;
            transition: all var(--transition-medium);
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        
        .btn-turo {
            background: #FFFFFF;
            color: #000000;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            width: 100%; /* Full width button */
            max-width: 300px;
            border: 2px solid #FFFFFF;
            border-radius: 30px;
        }
        
        .btn-turo:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
            background: #F0F0F0;
        }
        
        .turo-cta {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: var(--space-xl);
        }
        
        .turo-cta {
            margin-top: var(--space-lg);
            text-align: center;
        }
        
        .turo-note {
            margin-top: var(--space-md);
            font-size: 0.9rem;
            color: #FFFFFF;
        }
        
        .turo-banner-animated {
            position: relative;
            padding: 2rem 3rem;
            margin: 2rem auto;
            max-width: 700px;
            text-align: center;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .border-line {
            position: absolute;
            background-color: white;
            transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .border-line.top,
        .border-line.bottom {
            height: 2px;
            width: 0;
        }

        .border-line.left,
        .border-line.right {
            width: 2px;
            height: 0;
        }

        .border-line.top { top: 0; left: 0; }
        .border-line.right { top: 0; right: 0; }
        .border-line.bottom { bottom: 0; right: 0; }
        .border-line.left { bottom: 0; left: 0; }

        .turo-banner-animated.animate .border-line.top,
        .turo-banner-animated.animate .border-line.bottom {
            width: 100%;
        }

        .turo-banner-animated.animate .border-line.left,
        .turo-banner-animated.animate .border-line.right {
            height: 100%;
        }
        
        .turo-banner-animated .section-heading {
            font-size: 2.5rem;
            margin: 0;
            color: white;
            transition: transform 0.3s ease;
        }
        
        .turo-banner-animated .section-subtitle {
            font-size: 1.1rem;
            margin: 0.5rem 0 0;
            color: #E0E0E0;
            transition: transform 0.3s ease;
        }
        
        .turo-banner-animated.animate .section-heading,
        .turo-banner-animated.animate .section-subtitle {
            transform: scale(1.03);
        }
        
        @media (max-width: 992px) {
            .turo-content {
                grid-template-columns: 1fr;
                gap: var(--space-xl);
            }
            
            .section-heading {
                font-size: 2.5rem;
            }
            
            .turo-logo-main {
                width: 160px;
            }
            
            .turo-banner {
                max-width: 90%;
                padding: 15px 30px;
            }
            
            .turo-banner::after {
                right: -25px;
                width: 25px;
            }
            
            .turo-banner .section-heading {
                font-size: 2rem;
            }
        }
        
        @media (max-width: 768px) {
            .section-heading {
                font-size: 2rem;
            }
            
            .section-subtitle {
                font-size: 1.1rem;
            }
            
            .turo-intro {
                font-size: 1rem;
            }
            
            .testimonial-quote p {
                font-size: 1.1rem;
            }
            
            .vehicle-price {
                font-size: 1.5rem;
            }
            
            .featured-vehicle-card {
                max-width: 100%;
            }
            
            .turo-banner {
                max-width: 95%;
                padding: 15px 25px;
            }
            
            .turo-banner::after {
                right: -20px;
                width: 20px;
            }
            
            .turo-banner .section-heading {
                font-size: 1.8rem;
            }
            
            .turo-banner .section-subtitle {
                font-size: 1rem;
            }
        }
        
        @media (max-width: 576px) {
            .turo-partnership {
                padding: var(--space-lg) 0;
                min-height: 70vh;
            }
            
            .section-heading {
                font-size: 1.8rem;
            }
            
            .turo-logo-main {
                width: 140px;
            }
            
            .turo-banner {
                max-width: 100%;
                padding: 12px 20px;
                margin: 15px auto 30px;
            }
            
            .turo-banner::after {
                right: -15px;
                width: 15px;
            }
            
            .turo-banner .section-heading {
                font-size: 1.5rem;
            }
            
            .turo-banner .section-subtitle {
                font-size: 0.9rem;
            }
            
            .benefit-item {
                flex-direction: column;
                align-items: center;
                text-align: center;
                padding: var(--space-md);
                min-height: auto;
            }
            
            .benefit-icon {
                margin-right: 0;
                margin-bottom: var(--space-md);
                width: 50px;
                height: 50px;
                font-size: 1.2rem;
            }
            
            .benefit-text p {
                font-size: 15px;
            }
            
            .testimonial-header {
                flex-direction: column;
                gap: var(--space-sm);
            }
            
            .testimonial-quote {
                padding: var(--space-lg);
            }
            
            .testimonial-quote p {
                font-size: 1rem;
            }
            
            .turo-ratings {
                gap: var(--space-md);
            }
            
            .vehicle-details {
                padding: var(--space-md);
            }
            
            .vehicle-features {
                flex-direction: column;
                gap: var(--space-sm);
            }
            
            .btn-modern {
                width: 100%;
                padding: 15px;
                max-width: 100%;
            }
            
            .featured-vehicle-card {
                max-width: 100%;
                width: 100%;
                margin: 0;
            }
        }
    </style>
    `;

    // Load the component into the container
    const container = document.getElementById('turo-partnership-container');
    if (container) {
        container.innerHTML = turoPartnershipHTML;

        // Initialize animations
        setTimeout(() => {
            initTuroAnimations();
            startAutomaticAnimations();
        }, 100);
    }

    // Function to handle fade-in animations on scroll
    function initTuroAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');

        // Initially show elements that are already in viewport
        checkVisibility();

        // Add scroll listener
        window.addEventListener('scroll', checkVisibility);

        function checkVisibility() {
            fadeElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;

                // Check if element is in viewport
                if (rect.top <= windowHeight * 0.85) {
                    element.classList.add('visible');
                }
            });
        }
    }

    // Function to handle automatic border animations
    function startAutomaticAnimations() {
        const logoWrapper = document.querySelector('.turo-logo-wrapper-main');
        const banner = document.querySelector('.turo-banner-animated');

        function animateLogo() {
            if (logoWrapper) {
                logoWrapper.classList.add('animate');
                setTimeout(() => {
                    logoWrapper.classList.remove('animate');
                }, 1000); // Animation duration
            }
        }

        function animateBanner() {
            if (banner) {
                banner.classList.add('animate');
                setTimeout(() => {
                    banner.classList.remove('animate');
                }, 1000); // Animation duration
            }
        }

        // Start logo animation immediately
        setTimeout(animateLogo, 500);

        // Start banner animation 2 seconds after logo
        setTimeout(animateBanner, 2500);

        // Repeat animations every 4 seconds (2 seconds interval between each)
        setInterval(() => {
            animateLogo();
            setTimeout(animateBanner, 2000);
        }, 4000);
    }
})(); 