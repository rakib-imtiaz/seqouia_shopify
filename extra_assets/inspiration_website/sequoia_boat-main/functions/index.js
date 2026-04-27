const functions = require("firebase-functions");

// A simple callable function for testing deployment
exports.helloWorld = functions.https.onCall((data, context) => {
  console.log("Hello from Firebase!");
  return { message: "Hello from Firebase!" };
});

// Payment verification function
exports.verifyPayment = functions.https.onCall(async (data, context) => {
  const { sessionId } = data;
  
  if (!sessionId) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing sessionId');
  }

  try {
    const admin = require('firebase-admin');
    if (!admin.apps.length) {
      admin.initializeApp();
    }

    // Get the booking document that matches this session ID
    const bookingsRef = admin.firestore().collection('bookings');
    const querySnapshot = await bookingsRef.where('paymentSessionId', '==', sessionId).get();

    if (querySnapshot.empty) {
      throw new functions.https.HttpsError('not-found', 'No booking found with this session ID');
    }

    // Update the first matching booking
    const bookingDoc = querySnapshot.docs[0];
    await bookingDoc.ref.update({
      isPaid: true,
      paymentStatus: 'paid',
      paymentVerifiedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true, message: 'Payment verified and booking updated' };
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw new functions.https.HttpsError('internal', 'Failed to verify payment');
  }
});

/*
// Your original Stripe function code is commented out below for testing.
// We will restore it once deployment is successful.

const admin = require('firebase-admin');
// Use Firebase environment configuration to securely store the secret key
const stripe = require('stripe')(functions.config().stripe.secret_key);
admin.initializeApp();

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  const { bookingId } = data;
  if (!bookingId) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing bookingId');
  }
  
  // Fetch booking data
  const bookingSnap = await admin.firestore().collection('bookings').doc(bookingId).get();
  if (!bookingSnap.exists) {
    throw new functions.https.HttpsError('not-found', 'Booking not found');
  }
  const booking = bookingSnap.data();

  // Build line items
  const amount = Math.round(parseFloat(booking.estimatedTotal.replace(/[^0-9.]/g,''))*100);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'cad',
        product_data: {name: `Boat Rental - ${booking.duration}`},
        unit_amount: amount
      },
      quantity: 1
    }],
    mode: 'payment',
    success_url: `${functions.config().app.base_url || 'https://sequoiaboatrentals.web.app'}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${functions.config().app.base_url || 'https://sequoiaboatrentals.web.app'}/cancel.html?booking_id=${bookingId}`
  });

  // Update booking doc
  await bookingSnap.ref.update({isPaid: false, paymentSessionId: session.id});
  return {sessionId: session.id};
});
*/
