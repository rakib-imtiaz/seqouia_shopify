/**
 * Sequoia Boat Rentals & Concierge Services
 * Features (Why Choose Us) Component
 */

(function () {
    const featuresHTML = `
    <div class="features section-padding bg-light">
        <div class="container">
            <h2 class="section-heading text-center">Why Choose Us</h2>
            <p class="section-subtitle text-center" style="color: #4ECDC4;">We offer a premium experience that makes your lake adventure hassle-free and unforgettable</p>
            
            <div class="features-grid grid grid-3">
                <div class="feature-card card fade-in">
                    <div class="card-body">
                        <div class="feature-icon">
                            <i class="fas fa-charging-station"></i>
                        </div>
                        <h3>Eco-friendly Electric Boats</h3>
                        <p>Our fleet of electric boats offers a quiet, clean, and eco-friendly experience on the water. Enjoy the sounds of nature without noise or emissions.</p>
                    </div>
                </div>
                
                <div class="feature-card card fade-in delay-1">
                    <div class="card-body">
                        <div class="feature-icon">
                            <i class="fas fa-id-card"></i>
                        </div>
                        <h3>Boating License Assistance</h3>
                        <p>Need a boating license? No problem! We provide assistance in obtaining a temporary license, or offer professional driver services for your convenience.</p>
                    </div>
                </div>
                
                <div class="feature-card card fade-in delay-2">
                    <div class="card-body">
                        <div class="feature-icon">
                            <i class="fas fa-concierge-bell"></i>
                        </div>
                        <h3>Concierge Services</h3>
                        <p>Enhance your experience with our premium concierge services. From trip planning to on-board catering options, we've got you covered.</p>
                    </div>
                </div>
                
                <div class="feature-card card fade-in delay-3">
                    <div class="card-body">
                        <div class="feature-icon">
                            <i class="fas fa-truck"></i>
                        </div>
                        <h3>Free Delivery to Lakes</h3>
                        <p>We deliver our boats to your chosen lake at no extra charge for popular locations around Kamloops, making your adventure hassle-free.</p>
                    </div>
                </div>
                
                <div class="feature-card card fade-in delay-4">
                    <div class="card-body">
                        <div class="feature-icon">
                            <i class="fas fa-life-ring"></i>
                        </div>
                        <h3>Safety Equipment Included</h3>
                        <p>Safety first! All rentals come with premium life jackets in various sizes and backup paddles, ensuring a safe and enjoyable experience.</p>
                    </div>
                </div>
                
                <div class="feature-card card fade-in delay-5">
                    <div class="card-body">
                        <div class="feature-icon">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <h3>Easy Online Booking</h3>
                        <p>Our simple booking system lets you reserve your boat in minutes. Choose your lake, date, and duration with just a few clicks.</p>
                    </div>
                </div>
            </div>
            
            <div class="features-cta text-center mt-5">
                <a href="#booking-preview-container" class="btn btn-primary btn-lg">Book Your Adventure</a>
            </div>
        </div>
    </div>

    <style>
        /* Features Section Styles */
        .features {
            position: relative;
            overflow: hidden;
        }
        
        .features-grid {
            margin: var(--space-lg) 0;
            gap: var(--space-lg); /* Increase gap between cards */
        }
        
        .feature-card {
            text-align: center;
            height: 100%;
            background-color: var(--white);
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-sm);
            transition: all var(--transition-medium);
            border: 1px solid rgba(0,0,0,0.05);
        }
        
        .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-md);
        }
        
        .feature-card .card-body {
            padding: var(--space-lg);
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
        }
        
        .feature-card .feature-icon {
            width: 80px;
            height: 80px;
            background-color: rgba(11, 83, 148, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: var(--space-md);
            font-size: 2rem;
            color: var(--primary);
            transition: all var(--transition-medium);
        }
        
        .feature-card:hover .feature-icon {
            background-color: var(--primary);
            color: var(--white);
            transform: scale(1.1);
        }
        
        .feature-card h3 {
            margin-bottom: var(--space-sm);
            font-size: 1.25rem;
            color: var(--dark);
            font-weight: 600;
        }
        
        .feature-card p {
            color: var(--gray);
            font-size: 0.95rem;
            margin-bottom: 0;
            flex-grow: 1;
        }
        
        .features-cta {
            margin-top: var(--space-xl);
        }
        
        .features-cta .btn {
            position: relative;
            overflow: hidden;
        }
        
        /* Media queries */
        @media (max-width: 991px) {
            .features-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 767px) {
            .features-grid {
                grid-template-columns: 1fr;
                gap: var(--space-md);
            }
            
            .feature-card {
                margin-bottom: var(--space-md);
            }

            .feature-card h3 {
                font-size: 1.1rem;
            }
        }
    </style>
    `;

    // Load the features component
    ComponentLoader.loadComponent('features-container', featuresHTML);
})(); 