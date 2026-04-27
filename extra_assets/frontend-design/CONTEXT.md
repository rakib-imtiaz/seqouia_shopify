# Sequoia Boat Rentals & Concierge Services — Landing Page Brief

> **What this document is:** A content/structure brief for building the landing page. It contains brand facts, copy, section structure, and asset bindings only. It deliberately contains **NO** instructions about colors, fonts, layout, animation, tone, or any visual design decisions — those are entirely up to the build skill.

---

## 1. Business Facts

- **Business name:** Sequoia Boat Rentals & Concierge Services
- **Domain:** sequoiaservices.ca
- **Phone:** (250) 555-7890
- **Location/HQ:** Kamloops, British Columbia, Canada
- **What they do:** Rent eco-friendly **electric inflatable boats** for use on lakes around the Kamloops region. Offer **concierge add-ons** (licensed driver, license assistance, tours, picnics, photography). Offer **free delivery** to popular nearby lakes; paid delivery elsewhere ($50 per 100km from Kamloops, or anywhere in BC for a fee).
- **Operates a separate business arm:** Premium vehicle rental via Turo (a 2021 Mazda CX-5).
- **Audience:** Tourists visiting Kamloops / Sun Peaks; local families, couples, and small groups; weekend leisure renters; anglers; remote workers wanting a quiet day on the water.

## 2. Page Sections (in order)

The landing page must include these sections. Section *names* and *content* are mandatory. *Visual treatment* is not specified.

1. **Header / nav**
2. **Hero**
3. **Why Choose Us / Features**
4. **Our Services** (Boat Rentals / Concierge / Add-ons — three groupings)
5. **Lakes We Service** (six lakes)
6. **Quick Booking** (form preview)
7. **Turo Partnership**
8. **About Us**
9. **Footer**

---

## 3. Section Content

### 3.1 Header / nav
- **Logo:** display the Sequoia logo (asset: `images/logo_transparent_2.png` — transparent PNG, works on light or dark backgrounds; alternates available: `logo_transparent.png`, `logo_transparent_3.png`).
- **Nav items:** Home, Services, Lakes, Booking, About, Contact
- **Primary action:** "Book Your Adventure" → anchors to the Quick Booking section
- **Phone displayed in header:** (250) 555-7890

### 3.2 Hero
- **Tagline (small kicker):** "A Variety of Charters for Everyone"
- **Headline:** "Inspirational Routes"
- **Subhead:** "Discover the pristine waters surrounding Kamloops with our eco-friendly inflatable boats. Each lake offers a unique experience."
- **Primary CTA:** "Book Your Adventure" → Quick Booking section
- **Background media (in priority order):**
  1. Video: `videos/lake-video-background.mp4` (alternates: `videos/lake-video-background_1.mp4`, `videos/lake-video-background_2.mp4`)
  2. Poster / fallback image: `images/people_riding_boats_lakes.png`
  3. Secondary fallback: `images/aesthetic_sunset_lake_boat.jpeg`
- **Optional rotating message:** "In partnership with Turo" — show `images/turo-logo.png` after the main hero copy if a rotator is built.

### 3.3 Why Choose Us / Features (six items)

| # | Title | Body copy |
|---|-------|-----------|
| 1 | **Eco-friendly Electric Boats** | Our fleet of electric boats offers a quiet, clean, and eco-friendly experience on the water. Enjoy the sounds of nature without noise or emissions. |
| 2 | **Boating License Assistance** | Need a boating license? No problem. We provide assistance in obtaining a temporary license, or offer professional driver services for your convenience. |
| 3 | **Concierge Services** | Enhance your experience with our premium concierge services. From trip planning to on-board catering options, we've got you covered. |
| 4 | **Free Delivery to Lakes** | We deliver our boats to your chosen lake at no extra charge for popular locations around Kamloops, making your adventure hassle-free. |
| 5 | **Safety Equipment Included** | Safety first. All rentals come with premium life jackets in various sizes and backup paddles, ensuring a safe and enjoyable experience. |
| 6 | **Easy Online Booking** | Our simple booking system lets you reserve your boat in minutes. Choose your lake, date, and duration with just a few clicks. |

- **Section-end CTA:** "Book Your Adventure" → Quick Booking
- No image bindings required for this section (icon glyphs OK; the build skill chooses how to represent each item).

### 3.4 Our Services

Three groupings. Display together in any pattern that preserves grouping.

