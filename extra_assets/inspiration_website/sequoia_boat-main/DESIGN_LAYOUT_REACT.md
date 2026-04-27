# Sequoia Boat Rentals - Design Layout for React Implementation

## Overview

This document provides a complete design specification for replicating the Sequoia Boat Rentals website in React. The design follows a modern, nautical-inspired aesthetic with a focus on user experience and mobile-first responsive design.

## Design System

### Color Palette

```css
:root {
  /* Primary Colors - Naval Blue Theme */
  --primary: #0b5394; /* Deep navy blue */
  --primary-dark: #083c6c; /* Darker navy */
  --secondary: #4ecdc4; /* Teal/turquoise */
  --secondary-dark: #36b1a8; /* Darker teal */
  --accent: #ff9e43; /* Warm orange - for CTAs */

  /* Neutral Colors */
  --dark: #1e2a38; /* Rich dark blue */
  --light: #f8fafc; /* Crisp off-white */
  --white: #ffffff;
  --gray: #78909c; /* Blue-gray */

  /* Status Colors */
  --success: #4caf50; /* Green */
  --error: #f44336; /* Red */
  --section-bg: #f1f6fa; /* Light blue tint for sections */
}
```

### Typography

```css
:root {
  --font-primary: 'Montserrat', sans-serif;
  --font-secondary: 'Poppins', sans-serif;
}

/* Font Weights */
- Light: 300
- Regular: 400
- Medium: 500
- Semi-bold: 600
- Bold: 700
- Extra-bold: 800
```

### Spacing System

```css
:root {
  --space-xs: 0.2rem; /* 3.2px */
  --space-sm: 0.4rem; /* 6.4px */
  --space-md: 0.8rem; /* 12.8px */
  --space-lg: 1.6rem; /* 25.6px */
  --space-xl: 3rem; /* 48px */
  --space-xxl: 5rem; /* 80px */
}
```

### Border Radius

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

### Shadows

