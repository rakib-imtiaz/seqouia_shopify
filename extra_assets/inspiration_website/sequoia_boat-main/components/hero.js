/**
 * Sequoia Boat Rentals & Concierge Services
 * Hero Component with Video Background
 */

(function () {
    const heroHTML = `
    <div class="hero video-background">
        <video autoplay muted loop playsinline poster="images/people_riding_boats_lakes.png">
            <source src="videos/lake-video-background.mp4" type="video/mp4">
            <!-- Fallback for browsers that don't support video -->
        </video>
        
        <div class="video-overlay"></div>
        
        <div class="hero-content container">
            <div class="hero-text-rotator">
                <div class="hero-text-slide inspirational-routes active">
                    <span class="line top"></span>
                    <span class="line right"></span>
                    <span class="line bottom"></span>
                    <span class="line left"></span>
                    <span class="hero-tagline">A Variety of Charters for Everyone</span>
                    <h1>Inspirational Routes</h1>
                    <p class="hero-subtitle">Discover the pristine waters surrounding Kamloops with our eco-friendly inflatable boats. Each lake offers a unique experience!</p>
                    <div class="hero-cta">
                        <a href="#booking-preview-container" class="btn">Book Your Adventure</a>
                    </div>
                </div>

                <div class="hero-text-slide partnering-with">
                    <h2>In partnership with</h2>
                </div>

                <div class="hero-text-slide turo-logo-slide">
                    <div class="turo-logo-background">
                        <img src="images/turo-logo.png" alt="Turo Logo">
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Left/Right Navigation -->
        <div class="hero-navigation">
            <button class="nav-arrow prev" aria-label="Previous slide">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="nav-arrow next" aria-label="Next slide">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        
        <!-- Wave divider -->
        <div class="wave-divider">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
                <path d="M0,64 C288,100 960,0 1440,80 L1440,120 L0,120 Z" fill="#ffffff"></path>
            </svg>
        </div>
    </div>

    <style>
        /* Hero Styles */
        .hero {
            height: 100vh;
            min-height: 600px;
            position: relative;
            color: var(--white);
            display: flex;
            align-items: flex-end;
            margin-bottom: 0;
            padding-top: 80px; /* Reduced padding to account for header */
        }
        
        .hero-content {
            position: relative;
            z-index: 10;
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 10%;
            min-height: calc(100vh - 160px);
        }
        
        .hero-text-rotator {
            position: relative;
            width: 100%;
            max-width: 650px;
            height: 350px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .hero-text-slide {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .hero-text-slide.active {
            opacity: 1;
            transform: translateY(0);
        }

        .hero-text-slide.inspirational-routes {
            background-color: transparent;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            overflow: hidden;
        }

        .line {
            position: absolute;
            background: rgba(255,255,255,0.8);
            transition: all 0.5s ease;
        }
        .line.top,
        .line.bottom { height:2px; width:0; }
        .line.left,
        .line.right { width:2px; height:0; }
        .line.top{ top:0; left:0; }
        .line.right{ top:0; right:0; }
        .line.bottom{ bottom:0; right:0; }
        .line.left{ bottom:0; left:0; }

        .hero-text-slide.inspirational-routes.active .line.top,
        .hero-text-slide.inspirational-routes.active .line.bottom{
             width:100%;
             transition-delay: 0.8s;
        }
        .hero-text-slide.inspirational-routes.active .line.left,
        .hero-text-slide.inspirational-routes.active .line.right{
             height:100%;
             transition-delay: 0.3s;
        }
        
        .partnering-with h2 {
            font-size: 2.5rem;
            color: white;
            font-weight: 600;
        }
        
        .turo-logo-slide .turo-logo-background {
            width: 220px;
            height: 220px;
            background-color: black;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: transform 0.8s ease;
        }

        .turo-logo-slide.active .turo-logo-background {
            transform: scale(1);
        }

        .turo-logo-slide img {
            width: 150px;
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s;
        }

        .turo-logo-slide.active img {
            opacity: 1;
            transform: scale(1);
        }
        
        .hero-tagline {
            display: block;
            font-family: var(--font-primary);
            font-size: 1rem;
            margin-bottom: var(--space-sm);
            color: var(--white);
            opacity: 0.9;
            font-weight: 100;
            text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        }
        
        .hero h1 {
            margin-bottom: var(--space-md);
            font-size: 2.5rem;
            font-weight: 100;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
            line-height: 1.1;
            color: var(--white);
            text-transform: none;
        }

        .hero h1 .highlight {
            color: #4ecdc4;
            position: relative;
            display: inline-block;
        }
        
        .hero-subtitle {
            font-size: 0.95rem;
            margin-bottom: var(--space-md);
            text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
            color: var(--white);
            font-weight: 100;
            line-height: 1.5;
        }
        
        .hero-cta {
            display: flex;
            justify-content: center;
            margin-top: var(--space-md);
        }
        
        .hero-cta .btn {
            min-width: 180px;
            position: relative;
            overflow: hidden;
            font-size: 0.85rem;
            padding: 0.8rem 1.8rem;
            border-radius: 4px;
            letter-spacing: 0.5px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            color: #ffffff;
            font-weight: 1000;
        }

        .hero-cta .btn:hover {
            background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            color: #ffffff;
        }
        
        .hero-navigation {
            position: absolute;
            width: 100%;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            z-index: 10;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
        }
        
        .nav-arrow {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: var(--white);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all var(--transition-medium);
            font-size: 0.9rem;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
        }
        
        .nav-arrow:hover {
            background-color: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
        }
        
        .nav-arrow:focus {
            outline: none;
        }

        .video-background {
            position: relative;
            overflow: hidden;
        }

        .video-background video {
            position: absolute;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            transform: translateX(-50%) translateY(-50%);
            z-index: -1;
            object-fit: cover;
        }

        .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2));
            z-index: 0;
        }
        
        /* Wave Divider */
        .wave-divider {
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 100px;
            z-index: 5;
            pointer-events: none;
            overflow: hidden;
            display: block;
            line-height: 0;
        }
        
        .wave-divider svg {
            width: 100%;
            height: 100%;
            display: block;
            transform-origin: bottom;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .wave-divider svg path {
            fill-opacity: 0.9;
            fill: var(--white);
            filter: drop-shadow(0 -5px 10px rgba(0, 0, 0, 0.1));
        }
        
        .hero:hover .wave-divider svg {
            transform: scaleY(1.05);
        }
        
        /* Media Queries */
        @media (min-width: 576px) {
            .hero h1 {
                font-size: 2.7rem;
            }
            
            .hero-subtitle {
                font-size: 1rem;
            }
        }
        
        @media (min-width: 768px) {
            .hero h1 {
                font-size: 3.2rem;
            }
            
            .hero-subtitle {
                font-size: 1.05rem;
            }
            
            .hero-text {
                padding: 2.5rem;
            }
            
            .hero-tagline {
                font-size: 1.2rem;
            }
        }
        
        @media (max-width: 768px) {
            .hero {
                min-height: 500px;
                height: 90vh;
            }
            
            .hero-content {
                padding-bottom: 6rem;
            }
            
            .hero h1 {
                font-size: 2rem;
            }
            
            .hero-tagline {
                font-size: 0.95rem;
                margin-bottom: 0.5rem;
            }
            
            .hero-text {
                padding: 1.5rem;
                max-width: 90%;
                background-color: transparent;
            }
            
            .hero-subtitle {
                margin-bottom: 1.5rem;
                font-size: 0.9rem;
            }
            
            .hero-navigation {
                display: none;
            }
        }

        @media (max-width: 576px) {
            .hero-content {
                padding-bottom: 5rem;
            }
            
            .hero-text {
                padding: 1.25rem;
                max-width: 95%;
            }
            
            .hero h1 {
                font-size: 1.8rem;
                margin-bottom: 0.6rem;
            }
            
            .wave-divider {
                height: 80px;
            }
        }
        .hero-card {
            position: relative;
            overflow: hidden;
        }
        
        .hero-card .line {
            position: absolute;
            background: rgba(255,255,255,0.8);
            transition: all 1s ease;
            border-radius: 2px;
        }
        
        .hero-card .line.top,
        .hero-card .line.bottom { 
            height: 2px; 
            width: 0; 
        }
        
        .hero-card .line.left,
        .hero-card .line.right { 
            width: 2px; 
            height: 0; 
        }
        
        .hero-card .line.top { 
            top: 0; 
            left: 20px; 
            border-radius: 2px 0 0 2px;
        }
        
        .hero-card .line.right { 
            top: 20px; 
            right: 0; 
            border-radius: 0 2px 2px 0;
        }
        
        .hero-card .line.bottom { 
            bottom: 0; 
            right: 20px; 
            border-radius: 0 0 2px 2px;
        }
        
        .hero-card .line.left { 
            bottom: 20px; 
            left: 0; 
            border-radius: 2px 0 0 2px;
        }
        
        .hero-card.draw .line.top { 
            width: calc(100% - 40px); 
        }
        
        .hero-card.draw .line.bottom { 
            width: calc(100% - 40px); 
        }
        
        .hero-card.draw .line.left { 
            height: calc(100% - 40px); 
        }
        
        .hero-card.draw .line.right { 
            height: calc(100% - 40px); 
        }
    </style>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Video fallback logic
            const video = document.querySelector('.hero video');
            const videoSource = video.querySelector('source');
            
            // If video fails to load or browser doesn't support, use poster image
            video.addEventListener('error', () => {
                video.style.display = 'none';
                videoParent.classList.add('fallback');
            });
            
            videoSource.addEventListener('error', () => {
                video.style.display = 'none';
                video.parentElement.classList.add('fallback');
            });
            
            // Animation classes
            const fadeInElements = document.querySelectorAll('.fade-in');
            const slideUpElements = document.querySelectorAll('.slide-up');
            
            // Add animated class after a small delay
            setTimeout(() => {
                fadeInElements.forEach(el => el.classList.add('animated'));
                slideUpElements.forEach(el => el.classList.add('animated'));
            }, 300);
            
            // Hero Rotator Animation
            const rotator = document.querySelector('.hero-text-rotator');
            if (rotator) {
                const slides = rotator.querySelectorAll('.hero-text-slide');
                let currentSlide = 0;
                
                const slideTimings = [3000, 2000, 3000];
                
                function showNextSlide() {
                    slides[currentSlide].classList.remove('active');
                    currentSlide = (currentSlide + 1) % slides.length;
                    slides[currentSlide].classList.add('active');
                    
                    setTimeout(showNextSlide, slideTimings[currentSlide]);
                }
                
                setTimeout(showNextSlide, slideTimings[0]);
            }
            // Add draw class to hero-card after delay
            const heroCard=document.querySelector('.hero-card');
            setTimeout(()=>{ if(heroCard) heroCard.classList.add('draw'); },600);
        });
    </script>
    `;

    // Load the hero component
    ComponentLoader.loadComponent('hero-container', heroHTML);
})(); 