#### A. Boat Rentals
- **Headline:** "Electric, Eco-friendly Inflatable Boats"
- **Description:** "Our premium electric boats provide a quiet, peaceful experience that lets you connect with nature without disturbing it."
- **Features (bullets):**
  - Quiet, zero-emission electric motors
  - Comfortable seating for 2–4 people
  - Easy to operate, no experience needed
  - 6+ hours of battery life
  - Safety equipment included (life jackets, etc.)
- **Pricing table:**

| Duration | Weekday | Weekend |
|----------|---------|---------|
| 2 Hours (minimum) | $70/hr | $80/hr |
| 4 Hours | $60/hr (save $10/hr) | $70/hr (save $10/hr) |
| 6 Hours | $50/hr (save $10/hr) | $60/hr (save $10/hr) |
| Full Day (8 Hours) | $45/hr | $55/hr |

  - Note under table: "All rentals include life jackets & paddles."
  - Tip: "Book longer durations for better hourly rates."

- **Rental policies (bullets):**
  - Must be 18+ with valid ID to rent
  - Boating license required (temporary licenses can be obtained — we assist)
  - Security deposit required at pickup
  - Free delivery to popular lakes
  - Rentals include basic safety training
- **Asset bindings:**
  - Main boat photo: `images/our_services/boat_rentals/ecoboat.jpg`
  - Policies illustration: `images/our_services/boat_rentals/rental_policies_Section.jpg`
  - Optional pricing graphic (if needed): `images/our_services/boat_rentals/pricing_info.png`
  - Hero/electric-motor close-up alternate: `images/electric_inflatable_boat.png`

#### B. Concierge Services
Four items. Each has a title, short description, starting price, and image.

| Title | Description | Price | Image |
|-------|-------------|-------|-------|
| Guided Tours | Experience the lakes with a knowledgeable local guide. Perfect for discovering hidden spots. | From $120 | `images/our_services/concierge/guided_tour_1.png` (alt: `guided_tour_2.jpg`) |
| Professional Driver | Don't have a boating license? Hire one of our licensed drivers to operate the boat for you. | From $150 ($25/hr add-on rate also available) | `images/our_services/concierge/professional_driver_1.jpg` (alt: `professional_driver_2.png`) |
| Lakeside Picnic Setup | We'll arrange a beautiful lakeside picnic with local foods and refreshments. | From $80 | `images/our_services/concierge/picnic_setup_section.jpg` |
| Photography Package | Capture your adventure with a professional photographer for edited digital photos. | From $200 | `images/our_services/concierge/photography_package_section_1.jpg` (alt: `photography_package_section_2.jpg`) |

Also offered (text only): **Boating License Assistance** — for customers without a license, we help obtain a temporary one.
**Delivery:** Free to popular lakes. Beyond the free zone: $50 per 100 km from Kamloops, or anywhere in BC for a fee.

#### C. Add-ons
Six items. Each has a title, short description, day rate, and image.

| Title | Description | Price | Image |
|-------|-------------|-------|-------|
| Cooler Rental | Keep your drinks and snacks cold all day. | $30/day | `images/our_services/add_ons/cooler_rental.jpg` |
| JBL Flip-6 Speaker | Waterproof Bluetooth speaker for your soundtrack. | $20/day | `images/our_services/add_ons/jbl_6.png` |
| Dry Bags | Keep your valuable belongings safe and dry. | $10/day | `images/our_services/add_ons/dry_bag.png` |
| GoPro Camera | Capture your adventure with a waterproof GoPro. | $40/day | `images/our_services/add_ons/go_pro.jpg` (alt: `go_pro_2.png`) |
| Fishing Gear | Basic fishing rods and tackle box for casual fishing. | $25/day | `images/our_services/add_ons/fishing_kit.jpg` |
| Beach Essentials Kit | Umbrella, towels, and chairs for lakeside comfort. | $35/day | `images/our_services/add_ons/beach_essential_kits.jpg` |

### 3.5 Lakes We Service (six lakes)

Each lake has: name, distance from Kamloops, full description (use verbatim), and at least one image.

A region map exists: `images/Map of Kamloops area lakes.png` — appropriate to use as a section visual or alongside the lake list.

