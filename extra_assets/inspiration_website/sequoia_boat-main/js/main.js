/**
 * Sequoia Boat Rentals & Concierge Services
 * Main JavaScript File
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Load Font Awesome for icons
    loadFontAwesome();

    // Initialize animations for elements
    initAnimations();

    // Smooth scrolling for anchor links
    initSmoothScrolling();

    // Initialize parallax effect
    initParallax();

    // Initialize Stripe if available
    if (typeof initializeStripe === 'function') {
        initializeStripe();
    }

    // Booking Summary Functionality
    const bookingForm = document.getElementById('quick-booking-form');
    const summaryDetails = document.getElementById('summary-details');

    if (bookingForm) {
        const formInputs = bookingForm.querySelectorAll('select, input[type="date"], input[type="checkbox"]');

        // Function to update summary
        function updateBookingSummary() {
            if (!summaryDetails) return;  // Summary panel not present in current layout
            const lake = document.getElementById('lake');
            const boatType = document.getElementById('boat-type');
            const duration = document.getElementById('duration');
            const bookingDate = document.getElementById('booking-date');
            const bookingTime = document.getElementById('booking-time');
            const cooler = document.getElementById('cooler');
            const speaker = document.getElementById('speaker');
            const drybags = document.getElementById('drybags');

            // Check if all required fields are filled
            if (lake.value && boatType.value && duration.value && bookingDate.value && bookingTime.value) {
                // Show summary details
                summaryDetails.style.display = 'block';

                // Update summary fields
                document.getElementById('summary-lake').textContent = lake.options[lake.selectedIndex].text;
                document.getElementById('summary-boat-type').textContent = boatType.options[boatType.selectedIndex].text;
                document.getElementById('summary-duration').textContent = duration.options[duration.selectedIndex].text;

                const formattedDate = new Date(bookingDate.value).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                document.getElementById('summary-datetime').textContent = `${formattedDate} at ${bookingTime.value}`;

                // Check add-ons and calculate promotional pricing
                let addons = [];
                let addonsTotal = 0;

                if (cooler && cooler.checked) {
                    addons.push('Cooler (FREE - $30 value)');
                    addonsTotal += 30;
                }

                if (speaker && speaker.checked) {
                    addons.push('JBL Speaker (FREE - $20 value)');
                    addonsTotal += 20;
                }

                if (drybags && drybags.checked) {
                    addons.push('Dry Bags (FREE - $10 value)');
                    addonsTotal += 10;
                }

                document.getElementById('summary-addons').textContent = addons.length ? addons.join(', ') : 'None';

                // Calculate base price using promotional pricing system
                const isWeekend = new Date(bookingDate.value).getDay() === 0 || new Date(bookingDate.value).getDay() === 6;
                let basePrice = 0;

                // Base prices per hour (matching booking-preview.js)
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

                // Get duration from the duration select value
                const durationHours = parseInt(duration.value.split('-')[0]) || parseInt(duration.value);
                const boatTypeKey = boatType.value === 'single' ? 'single' : 'family';

                if (hourlyPrices[boatTypeKey] && hourlyPrices[boatTypeKey][durationHours]) {
                    const hourlyRate = hourlyPrices[boatTypeKey][durationHours];
                    basePrice = hourlyRate * durationHours;
                }

                // Apply weekend surcharge if needed
                if (isWeekend) {
                    basePrice = basePrice * 1.125; // 12.5% weekend surcharge
                }

                // Final price is always the base price (promotional pricing)
                const finalPrice = basePrice;

                // Update price display
                const priceTotalEl = document.getElementById('price-total');
                if (priceTotalEl) {
                    if (addonsTotal > 0) {
                        // Show promotional pricing breakdown
                        priceTotalEl.innerHTML = `
                            <div class="price-breakdown-summary">
                                <div>Base Price: $${basePrice.toFixed(2)}</div>
                                <div>Add-ons Value: $${addonsTotal.toFixed(2)}</div>
                                <div style="color: #4caf50; font-weight: 600;">Your Savings: -$${addonsTotal.toFixed(2)}</div>
                                <div style="color: var(--primary); font-weight: 700; font-size: 1.1rem; border-top: 1px solid #ddd; padding-top: 0.5rem; margin-top: 0.5rem;">Final Price: $${finalPrice.toFixed(2)}</div>
                            </div>
                        `;
                    } else {
                        priceTotalEl.textContent = `$${finalPrice.toFixed(2)}`;
                    }
                }
            }
        }

        // Add event listeners
        formInputs.forEach(input => {
            input.addEventListener('change', updateBookingSummary);
        });

        // Listen to form submission for availability check
        bookingForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            updateBookingSummary();

            const submitButton = document.getElementById('cta-btn');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Checking...';
            submitButton.classList.add('processing');

            // --- Form Data ---
            const lake = document.getElementById('lake');
            const boatType = document.getElementById('boat-type');
            const duration = document.getElementById('duration');
            const bookingDate = document.getElementById('booking-date');
            const bookingTime = document.getElementById('booking-time');
            const cooler = document.getElementById('cooler');
            const speaker = document.getElementById('speaker');
            const drybags = document.getElementById('drybags');
            const priceTotalEl = document.getElementById('price-total');
            const estimatedTotal = priceTotalEl ? priceTotalEl.textContent : '$0.00';

            // Validate required date/time fields
            if (!bookingDate || !bookingTime || !bookingDate.value || !bookingTime.value) {
                await showModal({ title: 'Missing Info', message: 'Please choose a date and time before checking availability.', confirmText: 'OK' });
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.classList.remove('processing');
                return;
            }

            // Gather selected add-ons from chip toggles
            const selectedAddOns = {};
            document.querySelectorAll('.chip-toggle.active').forEach(chip => {
                selectedAddOns[chip.dataset.value] = true;
            });

            // --- Availability Check Logic ---
            const MAX_CONCURRENT_BOATS = 2; // We can operate 2 boats at the same time

            const getBookingSlot = (date, timeStr, durationStr) => {
                // First, try to parse the 12-hour AM/PM format (from database)
                let timeParts = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/);
                if (timeParts) {
                    let hours = parseInt(timeParts[1], 10);
                    const minutes = parseInt(timeParts[2], 10);
                    const ampm = timeParts[3];

                    if (ampm === 'PM' && hours < 12) hours += 12;
                    if (ampm === 'AM' && hours === 12) hours = 0; // Handle midnight case

                    const startTime = new Date(`${date}T00:00:00`);
                    startTime.setHours(hours, minutes, 0, 0);

                    const durationHours = parseInt(durationStr.split('-')[0], 10);
                    const endTime = new Date(startTime.getTime());
                    endTime.setHours(startTime.getHours() + durationHours);
                    return { startTime, endTime };
                }

                // If that fails, try to parse the 24-hour format (from form value)
                timeParts = timeStr.match(/(\d+):(\d+)/);
                if (timeParts) {
                    const hours = parseInt(timeParts[1], 10);
                    const minutes = parseInt(timeParts[2], 10);

                    const startTime = new Date(`${date}T00:00:00`);
                    startTime.setHours(hours, minutes, 0, 0);

                    const durationHours = parseInt(durationStr.split('-')[0], 10);
                    const endTime = new Date(startTime.getTime());
                    endTime.setHours(startTime.getHours() + durationHours);
                    return { startTime, endTime };
                }

                return null; // Return null if no format matches
            };

            const requestedSlot = getBookingSlot(bookingDate.value, bookingTime.value, duration.value);

            if (!requestedSlot) {
                await showModal({
                    title: 'Invalid Time',
                    message: 'Invalid time format. Please select a valid time.',
                    confirmText: 'OK'
                });
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.classList.remove('processing');
                return;
            }

            try {
                const snapshot = await db.collection('bookings').where('date', '==', bookingDate.value).get();
                const bookingsForDay = snapshot.docs.map(doc => doc.data());

                let overlappingBookings = 0;
                for (const existingBooking of bookingsForDay) {
                    const existingSlot = getBookingSlot(existingBooking.date, existingBooking.time, existingBooking.duration);
                    if (!existingSlot) continue;

                    // Check for overlap
                    if (requestedSlot.startTime < existingSlot.endTime && requestedSlot.endTime > existingSlot.startTime) {
                        overlappingBookings++;
                    }
                }

                if (overlappingBookings >= MAX_CONCURRENT_BOATS) {
                    // compute suggestion times on same day
                    const suggestedTimes = [];
                    const openingHours = [9, 10, 11, 12, 13, 14];
                    openingHours.forEach(h => {
                        const slotStart = new Date(`${bookingDate.value}T00:00:00`);
                        slotStart.setHours(h, 0, 0, 0);
                        const slotEnd = new Date(slotStart.getTime());
                        slotEnd.setHours(slotStart.getHours() + parseInt(duration.value.split('-')[0], 10));
                        let conflict = false;
                        bookingsForDay.forEach(b => {
                            const exSlot = getBookingSlot(b.date, b.time, b.duration);
                            if (exSlot && slotStart < exSlot.endTime && slotEnd > exSlot.startTime) { conflict = true; }
                        });
                        if (!conflict) {
                            suggestedTimes.push(`${('' + h).padStart(2, '0')}:00`);
                        }
                    });
                    const suggestionMsg = suggestedTimes.length ? `Available start times on ${bookingDate.value}: ${suggestedTimes.join(', ')}` : 'No alternate slots available for this day.';
                    await showModal({ title: 'Not Available', message: `Sorry, selected slot is fully booked.<br>${suggestionMsg}`, confirmText: 'OK' });
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    submitButton.classList.remove('processing');
                } else {
                    // Availability good: auto save and show invoice
                    submitButton.textContent = 'Processing...';
                    const bookingData = {
                        lake: lake.options[lake.selectedIndex].text,
                        boatType: boatType.options[boatType.selectedIndex].text,
                        duration: duration.options[duration.selectedIndex].text,
                        date: bookingDate.value,
                        time: bookingTime.value,
                        addons: selectedAddOns,
                        estimatedTotal: estimatedTotal,
                        status: 'pending',
                        isPaid: false,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    };
                    try {
                        const docRef = await db.collection('bookings').add(bookingData);
                        const bookingId = docRef.id;
                        await showInvoiceModal(bookingData, bookingId);
                    } catch (e) { console.error(e); await showModal({ title: 'Error', message: 'Error saving booking. Try again.', confirmText: 'OK' }); } finally {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Check Availability';
                        submitButton.classList.remove('processing');
                        bookingForm.reset(); if (summaryDetails) summaryDetails.style.display = 'none';
                    }
                }
            } catch (error) {
                console.error("Error checking availability: ", error);
                await showModal({
                    title: 'Error',
                    message: 'There was an error checking for availability. Please try again or contact us directly.',
                    confirmText: 'OK'
                });
            }
        });
    }

    // Modal elements and utility function
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalFooter = document.getElementById('modal-footer');
    const modalCloseBtn = document.getElementById('modal-close');

    /**
     * Display a professional modal dialog.
     * Returns a Promise that resolves to true (confirm) or false (cancel/close).
     */
    function showModal({ title = '', message = '', confirmText = 'OK', cancelText = null, isError = false }) {
        return new Promise(resolve => {
            // Set content
            modalTitle.textContent = title;
            modalBody.innerHTML = `<p>${message}</p>`;

            // Clear previous buttons
            modalFooter.innerHTML = '';

            // Confirm button
            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'btn btn-primary';
            confirmBtn.textContent = confirmText;
            modalFooter.appendChild(confirmBtn);

            // Optional cancel button
            let cancelBtn = null;
            if (cancelText) {
                cancelBtn = document.createElement('button');
                cancelBtn.className = 'btn btn-outline';
                cancelBtn.textContent = cancelText;
                modalFooter.appendChild(cancelBtn);
            }

            // Show modal
            modalOverlay.style.display = 'flex';

            // Helper to close modal and cleanup
            function closeModal(result) {
                modalOverlay.style.display = 'none';
                confirmBtn.removeEventListener('click', onConfirm);
                if (cancelBtn) cancelBtn.removeEventListener('click', onCancel);
                modalCloseBtn.removeEventListener('click', onCancel);
                resolve(result);
            }

            function onConfirm() { closeModal(true); }
            function onCancel() { closeModal(false); }

            confirmBtn.addEventListener('click', onConfirm);
            if (cancelBtn) cancelBtn.addEventListener('click', onCancel);
            modalCloseBtn.addEventListener('click', onCancel);
        });
    }
});

