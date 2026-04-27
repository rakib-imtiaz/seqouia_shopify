/**
 * Sequoia Boat Rentals & Concierge Services
 * Footer Component
 */

(function () {
    const footerHTML = `
    <div class="footer">
        <div class="float-decoration float-1"></div>
        <div class="footer-main section-padding">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-info">
                        <div class="footer-logo">
                            <a href="index.html">
                                <img src="images/logo_transparent.png" alt="Sequoia Boat Rentals" loading="lazy">
                                <div class="logo-text">
                                    <span class="logo-title">Sequoia</span>
                                    <span class="logo-subtitle">BOAT RENTALS</span>
                                </div>
                            </a>
                        </div>
                        <p class="footer-tagline">Explore Kamloops Lakes with eco-friendly inflatable boats</p>
                        <div class="footer-contact">
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <a href="tel:+12508796055">(250) 879-6055</a>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <a href="mailto:info@sequoiaservices.ca">info@sequoiaservices.ca</a>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-globe"></i>
                                <a href="https://sequoiaservices.ca/" target="_blank">sequoiaservices.ca</a>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Arrowstone Drive, Kamloops, BC, V2C1P9</span>
                            </div>
                        </div>
                        <div class="social-links">
                            <a href="#" class="social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="social-link" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-links">
                        <div class="footer-links-column">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="#hero-container">Home</a></li>
                                <li><a href="#about-container">About Us</a></li>
                                <li><a href="#services-container">Services</a></li>
                                <li><a href="#lakes-container">Lakes</a></li>
                                <li><a href="#booking-preview-container">Book Now</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-links-column">
                            <h4>Our Lakes</h4>
                            <ul>
                                <li><a href="#lakes-container">Heffley Lake</a></li>
                                <li><a href="#lakes-container">Paul Lake</a></li>
                                <li><a href="#lakes-container">Monte Lake</a></li>
                                <li><a href="#lakes-container">Shuswap Lake</a></li>
                                <li><a href="#lakes-container">Kamloops Lake</a></li>
                                <li><a href="#lakes-container">Lac Le Jeune</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-links-column">
                            <h4>Contact Us</h4>
                            <form id="contact-form" class="footer-form">
                                <div class="form-group">
                                    <input type="email" id="contact-email" placeholder="Your Email" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <textarea id="contact-message" placeholder="Your Message" class="form-control" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="float-decoration float-2"></div>
        
        <div class="footer-bottom">
            <div class="container">
                <div class="footer-bottom-content">
                    <p class="copyright">&copy; ${new Date().getFullYear()} Sequoia Boat Rentals & Concierge Services. All rights reserved.</p>
                    <div class="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <style>
        /* Footer Styles */
        .footer {
            background-color: var(--dark);
            color: var(--light);
            position: relative;
            overflow: hidden;
        }
        
        .footer .float-decoration {
            opacity: 0.05;
        }
        
        .footer-main {
            padding-bottom: var(--space-lg);
            position: relative;
            z-index: 1;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-lg);
        }
        
        .footer-logo {
            margin-bottom: var(--space-md);
        }
        
        .footer-logo a {
            display: flex;
            align-items: center;
            color: var(--white);
            text-decoration: none;
        }
        
        .footer-logo img {
            max-height: 50px;
            width: auto;
            margin-right: 10px;
        }
        
        .footer-logo .logo-text {
            display: flex;
            flex-direction: column;
            line-height: 1.1;
        }
        
        .footer-logo .logo-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--white);
        }
        
        .footer-logo .logo-subtitle {
            font-size: 0.75rem;
            letter-spacing: 2px;
            color: var(--secondary);
        }
        
        .footer-tagline {
            font-size: 1.1rem;
            margin-bottom: var(--space-md);
            color: var(--light);
        }
        
        .footer-contact {
            margin-bottom: var(--space-md);
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: var(--space-xs);
        }
        
        .contact-item i {
            margin-right: var(--space-sm);
            color: var(--secondary);
            width: 20px;
            text-align: center;
        }
        
        .contact-item a, .contact-item span {
            color: var(--light);
            text-decoration: none;
            transition: color var(--transition-fast);
        }
        
        .contact-item a:hover {
            color: var(--secondary);
        }
        
        .social-links {
            display: flex;
            gap: var(--space-sm);
        }
        
        .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.1);
            color: var(--white);
            border-radius: 50%;
            transition: all var(--transition-medium);
        }
        
        .social-link:hover {
            background-color: var(--secondary);
            color: var(--white);
            transform: translateY(-3px);
        }
        
        .footer-links {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-lg);
        }
        
        .footer-links-column h4 {
            color: var(--white);
            font-size: 1.2rem;
            margin-bottom: var(--space-md);
            position: relative;
            padding-bottom: var(--space-xs);
        }
        
        .footer-links-column ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .footer-links-column ul li {
            margin-bottom: var(--space-xs);
        }
        
        .footer-links-column ul li a {
            color: var(--light);
            text-decoration: none;
            transition: all var(--transition-fast);
            display: block;
            padding: var(--space-xs) 0;
        }
        
        .footer-links-column ul li a:hover {
            color: var(--secondary);
            transform: translateX(5px);
        }
        
        .footer-form .form-group {
            margin-bottom: var(--space-sm);
        }
        
        .footer-form .form-control {
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: var(--white);
        }
        
        .footer-form .form-control:focus {
            border-color: var(--secondary);
            background-color: rgba(255, 255, 255, 0.15);
        }
        
        .footer-form .form-control::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }
        
        .footer-form textarea.form-control {
            height: 100px;
            resize: none;
        }
        
        .footer-form .btn {
            width: 100%;
            background-color: var(--secondary);
            border: none;
            color: white;
        }
        
        .footer-form .btn:hover {
            background-color: var(--secondary-dark);
            transform: translateY(-3px);
        }
        
        .footer-bottom {
            background-color: rgba(0, 0, 0, 0.3);
            padding: var(--space-md) 0;
            position: relative;
            z-index: 1;
        }
        
        .footer-bottom-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        
        .copyright {
            margin-bottom: var(--space-sm);
            color: var(--gray);
            font-size: 0.9rem;
        }
        
        .footer-bottom-links {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: var(--space-md);
        }
        
        .footer-bottom-links a {
            color: var(--gray);
            font-size: 0.9rem;
            text-decoration: none;
            transition: color var(--transition-fast);
        }
        
        .footer-bottom-links a:hover {
            color: var(--secondary);
        }
        
        /* Media Queries */
        @media (min-width: 768px) {
            .footer-content {
                grid-template-columns: 1fr 2fr;
            }
            
            .footer-links {
                grid-template-columns: repeat(3, 1fr);
            }
            
            .footer-bottom-content {
                flex-direction: row;
                justify-content: space-between;
                text-align: left;
            }
            
            .copyright {
                margin-bottom: 0;
            }
        }
        
        @media (max-width: 767px) {
            .footer-links-column {
                margin-bottom: var(--space-lg);
            }
            
            .footer-links-column:last-child {
                margin-bottom: 0;
            }

            /* Center align info section on mobile */
            .footer-info {
                text-align: center;
            }
            .footer-logo a {
                justify-content: center;
            }
            .footer-contact {
                align-items: center;
            }
            .contact-item {
                justify-content: center;
            }
            .social-links {
                justify-content: center;
            }
            .footer-links {
                text-align: center;
            }
            .footer-links-column ul li a:hover {
                transform: none;
            }
        }
    </style>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const contactForm = document.getElementById('contact-form');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    
                    // In a real implementation, you would send the form data to a server
                    // For now, we'll just show an alert
                    const email = document.getElementById('contact-email').value;
                    const message = document.getElementById('contact-message').value;
                    
                    if (email && message) {
                        alert('Thank you for your message! We will get back to you soon.');
                        contactForm.reset();
                    }
                });
            }
        });
    </script>
    `;

    // Load the footer component
    ComponentLoader.loadComponent('footer-container', footerHTML);
})();