| # | Lake | Distance / Note | Description |
|---|------|----------------|-------------|
| 1 | **Heffley Lake** | Closest to Sun Peaks (~20 min from Sun Peaks) | Nestled just 20 minutes from the heart of Sun Peaks, Heffley Lake is a serene escape that feels like a local secret. With its calm, glassy waters and picture-perfect mountain backdrop, it's the ideal spot to kick back, paddle out, and soak up the sunshine. Locals love it for early morning fishing or lazy afternoon floats — some even say the loons will sing you a song if you're quiet enough. The lake offers easy public access and a boat launch, making it perfect for a hassle-free inflatable boat adventure. Whether you're cruising with friends, snapping wildlife photos, or just drifting with a good playlist, Heffley Lake is where peaceful vibes meet unforgettable summer memories. |
| 2 | **Paul Lake** | 25 min from Kamloops | Just 25 minutes from Kamloops, Paul Lake is a clean, scenic haven that's become a go-to summer spot for locals and visitors alike. Tucked within a peaceful Provincial Park, it offers everything you need for a perfect paddle day — campgrounds, a spacious day-use area, and a convenient boat launch with plenty of parking. Families love to set up camp early, cast a line, and spend the afternoon floating across the calm waters. Some say if you look up at the towering cliffs, you might spot a curious bighorn sheep watching your boat glide by. Whether you're planning a family outing or a quiet solo cruise, Paul Lake brings that sweet mix of adventure and relaxation. |
| 3 | **Monte Lake** | Between Kamloops and Vernon | Monte Lake is a hidden gem nestled between Kamloops and Vernon, offering the perfect spot for a peaceful day on the water. Whether you're a local or visiting, it's a place where the stress of everyday life just melts away. The warm waters in summer make it the perfect place to cool off, and you won't find the crowds of more popular spots — just you, the lake, and the stunning scenery. It's the kind of place where you can float along and let your worries drift away with the current. Locals often say it's the best-kept secret in the area, and we couldn't agree more. |
| 4 | **Shuswap Lake** | 45–60 min from Kamloops (a bit farther but worth it) | Shuswap Lake is just a short 45–60-minute drive from Kamloops, but once you arrive, you'll quickly realize it's totally worth the drive. With its massive, winding waters and endless coves, this lake is perfect for full-day adventures or group rentals — whether you're cruising the shoreline, splashing around, or just soaking in the breathtaking views. As the locals say, "If you can't find the perfect spot on Shuswap, you're not looking hard enough." Shuswap isn't just a lake; it's an adventure waiting to happen. |
| 5 | **Kamloops Lake** | Closest large lake to the city | Kamloops Lake is the closest large lake to the city, and it's the perfect spot for a relaxing day out on the water. This expansive, open lake offers stunning views of the surrounding mountains and rolling hills, making it an ideal place to unwind — especially on those calm, sunny days. The smooth waters are perfect for a peaceful paddle or a leisurely ride, but the lake is big enough to explore at your own pace. Local anglers swear by the lake's abundant trout population, and there's a fun little tradition: every year, the locals gather for an impromptu "Kamloops Lake Fishing Challenge." |
| 6 | **Lac Le Jeune** | 30–35 min from Kamloops | Just a short 30–35 minute drive from Kamloops, Lac Le Jeune is the perfect getaway for those looking for a peaceful, more intimate experience on the water. This smaller, serene lake is surrounded by a campground and park, making it an ideal spot for a relaxing half-day rental. Whether you're out for a quiet paddle or simply soaking up the tranquility, Lac Le Jeune is all about slowing down and enjoying the moment. Locals often joke that it's the "best-kept secret for a peaceful escape." |