/**
 * Load Font Awesome for icons
 */
function loadFontAwesome() {
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    fontAwesomeLink.integrity = 'sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==';
    fontAwesomeLink.crossOrigin = 'anonymous';
    fontAwesomeLink.referrerPolicy = 'no-referrer';
    document.head.appendChild(fontAwesomeLink);
}

/**
 * Initialize animations for elements that should animate when they come into view
 */
function initAnimations() {
    // Get all elements that should animate when scrolled into view
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for browsers that don't support Intersection Observer
        animatedElements.forEach(el => {
            el.classList.add('animated');
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    // Select all links with hashes
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if the anchor is on the current page
            const targetId = this.getAttribute('href').split('#')[1];
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header if present
                    behavior: 'smooth'
                });

                // Update URL without page reload
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
}

/**
 * Initialize parallax effect for sections
 */
function initParallax() {
    // Add parallax class to sections that should have parallax effect
    const sections = document.querySelectorAll('section, .hero, .footer');
    sections.forEach(section => {
        section.classList.add('parallax-section');
    });

    // Add CSS for parallax effect
    const style = document.createElement('style');
    style.textContent = `
        .parallax-section {
            position: relative;
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            transform: translateZ(0);
            will-change: transform;
        }
        
        @media (max-width: 768px) {
            .parallax-section {
                background-attachment: scroll;
            }
        }
    `;
    document.head.appendChild(style);

    // Add parallax effect on scroll
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;

        // Apply parallax effect to elements with .parallax-bg class
        document.querySelectorAll('.parallax-bg').forEach(element => {
            const speed = element.dataset.speed || 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0px, ${yPos}px, 0px)`;
        });

        // Apply subtle parallax effect to sections
        document.querySelectorAll('.parallax-section').forEach(section => {
            const rect = section.getBoundingClientRect();
            const inView = (rect.top < window.innerHeight && rect.bottom > 0);

            if (inView) {
                const speed = 0.05;
                const yPos = (rect.top * speed);
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });

    // Add parallax background elements
    addParallaxBackgrounds();
}

/**
 * Add parallax background elements to sections
 */
function addParallaxBackgrounds() {
    // Add parallax background to about section
    const aboutSection = document.getElementById('about-container');
    if (aboutSection) {
        const aboutBg = document.createElement('div');
        aboutBg.className = 'parallax-bg';
        aboutBg.dataset.speed = '0.2';
        aboutSection.prepend(aboutBg);
    }

    // Add parallax background to features section
    const featuresSection = document.getElementById('features-container');
    if (featuresSection) {
        const featuresBg = document.createElement('div');
        featuresBg.className = 'parallax-bg';
        featuresBg.dataset.speed = '0.15';
        featuresSection.prepend(featuresBg);
    }

    // Add parallax background to lakes section
    const lakesSection = document.getElementById('lakes-container');
    if (lakesSection) {
        const lakesBg = document.createElement('div');
        lakesBg.className = 'parallax-bg';
        lakesBg.dataset.speed = '0.25';
        lakesSection.prepend(lakesBg);
    }

    // Add CSS for parallax backgrounds
    const style = document.createElement('style');
    style.textContent = `
        .parallax-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
        }
        
        #about-container .parallax-bg {
            background: radial-gradient(circle at 80% 50%, rgba(78, 205, 196, 0.1) 0%, rgba(78, 205, 196, 0) 70%);
        }
        
        #features-container .parallax-bg {
            background: radial-gradient(circle at 20% 80%, rgba(11, 83, 148, 0.08) 0%, rgba(11, 83, 148, 0) 60%);
        }
        
        #lakes-container .parallax-bg {
            background: radial-gradient(circle at 90% 10%, rgba(78, 205, 196, 0.08) 0%, rgba(78, 205, 196, 0) 70%);
        }
    `;
    document.head.appendChild(style);
} 