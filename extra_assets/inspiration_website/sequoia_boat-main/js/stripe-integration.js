/**
 * Sequoia Boat Rentals & Concierge Services
 * Stripe Payment Integration
 */

// Initialize Stripe with your publishable key (from environment variables in production)
// For development, you can set this in a .env file (not committed to git)
const stripePublicKey = 'pk_test_51Q3kG52MjkSKR6fvmtb34MRHNdvuf71pcRXm8AnvPEOXLAHnVe21vxp6yhs0M4pesJJbi0zPE98GDEG7lHmqATWn00rj6Mm2Ag';
let stripe;

// Define your Stripe Payment Link (create in Stripe dashboard)
const paymentLinkURL = 'https://buy.stripe.com/test_1234567890abcdefg'; // TODO: replace with real payment link

// Initialize Cloud Functions reference
const functions = firebase.functions();

/**
 * Initialize Stripe with the provided key
 */
function initializeStripe() {
    // In a production environment, you would load this from environment variables
    // For example: const stripeKey = process.env.STRIPE_PUBLIC_KEY;
    if (typeof Stripe !== 'undefined') {
        stripe = Stripe(stripePublicKey);
    } else {
        console.error('Stripe.js is not loaded');
    }
}

/**
 * Create a simple checkout link for the stripe payment page
 * 
 * This is a simplified version. In a production environment, you would:
 * 1. Have a server endpoint that creates a Stripe Checkout session
 * 2. Return the session ID to the client
 * 3. Use stripe.redirectToCheckout() with that session ID
 * 
 * @param {Object} bookingData - The booking details
 * @param {String} price - The price to charge
 * @returns {String} - A URL to redirect to for checkout
 */
function createCheckoutLink(bookingData, price) {
    return paymentLinkURL;
}

// Map package keywords to Stripe Payment Links
const PACKAGE_LINKS = {
    standard: 'https://buy.stripe.com/test_7sY00cbTV4wgetsdESdUY01', // 2-6 hour rentals
    fullDay: 'https://buy.stripe.com/test_bJeaEQaPRbYI2KK44idUY02', // 8 hour package
    family: 'https://buy.stripe.com/test_dRm28k8HJ2o81GGbwKdUY03'  // family plan
};

/**
 * Return the correct Stripe Payment Link based on the booking data.
 * @param {Object} booking – Firestore booking document data
 */
function createDirectCheckoutSession(booking) {
    const dur = (booking.duration || '').toLowerCase();

    // Detect Full-Day package (8h) first
    if (dur.includes('8')) return PACKAGE_LINKS.fullDay;

    // Detect Family plan via boatType or a custom flag
    if ((booking.boatType || '').toLowerCase().includes('family')) {
        return PACKAGE_LINKS.family;
    }

    // Default to standard hourly/half-day rental
    return PACKAGE_LINKS.standard;
}

/**
 * Redirects user to Stripe Checkout using a Cloud Function to create the session.
 * @param {String} bookingId Firestore document id
 */
async function redirectToStripeCheckout(bookingId) {
    const btn = document.getElementById('checkout-button');
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Redirecting...';
    }
    try {
        // First, get the booking data from Firestore
        const bookingDoc = await db.collection('bookings').doc(bookingId).get();
        if (!bookingDoc.exists) {
            throw new Error('Booking not found');
        }
        const bookingData = bookingDoc.data();

        // TEMPORARY SOLUTION: Use direct checkout instead of Cloud Functions
        const paymentURL = createDirectCheckoutSession(bookingData);
        window.open(paymentURL, '_blank', 'noopener,noreferrer');
        return;

        /* CLOUD FUNCTION CODE - COMMENTED OUT UNTIL CLOUD FUNCTION DEPLOYS
        if (!stripe) initializeStripe();
        
        // Get a reference to the Cloud Function
        const createSession = firebase.functions().httpsCallable('createStripeCheckout');
        
        // Call the function with the bookingId
        const result = await createSession({ bookingId: bookingId });

        if (result.data && result.data.sessionId) {
            // Redirect to Stripe checkout
            await stripe.redirectToCheckout({ sessionId: result.data.sessionId });
        } else {
            // Handle cases where the function returns no session ID
            throw new Error('Invalid session ID received from server.');
        }
        */

    } catch (err) {
        console.error('Stripe redirect error:', err);
        let errorMessage = 'Unable to start the payment process. Please try again later.';
        if (err.code === 'not-found') {
            errorMessage = 'The payment function is not available. Please contact support.';
        } else if (err.message) {
            errorMessage = `An error occurred: ${err.message}`;
        }

        showModal({ title: 'Payment Error', message: errorMessage, confirmText: 'OK' });
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = 'Proceed to Payment';
        }
    }
}

// expose
window.redirectToStripeCheckout = redirectToStripeCheckout; 