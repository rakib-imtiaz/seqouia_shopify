/**
 * Sequoia Boat Rentals & Concierge Services
 * Header Component
 */

(function () {
    const headerHTML = `
    <header class="header">
        <div class="main-header">
            <div class="container">
                <a href="index.html" class="logo">
                    <img src="images/logo_transparent.png" alt="Sequoia logo">
                    <div class="logo-text">
                         <span class="logo-name">Sequoia</span>
                         <span class="logo-tagline">Boat Rentals</span>
                    </div>
                </a>
                    <nav class="main-nav">
                    <ul>
                        <li><a href="#hero-container"><i class="fas fa-home"></i> Home</a></li>
                        <li><a href="#services-container"><i class="fas fa-concierge-bell"></i> Our Services</a></li>
                        <li><a href="#lakes-container"><i class="fas fa-water"></i> Lakes</a></li>
                        <li><a href="#booking-preview-container"><i class="fas fa-calendar-check"></i> Quick Book</a></li>
                        <li><a href="#about-container"><i class="fas fa-info-circle"></i> About Us</a></li>
                        <li><a href="#footer-container"><i class="fas fa-envelope"></i> Contact</a></li>
                        </ul>
                </nav>
                <button class="mobile-nav-toggle" aria-label="Toggle Navigation">
                            <span></span>
                            <span></span>
                            <span></span>
                </button>
            </div>
        </div>
    </header>

    <style>
        .header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .main-header {
            background-color: transparent;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .header.scrolled .main-header {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 2px 15px rgba(0,0,0,0.07);
            border-bottom-color: transparent;
        }

        .main-header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
            transition: height 0.3s ease;
        }
        
        .header.scrolled .main-header .container {
            height: 60px;
        }
        
        .logo {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: var(--white);
            font-size: 1.2rem;
            font-weight: 700;
            transition: color 0.3s ease;
        }
        /* Brand name */
        .logo-name {
            font-size: 1.5rem;
            font-weight: 700;
        }
        /* Container holding name + tagline in vertical layout */
        .logo-text {
            display: flex;
            flex-direction: column;
            line-height: 1.1;
        }
        /* Tagline positioned under brand name */
        .logo-tagline {
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--secondary);
            margin-left: 0; /* reset inline gap */
        }
        /* Adjust tagline color when header switches to the solid (white) background */
        .header.scrolled .logo-tagline {
            color: var(--secondary-dark);
        }
        .header.scrolled .logo {
            color: var(--primary);
        }

        .logo img {
            height: 65px;
            margin-right: 0.5rem;
            transition: height 0.3s ease;
        }
        
        .header.scrolled .logo img {
            height: 45px;
        }
        
        .main-nav ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .main-nav li {
            margin: 0 1.25rem;
        }
        .main-nav a {
            color: var(--white);
            text-decoration: none;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            transition: color 0.2s ease;
        }
        .header.scrolled .main-nav a {
            color: var(--dark);
        }
        .main-nav a:hover,
        .main-nav a.active {
            color: var(--secondary);
        }
        .header.scrolled .main-nav a:hover,
        .header.scrolled .main-nav a.active {
            color: var(--primary);
        }
        
        .mobile-nav-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 1001;
            padding: 0;
        }
        
        .mobile-nav-toggle span {
            display: block;
            width: 24px;
            height: 2px;
            background-color: var(--white);
            border-radius: 1px;
            transition: all 0.3s ease;
        }
        .mobile-nav-toggle span:not(:last-child) {
            margin-bottom: 6px;
        }
        .header.scrolled .mobile-nav-toggle span {
            background-color: var(--dark);
        }
        /* Hamburger animation when open */
        .mobile-nav-toggle.open span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        .mobile-nav-toggle.open span:nth-child(2) {
            opacity: 0;
        }
        .mobile-nav-toggle.open span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }

        @media (max-width: 992px) {
            .main-nav {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                padding: 1.5rem 0;
                display: none; /* Hidden by default on mobile */
                box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            }
            .main-nav.show {
                display: flex;
            }
            .main-nav ul {
                flex-direction: column;
                width: 100%;
                align-items: center;
            }
            .main-nav li {
                margin: 0.75rem 0;
                width: 100%;
                text-align: center;
            }
            .main-nav a {
                padding: 0.5rem 0;
                justify-content: center;
            }
            .header.scrolled .main-nav a {
                color: var(--dark);
            }
            .main-nav a {
                color: var(--dark);
                font-size: 1.1rem;
            }
            .logo img {
                height: 50px;
            }
            .logo {
                font-size: 1.2rem;
            }
            .main-header .container {
                height: 70px;
            }
            .header.scrolled .main-header .container {
                height: 55px;
            }
            .mobile-nav-toggle {
                display: block;
            }
        }
        
        @media (max-width: 576px) {
            .logo img {
                height: 38px;
                margin-right: 0.25rem;
            }
            .logo-name {
                font-size: 1.2rem;
            }
            .main-header .container {
                height: 60px;
                padding: 0 0.5rem;
            }
            .header.scrolled .main-header .container {
                height: 55px;
            }

            /* Keep header transparent until scrolled */
            /* Color adjustments only after scrolled */
            .header.scrolled .logo {
                color: var(--primary);
            }
            .header.scrolled .mobile-nav-toggle span {
                background-color: var(--dark);
            }
        }
    </style>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
        const header = document.querySelector('.header');
            const navToggle = document.querySelector('.mobile-nav-toggle');
            const mainNav = document.querySelector('.main-nav');

            // Scroll event to change header style
        window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
            
            // Initialize header state on page load
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            }

        // Mobile nav toggle
            if (navToggle) {
                navToggle.addEventListener('click', () => {
                    navToggle.classList.toggle('open');
                mainNav.classList.toggle('show');
                    document.body.classList.toggle('nav-open');
            });
        }
            
            // Close mobile nav when clicking on links
            const navLinks = document.querySelectorAll('.main-nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('open');
                    mainNav.classList.remove('show');
                    document.body.classList.remove('nav-open');
                });
            });
            
            // Set active nav item based on scroll position
            const sections = document.querySelectorAll('section[id]');
            window.addEventListener('scroll', () => {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.offsetHeight;
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        current = '#' + section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === current) {
                        link.classList.add('active');
                    }
                });
            });
        });
    </script>
    `;

    // Load the header component
    ComponentLoader.loadComponent('header-container', headerHTML);
})(); 