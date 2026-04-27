# Sequoia Boat Rentals Website

A modern, responsive website for Sequoia Boat Rentals & Concierge Services, built with HTML, CSS, and JavaScript using web components.

## Project Structure

```
sequoia-boat-rentals/
├── components/        # Web components
│   ├── header.js      # Site header with navigation
│   ├── footer.js      # Site footer
│   ├── hero.js        # Hero section component
│   ├── about.js       # About us section
│   ├── features.js    # Why Choose Us section
│   ├── booking-form.js # Booking form component
│   └── lake-card.js   # Lake card component
├── css/
│   └── style.css      # Main stylesheet
├── images/            # Image assets
│   └── README.md      # Image requirements
├── js/
│   └── main.js        # Main JavaScript file
├── index.html         # Homepage
├── services.html      # Services page
├── lakes.html         # Lakes/Locations page
├── booking.html       # Booking page
├── contact.html       # Contact page
└── README.md          # This file
```

## Features

- Responsive design that works on all devices
- Modular web components for easy maintenance
- Interactive booking form
- Detailed lake information with modal popups
- Mobile-friendly navigation

## Environment Setup

This project uses environment variables for sensitive information like API keys. To set up your environment:

1. Create a `.env` file in the root directory (do not commit this file)
2. Add your API keys in the following format:

```
# Stripe API Keys
STRIPE_PUBLIC_KEY=pk_test_your_public_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

3. For Firebase Cloud Functions, use the Firebase CLI to set environment variables:

```bash
firebase functions:config:set stripe.secret_key="sk_test_your_secret_key_here"
firebase functions:config:set app.base_url="https://your-app-url.com"
```

## Security Notes

- Never commit API keys or secrets to the repository
- Use environment variables for all sensitive information
- For production, ensure you're using proper key management systems

## Local Development

To start the development server:

```bash
npm start
```

## Deployment

To deploy to Firebase:

```bash
firebase deploy
```