```css
:root {
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

### Animations

```css
:root {
  --transition-fast: 0.2s ease;
  --transition-medium: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

## Component Structure

### 1. Header Component

**File: `components/Header.js`**

**HTML Structure:**

```jsx
<header className="header">
  <div className="main-header">
    <div className="container">
      <a href="/" className="logo">
        <img src="/images/logo_transparent.png" alt="Sequoia logo" />
        <div className="logo-text">
          <span className="logo-name">Sequoia</span>
          <span className="logo-tagline">Boat Rentals</span>
        </div>
      </a>
      <nav className="main-nav">
        <ul>
          <li>
            <a href="#hero">
              <i className="fas fa-home"></i> Home
            </a>
          </li>
          <li>
            <a href="#services">
              <i className="fas fa-concierge-bell"></i> Our Services
            </a>
          </li>
          <li>
            <a href="#lakes">
              <i className="fas fa-water"></i> Lakes
            </a>
          </li>
          <li>
            <a href="#booking">
              <i className="fas fa-calendar-check"></i> Quick Book
            </a>
          </li>
          <li>
            <a href="#about">
              <i className="fas fa-info-circle"></i> About Us
            </a>
          </li>
          <li>
            <a href="#contact">
              <i className="fas fa-envelope"></i> Contact
            </a>
          </li>
        </ul>
      </nav>
      <button className="mobile-nav-toggle" aria-label="Toggle Navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</header>
```

**CSS for Header:**

```css
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
  transition: background-color 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.header.scrolled .main-header {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.07);
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

.logo-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo-tagline {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--secondary);
  margin-left: 0;
}

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

.mobile-nav-toggle.open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.mobile-nav-toggle.open span:nth-child(2) {
  opacity: 0;
}

.mobile-nav-toggle.open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Responsive */
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
    display: none;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
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
  }
}
```

### 2. Hero Component

**File: `components/Hero.js`**

**HTML Structure:**

```jsx
<div className="hero video-background">
  <video
    autoPlay
    muted
    loop
    playsInline
    poster="/images/people_riding_boats_lakes.png"
  >
    <source src="/videos/lake-video-background.mp4" type="video/mp4" />
  </video>

  <div className="video-overlay"></div>

  <div className="hero-content container">
    <div className="hero-text fade-in">
      <span className="hero-tagline">A Variety of Charters for Everyone</span>
      <h1>Inspirational Routes</h1>
      <p className="hero-subtitle">
        Discover the pristine waters surrounding Kamloops with our eco-friendly
        inflatable boats. Each lake offers a unique experience!
      </p>
      <div className="hero-cta">
        <a href="#booking" className="btn slide-up delay-1">
          Book Your Adventure
        </a>
      </div>
    </div>
  </div>

  <div className="hero-navigation">
    <button className="nav-arrow prev" aria-label="Previous slide">
      <i className="fas fa-chevron-left"></i>
    </button>
    <button className="nav-arrow next" aria-label="Next slide">
      <i className="fas fa-chevron-right"></i>
    </button>
  </div>

  <div className="wave-divider">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,64 C288,100 960,0 1440,80 L1440,120 L0,120 Z"
        fill="#ffffff"
      ></path>
    </svg>
  </div>
</div>
```

**CSS for Hero:**

```css
.hero {
  height: 100vh;
  min-height: 600px;
  position: relative;
  color: var(--white);
  display: flex;
  align-items: flex-end;
  margin-bottom: 0;
  padding-top: 80px;
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
  padding-bottom: 10%;
}

.hero-text {
  text-align: center;
  max-width: 650px;
  background-color: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
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
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  font-weight: 1000;
}

.hero-cta .btn:hover {
  background: linear-gradient(
    135deg,
    var(--primary-dark) 0%,
    var(--primary) 100%
  );
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

/* Responsive */
@media (min-width: 576px) {
  .hero h1 {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}

@media (min-width: 768px) {
  .hero h1 {
    font-size: 3.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-cta .btn {
    font-size: 1rem;
    padding: 1rem 2rem;
  }
}

@media (min-width: 992px) {
  .hero h1 {
    font-size: 4rem;
  }

  .hero-subtitle {
    font-size: 1.3rem;
  }
}

@media (max-width: 767px) {
  .video-background {
    height: 100vh;
    min-height: 500px;
  }

  .video-background video {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .hero-content {
    padding-bottom: 15%;
  }

  .hero-text {
    padding: 1.5rem;
  }

  .hero-navigation {
    display: none;
  }
}
```

### 3. Services Component

**File: `components/Services.js`**

**HTML Structure:**

```jsx
<div
  className="services section-padding"
  style={{ backgroundColor: "#f8f9fa" }}
>
  <div className="container">
    <h2 className="section-heading text-center">Our Services</h2>
    <p className="section-subtitle text-center">
      From boat rentals to concierge services, we provide everything you need
      for your lake adventure.
    </p>

    <div className="services-slider-tabs">
      <button
        className="service-tab-button active"
        data-tab="boat-rentals-slider"
      >
        <i className="fas fa-ship"></i> Boat Rentals
      </button>
      <button className="service-tab-button" data-tab="concierge-slider">
        <i className="fas fa-concierge-bell"></i> Concierge
      </button>
      <button className="service-tab-button" data-tab="add-ons-slider">
        <i className="fas fa-plus-circle"></i> Add-ons
      </button>
    </div>

    <div className="service-sliders-container">
      {/* Boat Rentals Slider */}
      <div id="boat-rentals-slider" className="service-slider-wrapper active">
        <div className="swiper">
          <div className="swiper-wrapper">{/* Slide content */}</div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </div>

      {/* Concierge Slider */}
      <div id="concierge-slider" className="service-slider-wrapper">
        {/* Similar structure */}
      </div>

      {/* Add-ons Slider */}
      <div id="add-ons-slider" className="service-slider-wrapper">
        {/* Similar structure */}
      </div>
    </div>
  </div>
</div>
```

**CSS for Services:**

```css
.services-slider-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.service-tab-button {
  background: var(--white);
  border: 2px solid var(--primary);
  color: var(--primary);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-medium);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.service-tab-button:hover,
.service-tab-button.active {
  background: var(--primary);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.service-slider-wrapper {
  display: none;
}

.service-slider-wrapper.active {
  display: block;
}

.service-slide-content {
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.service-image {
  height: 200px;
  overflow: hidden;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-medium);
}

.service-slide-content:hover .service-image img {
  transform: scale(1.05);
}

.service-text-wrapper {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.service-text-wrapper h4 {
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.service-text-wrapper p {
  color: var(--gray);
  margin-bottom: 1rem;
  flex: 1;
}

.price {
  color: var(--accent);
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: auto;
}

.service-benefits {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.service-benefits li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--gray);
}

.service-benefits i {
  color: var(--success);
  font-size: 0.9rem;
}

.pricing-content-wrapper {
  padding: 2rem;
  text-align: center;
}

.pricing-table {
  background: var(--section-bg);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin: 1.5rem 0;
}

.pricing-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.pricing-row:last-child {
  border-bottom: none;
}

.pricing-header {
  background: var(--primary);
  color: var(--white);
  font-weight: 600;
}

.pricing-row.highlight {
  background: rgba(78, 205, 196, 0.1);
  border-left: 4px solid var(--secondary);
}

.savings-badge {
  background: var(--accent);
  color: var(--white);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  margin-left: 0.5rem;
}

/* Swiper Customization */
.swiper {
  padding: 2rem 0;
}

.swiper-slide {
  height: auto;
}

.swiper-pagination-bullet {
  background: var(--primary);
  opacity: 0.3;
}

.swiper-pagination-bullet-active {
  opacity: 1;
}

.swiper-button-prev,
.swiper-button-next {
  color: var(--primary);
  background: var(--white);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background: var(--primary);
  color: var(--white);
}

/* Responsive */
@media (max-width: 768px) {
  .services-slider-tabs {
    flex-direction: column;
    align-items: center;
  }

  .service-tab-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .pricing-row {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.5rem;
  }

  .pricing-header {
    display: none;
  }
}
```

## Global CSS Utilities

### Container

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
  position: relative;
  z-index: 2;
}
```

### Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: all var(--transition-medium);
  position: relative;
  overflow: hidden;
  z-index: 1;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background-color: var(--primary);
  border-color: var(--primary);
  color: var(--white);
}

.btn-primary:hover,
.btn-primary:focus {
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
  color: var(--white);
}

.btn-accent {
  background-color: var(--accent);
  border-color: var(--accent);
  color: var(--white);
}

.btn-accent:hover,
.btn-accent:focus {
  background-color: #e6892a;
  border-color: #e6892a;
  color: var(--white);
}

.btn-outline {
  background-color: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
  position: relative;
  z-index: 1;
}

.btn-outline::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: var(--primary);
  transition: all 0.3s;
  z-index: -1;
}

.btn-outline:hover::before {
  width: 100%;
}

.btn-outline:hover,
.btn-outline:focus {
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-lg {
  padding: 0.9rem 2rem;
  font-size: 1rem;
}

.btn-block {
  display: block;
  width: 100%;
}
```

