/**
 * Sequoia Boat Rentals & Concierge Services
 * Booking Preview Component - Mobile-First Refactor with Promotional Pricing
 */

(function () {
    const bookingPreviewHTML = `
    <div class="booking-preview section-padding">
        <div class="container">
            <div class="booking-preview-inner">
                <div class="booking-content">
                    <h2 class="section-heading">Quick Booking</h2>
                    <div class="booking-features">
                        <div class="booking-feature"><i class="fas fa-check-circle"></i> Instant confirmation</div>
                        <div class="booking-feature"><i class="fas fa-check-circle"></i> Free cancellation</div>
                        <div class="booking-feature"><i class="fas fa-check-circle"></i> Safety gear included</div>
                        <div class="booking-feature"><i class="fas fa-check-circle"></i> No hidden fees</div>
                    </div>
                    
                    <!-- Promotional Offer Badge -->
                    <div class="promo-badge">
                        <i class="fas fa-gift"></i>
                        <span>FREE ADD-ONS</span>
                        <small>Limited Time Offer</small>
                    </div>
                </div>
                
                <div class="booking-form-container">
                    <form id="quick-booking-form" class="booking-form">
                        <!-- Step 1: Core Choices -->
                        <div class="form-step active" id="form-step-1">
                            <!-- Package Selection -->
                            <div class="package-selection" id="package-selection">
                                <h3 class="package-heading"><i class="fas fa-box-open"></i> Choose a Package</h3>
                                <!-- Dropdown for mobile -->
                                <div class="form-group mobile-only">
                                    <div class="select-wrapper">
                                        <select id="package-select" class="form-control">
                                            <option value="" disabled selected>Select a package...</option>
                                            <option value="lite" data-price="140">Adventure Lite – $140</option>
                                            <option value="family" data-price="280">Family Fun – $280</option>
                                            <option value="explorer" data-price="420">Full-Day Explorer – $420</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- Card grid for tablet/desktop -->
                                <div class="package-grid desktop-only">
                                    <button type="button" class="package-card" data-package="lite">
                                        <h4>Adventure Lite</h4>
                                        <p>Heffley • Single Boat • 2 hrs</p>
                                        <span class="price-tag">$140</span>
                                    </button>
                                    <button type="button" class="package-card" data-package="family">
                                        <h4>Family Fun</h4>
                                        <p>Paul • Family Boat • 4 hrs + Cooler</p>
                                        <span class="price-tag">$280</span>
                                    </button>
                                    <button type="button" class="package-card" data-package="explorer">
                                        <h4>Full-Day Explorer</h4>
                                        <p>Shuswap • Family Boat • 6 hrs + All add-ons</p>
                                        <span class="price-tag">$420</span>
                                    </button>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="lake"><i class="fas fa-water"></i> Choose a Lake</label>
                                <div class="select-wrapper">
                            <select id="lake" name="lake" class="form-control" required>
                                        <option value="" disabled selected>Select a lake...</option>
                                        <option value="heffley">Heffley Lake</option>
                                <option value="paul">Paul Lake</option>
                                <option value="monte">Monte Lake</option>
                            </select>
                        </div>
                            </div>
                        <div class="form-group">
                                <label for="boat-type"><i class="fas fa-ship"></i> Boat Type</label>
                                <div class="select-wrapper">
                            <select id="boat-type" name="boat-type" class="form-control" required>
                                        <option value="" disabled selected>Select boat type...</option>
                                <option value="single">Single Boat (1-2 people)</option>
                                        <option value="family">Family Boat (3-4 people)</option>
                            </select>
                        </div>
                            </div>
                        <div class="form-group">
                                <label for="duration"><i class="fas fa-clock"></i> Rental Duration</label>
                                 <div class="select-wrapper">
                            <select id="duration" name="duration" class="form-control" required>
                                        <option value="" disabled selected>Select duration...</option>
                                        <option value="2">2 Hours</option>
                                        <option value="4">4 Hours</option>
                                        <option value="6">6 Hours</option>
                            </select>
                                </div>
                            </div>
                            <button type="button" class="btn btn-accent btn-block" id="form-next-btn">Next</button>
                        </div>

                        <!-- Step 2: Details & Add-ons -->
                        <div class="form-step" id="form-step-2">
                            <div class="form-group">
                                <label for="booking-date"><i class="fas fa-calendar-alt"></i> Date</label>
                                <input type="date" id="booking-date" name="booking-date" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="booking-time"><i class="fas fa-hourglass-start"></i> Time</label>
                                <input type="time" id="booking-time" name="booking-time" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-gift"></i> Add-ons (All Included FREE!)</label>
                                <div class="addon-offer-label">
                                    <i class="fas fa-star"></i>
                                    <span>Special Offer: All add-ons included at no extra charge!</span>
                                </div>
                                <div class="chip-group">
                                    <button type="button" class="chip-toggle included" data-value="cooler">
                                        <i class="fas fa-snowflake"></i>
                                        <span>Cooler</span>
                                        <small>$30 value</small>
                                        <span class="included-badge">INCLUDED</span>
                                    </button>
                                    <button type="button" class="chip-toggle included" data-value="speaker">
                                        <i class="fas fa-music"></i>
                                        <span>JBL Speaker</span>
                                        <small>$20 value</small>
                                        <span class="included-badge">INCLUDED</span>
                                    </button>
                                    <button type="button" class="chip-toggle included" data-value="drybags">
                                        <i class="fas fa-shield-alt"></i>
                                        <span>Dry Bags</span>
                                        <small>$10 value</small>
                                        <span class="included-badge">INCLUDED</span>
                                    </button>
                                </div>
                            </div>
                            <button type="button" class="btn-text" id="form-back-btn">← Back</button>
                        </div>
                    </form>
                    
                    <div class="booking-footer hidden" id="booking-footer">
                        <div class="price-breakdown" id="price-breakdown">
                            <div class="price-line base-price">
                                <span>Base Price:</span>
                                <span id="base-price-display">$0.00</span>
                            </div>
                            <div class="price-line addons-value hidden" id="addons-value-line">
                                <span>Add-ons Value:</span>
                                <span id="addons-value-display">$0.00</span>
                            </div>
                            <div class="price-line savings hidden" id="savings-line">
                                <span>Your Savings:</span>
                                <span id="savings-display">-$0.00</span>
                            </div>
                            <div class="price-line final-price">
                                <span>Final Price:</span>
                                <span id="price-total">$0.00</span>
                            </div>
                        </div>
                        <button type="submit" form="quick-booking-form" class="btn btn-accent btn-lg btn-block" id="cta-btn">Check Availability</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Stripe Buy Button for Lite Package -->
    <div id="stripe-lite-container" class="hidden stripe-container">
        <stripe-buy-button buy-button-id="buy_btn_1RdwdK2MjkSKR6fVkocemh2" publishable-key="pk_test_51Q3kG52MjkSKR6fv…"></stripe-buy-button>
    </div>

    <div id="stripe-family-container" class="hidden stripe-container">
        <stripe-buy-button buy-button-id="buy_btn_1RfamilyK2M…" publishable-key="pk_test_…"></stripe-buy-button>
    </div>

    <style>
        /* BASE & LAYOUT */
        .booking-preview {
            background-image: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
            color: var(--white);
            position: relative;
            padding-top: 48px;
            padding-bottom: 48px;
        }
        .booking-preview-inner {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .booking-content .section-heading {
            color: var(--white);
            font-size: clamp(24px, 5vw, 32px);
            text-align: left;
            margin-bottom: 1rem;
        }
        .booking-content .section-heading:after {
            display: none;
        }
        .booking-features {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
        }
        .booking-feature {
            background: rgba(255,255,255,0.1);
            padding: 0.5rem 0.75rem;
            border-radius: var(--radius-md);
            font-size: 0.9rem;
        }
        .booking-feature i {
            color: var(--secondary);
            margin-right: 0.5rem;
        }
        
        /* PROMOTIONAL OFFER BADGE */
        .promo-badge {
            background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 12px;
            text-align: center;
            margin-top: 1rem;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
            animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .promo-badge i {
            font-size: 1.2rem;
            margin-right: 0.5rem;
        }
        
        .promo-badge span {
            font-weight: 700;
            font-size: 0.9rem;
            letter-spacing: 0.5px;
        }
        
        .promo-badge small {
            display: block;
            font-size: 0.7rem;
            opacity: 0.9;
            margin-top: 0.25rem;
        }
        
        @keyframes pulse-glow {
            0%, 100% { 
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
            }
            50% { 
                transform: scale(1.02);
                box-shadow: 0 6px 20px rgba(255, 107, 53, 0.5);
            }
        }
        
        /* FORM CONTAINER */
        .booking-form-container {
            background-color: var(--white);
            color: var(--dark);
            border-radius: 24px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            padding: 1.5rem 1.25rem;
            display: flex;
            flex-direction: column;
            margin: 0.5rem;
        }
        .booking-form {
             flex-grow: 1;
        }
        .form-step { display: none; }
        .form-step.active { display: block; animation: fadeIn 0.4s; }

        /* FORM ELEMENTS */
        .form-group {
            margin-bottom: 1.25rem;
        }
        .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            color: var(--dark);
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .form-control {
            width: 100%;
            min-height: 48px; /* Tap target */
            padding: 0 1rem;
            border: 1px solid #ddd;
            border-radius: var(--radius-md);
            font-size: 1rem;
            background-color: #f8f8f8;
        }
        .select-wrapper {
            position: relative;
        }
        .select-wrapper::after {
            content: '▼';
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            color: #888;
            font-size: 0.8rem;
        }
        select.form-control {
            appearance: none; 
            -webkit-appearance: none;
            padding-right: 2.5rem;
        }
        .btn-text {
            background: none;
            border: none;
            color: var(--primary);
            font-weight: 600;
            cursor: pointer;
            padding: 0.5rem;
        }

        /* ADD-ON OFFER LABEL */
        .addon-offer-label {
            background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
            color: white;
            padding: 0.6rem 1rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            text-align: center;
            margin-bottom: 1rem;
            box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
        }
        
        .addon-offer-label i {
            margin-right: 0.5rem;
            color: #ffeb3b;
        }

        /* CHIPS - REDESIGNED AS INCLUDED ITEMS */
        .chip-group {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .chip-toggle {
            background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-align: left;
            box-shadow: 0 3px 10px rgba(76, 175, 80, 0.2);
        }
        
        .chip-toggle:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
        }
        
        .chip-toggle i {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .chip-toggle span {
            font-weight: 600;
            font-size: 0.95rem;
        }
        
        .chip-toggle small {
            font-size: 0.75rem;
            opacity: 0.8;
            margin-left: auto;
        }
        
        .included-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.25rem 0.6rem;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            margin-left: 0.5rem;
        }
        
        /* PRICE BREAKDOWN */
        .price-breakdown {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 1rem;
            margin-bottom: 1rem;
            border: 1px solid #e9ecef;
        }
        
        .price-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.4rem 0;
            font-size: 0.9rem;
        }
        
        .price-line:not(:last-child) {
            border-bottom: 1px solid #e9ecef;
        }
        
        .price-line.base-price {
            color: var(--dark);
            font-weight: 500;
        }
        
        .price-line.addons-value {
            color: #666;
        }
        
        .price-line.savings {
            color: #4caf50;
            font-weight: 600;
        }
        
        .price-line.final-price {
            color: var(--primary);
            font-weight: 700;
            font-size: 1.1rem;
            padding-top: 0.75rem;
            border-top: 2px solid var(--primary);
            border-bottom: none;
        }
        
        /* FOOTER & STICKY CTA */
        .booking-footer {
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid #eee;
        }
        
        .booking-footer.sticky {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--white);
            padding: 1rem 6%;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
            border-top: 1px solid #ddd;
            z-index: 100;
        }

        #cta-btn {
            width: 100%;
            font-size: 1rem;
            padding: 0.8rem 1rem;
        }
        
        /* MOBILE OPTIMIZATIONS */
        @media (max-width: 576px) {
            .booking-preview {
                padding-top: 32px;
                padding-bottom: 32px;
            }
            
            .booking-form-container {
                border-radius: 20px;
                padding: 1.25rem 1rem;
                margin: 0 0.25rem;
            }
            
            .form-control {
                font-size: 16px; /* Prevents iOS zoom on focus */
            }
            
            .booking-feature {
                font-size: 0.85rem;
                padding: 0.4rem 0.6rem;
            }
            
            .form-group label {
                font-size: 0.85rem;
            }
            
            #cta-btn {
                padding: 0.7rem 1rem;
            }
            
            .promo-badge {
                padding: 0.6rem 0.8rem;
            }
            
            .chip-toggle {
                padding: 0.8rem;
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }
            
            .chip-toggle small {
                margin-left: 0;
            }
        }
        
        /* DESKTOP STYLES */
        @media (min-width: 768px) {
            .booking-preview-inner {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--space-xl);
                align-items: center;
            }
            
            .booking-features {
                grid-template-columns: 1fr 1fr;
            }
            
             .booking-form-container {
                padding: 2rem;
                border-radius: 32px;
                margin: 0;
            }
            
            .chip-group {
                display: grid;
                grid-template-columns: 1fr;
                gap: 0.75rem;
            }
            
            .chip-toggle {
                flex-direction: row;
                align-items: center;
            }
            
            .promo-badge {
                margin-top: 1.5rem;
                padding: 1rem 1.5rem;
            }
        }

        .booking-footer.hidden{display:none;}

        /* Processing state */
        .btn.processing{
            background: linear-gradient(135deg,#43a047 0%,#2e7d32 100%);
            color:#fff;
            animation:pulse 1s infinite;
        }
        @keyframes pulse{0%{transform:scale(1);}50%{transform:scale(1.05);}100%{transform:scale(1);}}

        /* Package Selection */
        .package-selection{margin-bottom:1.5rem;}
        .package-heading{font-size:1.1rem;font-weight:600;margin-bottom:0.5rem;color:var(--dark)}
        .package-grid{display:grid;grid-template-columns:1fr;gap:0.75rem}
        @media(min-width:768px){.package-grid{flex-direction:row}}
        .package-card{flex:1 1 100%;background:#f8f8f8;border:2px solid transparent;border-radius:var(--radius-md);padding:1rem;text-align:left;cursor:pointer;transition:all .3s}
        .package-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-sm)}
        .package-card.active{border-color:var(--primary)}
        .package-card h4{margin:0 0 0.25rem;font-size:1rem;font-weight:600;color:var(--primary-dark)}
        .price-tag{display:inline-block;margin-top:0.5rem;font-weight:700;color:var(--primary)}

        .stripe-container{margin-top:1.5rem;text-align:center}
        .hidden{display:none;}

        /* Hide/show elements based on viewport */
        .mobile-only { display: block; }
        .desktop-only { display: none; }

        @media (min-width: 768px) {
            .mobile-only { display: none; }
            .desktop-only { display: grid; grid-template-columns: repeat(3, 1fr); }
        }
    </style>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Variables
        const form = document.getElementById('quick-booking-form');
        const step1 = document.getElementById('form-step-1');
        const step2 = document.getElementById('form-step-2');
        const nextBtn = document.getElementById('form-next-btn');
        const backBtn = document.getElementById('form-back-btn');
        const ctaBtn = document.getElementById('cta-btn');
            const priceTotal = document.getElementById('price-total');
            const basePriceDisplay = document.getElementById('base-price-display');
            const addonsValueDisplay = document.getElementById('addons-value-display');
            const savingsDisplay = document.getElementById('savings-display');
            const addonsValueLine = document.getElementById('addons-value-line');
            const savingsLine = document.getElementById('savings-line');
            const chipToggles = document.querySelectorAll('.chip-toggle');
            const bookingFooter = document.getElementById('booking-footer');

            // Core functionality
            if (nextBtn) nextBtn.addEventListener('click', () => {
                step1.classList.remove('active');
                step2.classList.add('active');
                toggleRequired(step2);
                bookingFooter.classList.remove('hidden');
                updateCTA('Check Availability');
                calculatePrice();
        });

            if (backBtn) backBtn.addEventListener('click', () => {
            step2.classList.remove('active');
            step1.classList.add('active');
                toggleRequired(step1);
                bookingFooter.classList.add('hidden');
                updateCTA('Check Availability');
        });

            // Toggle chip selection (all chips are included by default)
            chipToggles.forEach(chip => {
                chip.classList.add('active'); // All add-ons are included
                chip.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent toggling off
                    // Show message that it's included
                    chip.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        chip.style.transform = 'scale(1)';
                    }, 150);
                });
            });

            // Form field change event for price calculation
            const formFields = form.querySelectorAll('select, input');
            formFields.forEach(field => {
                field.addEventListener('change', calculatePrice);
            });
            
            // Initial state of CTA
            updateCTA('Check Availability');
            
            // CTA text update function
            function updateCTA(text) {
                if (ctaBtn) ctaBtn.textContent = text;
            }
            
            // Promotional pricing calculation logic
            function calculatePrice() {
                // Get values
                const boatType = document.getElementById('boat-type')?.value;
                const duration = document.getElementById('duration')?.value;
                
                // Base prices per hour
                const hourlyPrices = {
                    single: {
                        2: 70,
                        4: 60,
                        6: 50
                    },
                    family: {
                        2: 90,
                        4: 80,
                        6: 70
                    }
                };
                
                // Add-ons values
                const addOnValues = {
                    cooler: 30,
                    speaker: 20,
                    drybags: 10
                };
                
                // Calculate base price (hourly rate * duration)
                let basePrice = 0;
                if (boatType && duration) {
                    const hourlyRate = hourlyPrices[boatType][duration];
                    basePrice = hourlyRate * duration;
                }
                
                // Calculate total add-ons value (all are included)
                let addonsValue = 0;
                chipToggles.forEach(chip => {
                    const addOnType = chip.dataset.value;
                    if (addOnType && addOnValues[addOnType]) {
                        addonsValue += addOnValues[addOnType];
                    }
                });
                
                // Final price is always the base price (promotional pricing)
                const finalPrice = basePrice;
                const savings = addonsValue;
                
                // Update displays
                if (basePriceDisplay) basePriceDisplay.textContent = '$' + basePrice.toFixed(2);
                if (priceTotal) priceTotal.textContent = '$' + finalPrice.toFixed(2);
                
                // Show detailed breakdown if add-ons are selected
                if (addonsValue > 0) {
                    if (addonsValueDisplay) addonsValueDisplay.textContent = '$' + addonsValue.toFixed(2);
                    if (savingsDisplay) savingsDisplay.textContent = '-$' + savings.toFixed(2);
                    if (addonsValueLine) addonsValueLine.classList.remove('hidden');
                    if (savingsLine) savingsLine.classList.remove('hidden');
                } else {
                    if (addonsValueLine) addonsValueLine.classList.add('hidden');
                    if (savingsLine) savingsLine.classList.add('hidden');
                }
            }

        function toggleRequired(activeStep){
            document.querySelectorAll('.form-step').forEach(step=>{
                step.querySelectorAll('select, input').forEach(el=>{
                    if(activeStep===step){
                        if(el.dataset.originalRequired!==undefined) el.setAttribute('required','');
                    }else{
                        if(el.hasAttribute('required')) el.dataset.originalRequired='true';
                        el.removeAttribute('required');
                    }
                });
            });
        }

        // call initially
        toggleRequired(step1);

        // Package Selection
        const packageCards=document.querySelectorAll('.package-card');
        const packages={
         lite:{lake:'heffley',boat:'single',duration:'2',addons:{} ,price:140},
         family:{lake:'paul',boat:'family',duration:'4',addons:{cooler:true},price:280},
         explorer:{lake:'shuswap',boat:'family',duration:'6',addons:{cooler:true,speaker:true,drybags:true},price:420}
        };
        packageCards.forEach(card=>{card.addEventListener('click',()=>{
            packageCards.forEach(c=>c.classList.remove('active'));
            card.classList.add('active');
            const pkg=packages[card.dataset.package];
            document.getElementById('lake').value=pkg.lake;
            document.getElementById('boat-type').value=pkg.boat;
            document.getElementById('duration').value=pkg.duration;
            // All add-ons are included by default
            chipToggles.forEach(ch=>{ch.classList.add('active');});
            calculatePrice();
        });});

        const stripeLite=document.getElementById('stripe-lite-container');
        const stripeFamily = document.getElementById('stripe-family-container');
        const stripeExplorer = document.getElementById('stripe-explorer-container');

        packageCards.forEach(card => {
          card.addEventListener('click', () => {
            const id = card.dataset.package;
            // show only the matching button
            stripeLite.classList.toggle('hidden', id!=='lite');
            stripeFamily.classList.toggle('hidden', id!=='family');
            stripeExplorer.classList.toggle('hidden', id!=='explorer');
            bookingFooter.classList.toggle('hidden', true);    // hide internal CTA
          });
        });
        
        // Initialize price calculation
        setTimeout(() => {
            calculatePrice();
        }, 100);
        });
    </script>
    `;

    // Load the booking preview component
    ComponentLoader.loadComponent('booking-preview-container', bookingPreviewHTML);
})();