**Image bindings per lake (use the `*compress*` versions — they're optimized):**

- Heffley → `images/lakes/Haffley_lakes/Heffley_Lake_compress1.png`, `Heffley_Lake_compress2.png`, `Heffley_Lake_compress3.png`
- Paul → `images/lakes/Paul_lake/paul_Lake_compress_1.png`, `paul_Lake_compress_2.jpg`
- Monte → `images/lakes/Monte_lake/Monte_lake_Lake_compress_1.png`, `Monte_lake_Lake_compress_2.png`
- Shuswap → `images/lakes/Shuswap_lake/shuswap_Lake_compress_1.png`, `shuswap_Lake_compress_2.png`
- Kamloops → `images/lakes/Kamploop_lake/Kamloops_Lake_compress_1.jpg` … `Kamloops_Lake_compress_6.png` (6 available)
- Lac Le Jeune → `images/lakes/Lac_Le_Jeune_lake/Lac_Le_Jeune_Lake_compress_1.jpg` … `Lac_Le_Jeune_Lake_compress_6.png` (6 available)
- Sun Peaks region (optional decorative — Heffley is closest to it) → `images/lakes/Sunpkeas_lake/sunpkeas_Lake_compress_1.png` … `sunpkeas_Lake_compress_4.png`

**Use at least one image per lake.** Multiple images per lake are available for grids/galleries/sliders if appropriate.

### 3.6 Quick Booking (form preview)

Form fields (in this order):

1. **Package selection** (3 preset packages, plus a "custom" option)
   - **Adventure Lite** — Heffley • Single Boat • 2 hrs — **$140**
   - **Family Fun** — Paul • Family Boat • 4 hrs + Cooler — **$280**
   - **Full-Day Explorer** — Shuswap • Family Boat • 6 hrs + All add-ons — **$420**
2. **Choose a Lake** — dropdown of all 6 lakes
3. **Boat Type** — Single Boat (1–2 people) / Family Boat (3–4 people)
4. **Rental Duration** — 2 / 4 / 6 / 8 hours
5. **Add-ons** (multi-select) — cooler, speaker, dry bags, GoPro, fishing gear, beach kit
6. **Date / Time** picker
7. **Submit:** "Check Availability"

Trust copy near form (use any/all):
- "Instant confirmation"
- "Free cancellation"
- "Safety gear included"
- "No hidden fees"

Promotional badge (currently active): **"FREE ADD-ONS — Limited Time Offer"**

### 3.7 Turo Partnership

- **Heading:** "Our Partnership with Turo"
- **Subhead:** "Explore Beyond the Lakes with Premium Vehicle Rentals"
- **Logo asset:** `images/turo-logo.png`
- **Featured vehicle:** "2021 Mazda CX-5" — image: `images/maz.png`
- **Benefits (4):**
  - **Convenience** — Skip the rental counter; use the app for pickup and return.
  - **Add Additional Drivers** — Free, perfect for sharing driving duties.
  - **30-Minute Return Grace Period** — No need to extend unless more than 30 minutes late.
  - **Peace of Mind** — 24/7 customer support and basic roadside assistance included.
- **CTA:** "Book Our Mazda CX-5 on Turo" → `https://turo.com/ca/en/suv-rental/canada/kamloops-bc/mazda/cx-5/3271945` (target=_blank)
- **Footnote:** "All inclusive pricing with no hidden fees."

### 3.8 About Us

- **Heading:** "About Us"
- **Subheading:** "Your Gateway to Kamloops Lake Adventures"
- **Body:** "At Sequoia Boat Rentals, we offer electric, eco-friendly inflatable boats to explore the pristine waters around Kamloops. From Heffley Lake to Shuswap, we make your lake adventure unforgettable."
- **Five trust pillars (small cards or list):**
  - **Eco-Friendly** — Quiet, eco-friendly electric boats.
  - **Safety First** — Premium life jackets included.
  - **Local Expertise** — Local guides know all the best spots.
  - **Concierge Services** — Custom trip planning & catering available.
  - **Free Delivery** — Free delivery to all popular local lakes.
- **Optional background image:** `images/about_us_bg.png`
- **Optional people/atmosphere image:** `images/happy_customer.jpg`

### 3.9 Footer

- **Logo:** `images/logo_transparent_2.png` (transparent — works on either light or dark)
- **Tagline:** "Eco-friendly inflatable boat rentals on Kamloops' most beautiful lakes."
- **Link columns:**
  - **Explore:** Home, Services, Lakes, Booking, About
  - **Lakes:** Heffley, Paul, Monte, Shuswap, Kamloops, Lac Le Jeune
  - **Company:** About, Contact, Terms & Conditions, Privacy Policy
- **Contact block:**
  - Kamloops, BC, Canada
  - (250) 555-7890
  - sequoiaservices.ca
- **Social icons:** Facebook, Instagram, Twitter (links can be `#`)
- **Bottom copyright:** "© 2026 Sequoia Boat Rentals & Concierge Services. All rights reserved."

---

## 4. Asset Inventory (full)

All assets sit under `public/assets/` (which is a symlink to a shared folder containing the original `images/` and `videos/` directories from the source project). Use relative paths from the React app, e.g. `/assets/images/turo-logo.png`.

### Logos / branding
- `images/logo_transparent.png`, `logo_transparent_2.png`, `logo_transparent_3.png` — three logo variants (all PNG with transparency)
- `images/favicon.png`, `favicon_2.png`, `favicon_3.png` — favicon variants

### Hero / generic boat imagery
- `images/people_riding_boats_lakes.png` — group on boats (good for hero/about)
- `images/aesthetic_sunset_lake_boat.jpeg` — sunset boat on lake (hero alternate)
- `images/electric_inflatable_boat.png` — product shot of the electric inflatable boat
- `images/about_us_bg.png` — background-suitable about image
- `images/our_service_bg.jpg` — services background image
- `images/photography.jpg` — photography service / lifestyle shot
- `images/happy_customer.jpg` — customer experience shot

### Hero video options
- `videos/lake-video-background.mp4` (primary)
- `videos/lake-video-background_1.mp4`
- `videos/lake-video-background_2.mp4`

### Maps
- `images/Map of Kamloops area lakes.png` — region map showing the 6 lakes
- `images/delivery_zone_map.png` — delivery zone map

### Lakes
*(All under `images/lakes/<lake_folder>/`. Compressed variants are optimized and preferred.)*
- **Heffley** (folder: `Haffley_lakes/`): `Heffley_Lake_1.png`, `_2.png`, `_3.png`, plus compressed `Heffley_Lake_compress1.png`, `compress2.png`, `compress3.png`
- **Paul** (folder: `Paul_lake/`): `paul_lake_1.png`, `paul_lake_2.jpg`, plus compressed `paul_Lake_compress_1.png`, `compress_2.jpg`
- **Monte** (folder: `Monte_lake/`): `Monte_lake_1.png`, `_2.png`, plus compressed `_compress_1.png`, `_compress_2.png`
- **Shuswap** (folder: `Shuswap_lake/`): `shuswap_Lake_1.png`, `_5.png`, plus compressed `_compress_1.png`, `_compress_2.png`
- **Kamloops** (folder: `Kamploop_lake/`): 6 photos `Kamloops_Lake_1.jpg` – `_5.jpg`, `_6.png`, plus 6 compressed variants
- **Lac Le Jeune** (folder: `Lac_Le_Jeune_lake/`): 6 photos, plus 6 compressed variants
- **Sun Peaks region** (folder: `Sunpkeas_lake/`): 4 photos plus 4 compressed variants — use as Heffley/regional secondary imagery if needed

### Services
- **Boat rentals** (`images/our_services/boat_rentals/`): `ecoboat.jpg`, `rental_policies_Section.jpg`, `pricing_info.png`
- **Concierge** (`images/our_services/concierge/`): `guided_tour_1.png`, `guided_tour_2.jpg`, `professional_driver_1.jpg`, `professional_driver_2.png`, `picnic_setup_section.jpg`, `photography_package_section_1.jpg`, `photography_package_section_2.jpg`
- **Add-ons** (`images/our_services/add_ons/`): `cooler_rental.jpg`, `jbl_6.png`, `dry_bag.png`, `go_pro.jpg`, `go_pro_2.png`, `fishing_kit.jpg`, `beach_essential_kits.jpg`

### Turo
- `images/turo-logo.png`
- `images/maz.png` (the 2021 Mazda CX-5)

---

## 5. Tech Constraint

- **Stack:** React (via Vite). Tailwind CSS allowed and encouraged for utility styling.
- **Output:** A working React landing page at the project root that builds with `npm run build`.
- **Routing:** Single page (anchor links between sections). Multi-page is acceptable but not required.
- **Assets:** Reference from `public/assets/` (already symlinked into your project's `public/` folder before you start).

---

## 6. Hard Rules

- **Use the copy verbatim** wherever copy is given above. Do not rewrite descriptions, lake stories, or feature lines unless trimming for length-fit (and only if needed).
- **Use the bound images** for the listed sections. Do not invent placeholder images, do not use external image URLs, and do not skip image-bound sections by removing the image.
- **Preserve all six lakes**, all four concierge items, all six add-ons, all six "why choose us" features, and the full pricing table. These are non-negotiable content.
- **Phone, address, and Turo URL** must appear correctly in the footer (and Turo CTA respectively).
- **Build must succeed** (`npm run build` exits 0).

Everything not specified above — color palette, typography, layout, motion, spacing, theme (light/dark), section ordering style, decorative treatments — is the design skill's domain. Do not consult outside design references; trust the skill loaded for this build.