### Typography

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-secondary);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-md);
  color: var(--dark);
}

h1 {
  font-size: 2.2rem;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 1.8rem;
  letter-spacing: -0.01em;
}

h3 {
  font-size: 1.4rem;
}

h4 {
  font-size: 1.15rem;
}

p {
  margin-bottom: var(--space-md);
  color: #546e7a;
  font-size: 0.95rem;
}

@media (min-width: 768px) {
  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2.2rem;
  }

  h3 {
    font-size: 1.7rem;
  }

  h4 {
    font-size: 1.3rem;
  }
}

.section-heading {
  position: relative;
  padding-bottom: var(--space-sm);
  margin-bottom: var(--space-lg);
  font-weight: 800;
  font-size: 1.8rem;
}

.section-heading:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 4px;
  background-color: var(--secondary);
  border-radius: var(--radius-full);
}

.section-heading.text-center:after {
  left: 50%;
  transform: translateX(-50%);
}

.section-subtitle {
  font-size: 1rem;
  color: var(--gray);
  max-width: 800px;
  margin: -1rem auto var(--space-lg);
  line-height: 1.7;
}

@media (min-width: 768px) {
  .section-subtitle {
    font-size: 1.05rem;
  }
}
```

### Spacing Utilities

```css
.mb-1 {
  margin-bottom: var(--space-xs);
}
.mb-2 {
  margin-bottom: var(--space-sm);
}
.mb-3 {
  margin-bottom: var(--space-md);
}
.mb-4 {
  margin-bottom: var(--space-lg);
}
.mb-5 {
  margin-bottom: var(--space-xl);
}

.mt-1 {
  margin-top: var(--space-xs);
}
.mt-2 {
  margin-top: var(--space-sm);
}
.mt-3 {
  margin-top: var(--space-md);
}
.mt-4 {
  margin-top: var(--space-lg);
}
.mt-5 {
  margin-top: var(--space-xl);
}

.pb-1 {
  padding-bottom: var(--space-xs);
}
.pb-2 {
  padding-bottom: var(--space-sm);
}
.pb-3 {
  padding-bottom: var(--space-md);
}
.pb-4 {
  padding-bottom: var(--space-lg);
}
.pb-5 {
  padding-bottom: var(--space-xl);
}

.pt-1 {
  padding-top: var(--space-xs);
}
.pt-2 {
  padding-top: var(--space-sm);
}
.pt-3 {
  padding-top: var(--space-md);
}
.pt-4 {
  padding-top: var(--space-lg);
}
.pt-5 {
  padding-top: var(--space-xl);
}
```

### Text Utilities

```css
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.text-primary {
  color: var(--primary);
}
.text-secondary {
  color: var(--secondary);
}
.text-accent {
  color: var(--accent);
}
.text-white {
  color: var(--white);
}
```

### Background Utilities

```css
.bg-light {
  background-color: var(--section-bg);
}
.bg-white {
  background-color: var(--white);
}
.bg-primary {
  background-color: var(--primary);
  color: var(--white);
}
```

### Animations

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
}

.fade-in.animated {
  animation: fadeIn 0.6s ease forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up.animated {
  animation: slideUp 0.8s ease forwards;
}

.delay-1 {
  animation-delay: 0.1s;
}
.delay-2 {
  animation-delay: 0.2s;
}
.delay-3 {
  animation-delay: 0.3s;
}
.delay-4 {
  animation-delay: 0.4s;
}
```

## Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
/* Base styles for mobile (up to 767px) */

/* Tablet (768px and up) */
@media (min-width: 768px) {
  /* Tablet styles */
}

/* Desktop (992px and up) */
@media (min-width: 992px) {
  /* Desktop styles */
}

/* Large Desktop (1200px and up) */
@media (min-width: 1200px) {
  /* Large desktop styles */
}
```

### Mobile Optimizations

```css
@media (max-width: 576px) {
  html,
  body {
    font-size: 14px;
    line-height: 1.5;
  }

  .container {
    padding: 0 var(--space-sm);
  }

  .card-body {
    padding: 1rem;
  }

  .btn {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
  }

  .section-padding {
    padding: var(--space-lg) 0;
  }

  .section-heading {
    font-size: 1.5rem;
  }

  .section-subtitle {
    font-size: 0.9rem;
  }
}
```

## Required Dependencies

### Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Icons

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>
```

### Swiper (for sliders)

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

## Implementation Notes

1. **Mobile-First**: All styles are written mobile-first with progressive enhancement
2. **CSS Custom Properties**: Use CSS variables for consistent theming
3. **Smooth Animations**: All interactions use smooth transitions
4. **Accessibility**: Proper ARIA labels and keyboard navigation
5. **Performance**: Optimized images and lazy loading for better performance
6. **Cross-Browser**: Tested across modern browsers with fallbacks

## File Structure for React

```
src/
├── components/
│   ├── Header.js
│   ├── Hero.js
│   ├── Services.js
│   ├── Lakes.js
│   ├── BookingPreview.js
│   ├── About.js
│   ├── Features.js
│   └── Footer.js
├── styles/
│   ├── globals.css
│   ├── components/
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── services.css
│   │   └── ...
│   └── utilities.css
├── assets/
│   ├── images/
│   └── videos/
└── App.js
```

This design system provides a complete foundation for replicating the Sequoia Boat Rentals website in React while maintaining the modern, nautical aesthetic and excellent user experience.
