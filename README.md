# RouteMasters Pro — Frontend Documentation

> **Truck Dispatching Services Website**
> A fully responsive, single-page application (SPA) for a professional truck dispatching company.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File Structure](#2-file-structure)
3. [Technology Stack](#3-technology-stack)
4. [Pages & Sections](#4-pages--sections)
5. [Features](#5-features)
6. [UI Components](#6-ui-components)
7. [Animations & Interactions](#7-animations--interactions)
8. [Theming (Dark / Light Mode)](#8-theming-dark--light-mode)
9. [Navigation System (SPA Router)](#9-navigation-system-spa-router)
10. [Forms](#10-forms)
11. [Legal Modals](#11-legal-modals)
12. [Color Palette & Design Tokens](#12-color-palette--design-tokens)
13. [Responsive Design](#13-responsive-design)
14. [External Dependencies](#14-external-dependencies)
15. [How to Run](#15-how-to-run)
16. [Browser Compatibility](#16-browser-compatibility)
17. [Known Limitations](#17-known-limitations)

---

## 1. Project Overview

**RouteMasters Pro** is a marketing and lead-generation website for a truck dispatching company. It serves as the company's primary digital presence, allowing truck owners and fleet operators to learn about services, view pricing, submit inquiries, and register as drivers.

The site is built as a **single HTML file** with no build tools or frameworks — only vanilla HTML, CSS, and JavaScript enhanced with Tailwind CSS (CDN) and Lucide icons.

**Business context:**
- Target audience: Owner-operators, independent truck drivers, and fleet operators
- Primary goal: Convert visitors into clients via quote requests and driver registration
- Coverage: 48 US states, 24/7 dispatch service

---

## 2. File Structure

```
routemasters_updated.html      ← Entire application (single file)
README.md                      ← This documentation
```

All HTML, CSS, and JavaScript is self-contained in one file, organized in clearly commented sections:

```
<head>
  ├── Tailwind CDN + config
  ├── Lucide icons CDN
  ├── Google Fonts (Inter)
  └── Custom CSS (animations, theme variables, component styles)

<body>
  ├── Navbar (fixed, responsive)
  ├── Mobile Menu (slide-in drawer)
  ├── #page-home        → Home page
  ├── #page-about       → About Us page
  ├── #page-services    → Services page
  ├── #page-pricing     → Pricing page
  ├── #page-contact     → Contact page
  ├── #page-driver      → Driver Registration page
  ├── Footer
  ├── Legal Modal (Privacy Policy / Terms / Disclaimer)
  └── Toast Notification

<script>
  ├── navigateTo()       → SPA page router
  ├── toggleTheme()      → Dark/light mode
  ├── Scroll reveal      → IntersectionObserver animations
  ├── Counter animation  → Animated number stats
  ├── Testimonial slider → Auto-advancing carousel
  ├── Mobile menu        → Open/close logic
  ├── Form handlers      → Contact & Driver Registration
  ├── Navbar scroll      → Background on scroll
  └── legalContent{}     → Modal data & openLegalModal()
```

---

## 3. Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Document structure |
| CSS3 | — | Custom styles, animations, variables |
| Vanilla JavaScript | ES6+ | Interactivity, SPA routing, animations |
| Tailwind CSS | CDN (latest) | Utility-first styling |
| Lucide Icons | `unpkg` (latest) | SVG icon library |
| Google Fonts — Inter | CDN | Typography |

**No build tools, no npm, no bundler required.** The entire project runs directly in the browser.

---

## 4. Pages & Sections

The site uses a custom JavaScript router to show/hide page sections without reloading. Each page is a `<div id="page-{name}" class="page-section">`.

### 🏠 Home (`#page-home`)
| Section | Description |
|---|---|
| **Hero** | Full-screen background image, headline, CTA buttons, animated truck silhouette, trust badges |
| **Stats Bar** | Overlaid on hero — Active Drivers, Loads Dispatched, On-Time Rate, Coverage |
| **Services Overview** | 6 service cards (Load Booking, Route Planning, 24/7 Support, Document Handling, Rate Negotiation, Compliance) |
| **Why RouteMasters** | Two-column layout with image, floating stat card (+32% Revenue), and 3 key value propositions |
| **Testimonials** | Auto-scrolling carousel with 6 driver testimonials and star ratings |
| **Map Section** | Decorative US coverage graphic with a call-to-action |
| **CTA Banner** | Full-width orange call-to-action section |

### 🏢 About Us (`#page-about`)
- Company story and mission
- Team member cards (Founder, Head Dispatcher, Operations Manager)
- Timeline / company milestones
- Core values grid

### ⚙️ Services (`#page-services`)
- Detailed breakdown of all dispatch services
- Expandable service detail cards
- Comparison of what RouteMasters handles vs. what the driver handles

### 💰 Pricing (`#page-pricing`)
Three subscription tiers:

| Plan | Fee | Key Features |
|---|---|---|
| **Starter** | 5% of gross load | 1 truck, basic load finding, email support |
| **Professional** *(Popular)* | 4% of gross load | Up to 3 trucks, priority loads, 24/7 phone support |
| **Fleet** | 3% of gross load | Unlimited trucks, dedicated dispatcher, custom reporting |

- Pricing FAQ accordion
- Feature comparison table

### 📬 Contact (`#page-contact`)
- Contact form (Name, Email, Phone, Equipment Type, Message)
- Company contact details (phone, email, address)
- Business hours
- Embedded map placeholder

### 🚛 Driver Registration (`#page-driver`)
- Multi-field registration form:
  - Personal information
  - CDL number & USDOT number
  - Equipment type selector
  - Preferred lanes / states
  - Upload fields for documents (MC Authority, Insurance)
- Form validation and submission feedback

---

## 5. Features

### Core Features
- **SPA Navigation** — Seamless page transitions without browser reload
- **Dark / Light Mode** — Toggle persists via `localStorage`; smooth CSS variable transitions
- **Scroll-triggered Animations** — Elements animate in as they enter the viewport (`IntersectionObserver`)
- **Animated Counters** — Statistics count up from 0 to target on first view
- **Testimonial Carousel** — Auto-advances every 4 seconds; manual prev/next controls
- **Mobile-Responsive Drawer Menu** — Slide-in sidebar with backdrop overlay
- **Sticky Navbar** — Transparent on hero, gains background + shadow on scroll
- **Toast Notifications** — Success messages after form submission
- **Legal Modals** — In-page modal overlays for Privacy Policy, Terms of Service, and Disclaimer
- **Form Handling** — Client-side validation with user feedback (no backend currently connected)

### UX Details
- Smooth scroll behavior on the entire page (`scroll-smooth`)
- Custom styled scrollbar (dark track, orange hover thumb)
- Orange text selection highlight (`::selection`)
- Focus rings on all inputs using the brand accent color
- Hover animations on cards (gradient border effect)
- Floating animation on the revenue stat card

---

## 6. UI Components

### Navbar
- Fixed position, full width
- Logo with truck icon + wordmark
- Desktop navigation links (hidden on mobile)
- Dark/Light mode toggle button
- "Get a Quote" CTA button
- Hamburger menu button (mobile only)
- Transitions from transparent → opaque with backdrop blur on scroll

### Service Cards
- White background with orange gradient border on hover
- Icon in accent-colored square
- Title, description, "Learn more" link with animated arrow

### Pricing Cards
- Three-column layout (stacks on mobile)
- "Most Popular" badge with glow effect on the Professional tier
- Feature checklist per plan
- CTA button linking to contact page

### Testimonial Slider
- Slides 1/3 width on desktop, 1/2 on tablet, full on mobile
- Star ratings using Lucide `star` icons with `fill-amber-400`
- Driver name, initials avatar, and truck type shown
- Dot pagination indicators
- Auto-play with 4-second interval; pauses on manual interaction

### Legal Modal
- Centered overlay with scroll
- Header with icon, title, close button
- Content rendered from a JavaScript `legalContent` object
- Closes on `Escape` key press or clicking outside

### Toast Notification
- Fixed bottom-right position
- Slides up on show, fades out after 3 seconds
- Green success variant used after form submission

---

## 7. Animations & Interactions

All scroll animations use the `IntersectionObserver` API for performance (no scroll event listeners).

| CSS Class | Animation |
|---|---|
| `.reveal` | Fade in + slide up from 40px |
| `.reveal-left` | Fade in + slide in from left (60px) |
| `.reveal-right` | Fade in + slide in from right (60px) |
| `.reveal-scale` | Fade in + scale up from 85% |
| `.stagger-children .reveal:nth-child(n)` | Each child delays by 100ms per step |

| Named Animation | Effect |
|---|---|
| `truckMove` | Truck icon scrolls across the hero bottom (20s loop) |
| `float` | Floating card bobs up and down (3s ease) |
| `pulse-dot` | Badge dot pulses opacity and scale (2s loop) |
| `roadLine` | Road dashes animate downward (1.5s loop) |
| `testimonial-track` | CSS transition for carousel slide (0.6s cubic-bezier) |

---

## 8. Theming (Dark / Light Mode)

The theme system uses CSS custom properties (`--var`) defined on `:root` (light) and overridden on `html.dark-mode` (dark).

### CSS Variables

| Variable | Light | Dark |
|---|---|---|
| `--bg-primary` | `#ffffff` | `#0d1f33` |
| `--bg-secondary` | `#f0f4f8` | `#07111d` |
| `--bg-card` | `#ffffff` | `#1a3650` |
| `--text-primary` | `#0d1f33` | `#f0f4f8` |
| `--text-secondary` | `#627d98` | `#9fb3c8` |
| `--border-color` | `#bcccdc` | `#334e68` |
| `--input-bg` | `#ffffff` | `#1a3650` |

### `toggleTheme()` Function
```javascript
// Adds/removes 'dark-mode' class on <html>
// Saves preference to localStorage as 'theme': 'dark' | 'light'
// Swaps sun/moon icon in the navbar
// Persists across page refreshes
```

---

## 9. Navigation System (SPA Router)

The `navigateTo(page)` function powers all in-app navigation:

```javascript
function navigateTo(page) {
  // 1. Hide all .page-section elements
  // 2. Show #page-{page} by adding .active-page
  // 3. Update active state on nav links
  // 4. Scroll to top
  // 5. Re-trigger scroll animations for new page
  // 6. Update document title
}
```

**Valid page names:** `home`, `about`, `services`, `pricing`, `contact`, `driver`

All `<a>` tags use `onclick="navigateTo('pageName')"` instead of `href` URLs, keeping the app entirely client-side.

---

## 10. Forms

### Contact Form (Quote Request)
**Fields:** Full Name, Email Address, Phone Number, Equipment Type (select), Message  
**Behavior:** On submit, shows a toast notification ("Message sent successfully!"). No actual backend integration — ready to connect to an API endpoint or service like Formspree, EmailJS, or a custom backend.

### Driver Registration Form
**Fields:** First Name, Last Name, Email, Phone, CDL Number, USDOT Number, Equipment Type, Trailer Length, Preferred Lanes/States (checkboxes), Previous Experience, How they heard about us, Document uploads (MC Authority, Insurance Certificate)  
**Behavior:** Client-side only. Validation checks required fields before showing success state.

> **To connect forms to a backend:** Replace the `preventDefault()` mock handler in the `<script>` section with a `fetch()` POST call to your API or a third-party form service.

---

## 11. Legal Modals

Three legal documents are stored inline as HTML strings in the `legalContent` JavaScript object:

| Key | Document | Triggered by |
|---|---|---|
| `privacy` | Privacy Policy | Footer link |
| `terms` | Terms of Service | Footer link |
| `disclaimer` | Disclaimer | Footer link |

Each document includes sections for data use, user rights, liability, governing law, and contact information. All policies are dated **January 1, 2025**.

---

## 12. Color Palette & Design Tokens

The site uses a two-color system extended from Tailwind defaults:

### Navy (Primary)
| Token | Hex | Usage |
|---|---|---|
| `navy-50` | `#f0f4f8` | Section backgrounds |
| `navy-300` | `#9fb3c8` | Muted text on dark |
| `navy-500` | `#627d98` | Body text, subtitles |
| `navy-700` | `#334e68` | Borders, dividers |
| `navy-900` | `#0d1f33` | Primary headings |
| `navy-950` | `#07111d` | Darkest backgrounds, navbar |

### Accent / Orange (Brand)
| Token | Hex | Usage |
|---|---|---|
| `accent-50` | `#fff8f0` | Light icon backgrounds |
| `accent-400` | `#fb923c` | Text on dark backgrounds |
| `accent-500` | `#f97316` | Primary buttons, icons, highlights |
| `accent-600` | `#ea580c` | Button hover states |

### Typography
- **Font family:** Inter (Google Fonts) — weights 300, 400, 500, 600, 700, 800, 900
- **Base size:** 16px (Tailwind default)
- **Headings:** `font-black` (900) or `font-bold` (700)

---

## 13. Responsive Design

The layout uses Tailwind's responsive prefixes with a **mobile-first** approach.

| Breakpoint | Width | Behavior |
|---|---|---|
| Default | < 640px | Single column, mobile menu visible |
| `sm:` | ≥ 640px | Two-column grids begin, CTA button visible |
| `lg:` | ≥ 1024px | Desktop nav visible, hamburger hidden, 3-column grids |

Key responsive behaviors:
- Service cards: 1 col → 2 col (sm) → 3 col (lg)
- Pricing cards: 1 col → 3 col (lg)
- Testimonial slider: full width → half → third
- Hero text scales from `text-4xl` to `text-7xl`
- Navbar CTA hidden on smallest screens
- Mobile menu: 320px slide-in drawer with full backdrop

---

## 14. External Dependencies

All dependencies are loaded via CDN — **no installation required**.

| Library | CDN URL | Size |
|---|---|---|
| Tailwind CSS | `cdn.tailwindcss.com` | ~350KB (JIT) |
| Lucide Icons | `unpkg.com/lucide@latest` | ~50KB |
| Inter Font | `fonts.googleapis.com` | Variable |

> **No npm packages. No build step. No local dependencies.**

---

## 15. How to Run

Since this is a pure HTML/CSS/JS project, no server or build process is needed.

### Option 1 — Open directly in a browser
```
Double-click routemasters_updated.html
```

### Option 2 — Serve locally (recommended for full feature support)
Using Python:
```bash
python -m http.server 8000
# Then open: http://localhost:8000/routemasters_updated.html
```

Using Node.js (`npx serve`):
```bash
npx serve .
# Then open the URL shown in the terminal
```

Using VS Code:
- Install the **Live Server** extension
- Right-click the file → "Open with Live Server"

> Opening via `file://` directly works for most features, but some browsers restrict certain APIs (like `localStorage` or `fetch`) on the `file://` protocol. A local server is recommended.

---

## 16. Browser Compatibility

| Browser | Status |
|---|---|
| Google Chrome 90+ | ✅ Fully supported |
| Mozilla Firefox 88+ | ✅ Fully supported |
| Microsoft Edge 90+ | ✅ Fully supported |
| Safari 14+ | ✅ Fully supported |
| Opera 76+ | ✅ Fully supported |
| Internet Explorer | ❌ Not supported |

The project uses `IntersectionObserver`, CSS custom properties, CSS Grid, Flexbox, and ES6+ JavaScript — all broadly supported in modern browsers.

---

## 17. Known Limitations

- **Forms are not connected to a backend.** Submission shows a toast notification only. Integration with an email service (e.g. EmailJS, Formspree) or custom API is required for production.
- **No real routing / URL history.** The SPA router does not update the browser URL, so deep-linking to a specific page (e.g. `/pricing`) is not supported. Browser back/forward buttons do not navigate between pages.
- **Hero background image uses a placeholder.** The image URL (`picsum.photos`) is a random stock photo service; replace with a branded image for production.
- **Testimonials are static.** No CMS or database connection — content must be edited directly in the HTML.
- **No analytics.** Google Analytics or similar tracking can be added to the `<head>` section as needed.
- **No SEO optimization.** As a single-page app with no server-side rendering, search engine indexing of sub-pages (About, Pricing, etc.) is limited.

---

## Author & Project Info

| Field | Value |
|---|---|
| **Project Name** | RouteMasters Pro |
| **Type** | Frontend (Single HTML File) |
| **Purpose** | Marketing / Lead Generation Website |
| **Industry** | Trucking & Freight Logistics |
| **Document Version** | 1.0 |
| **Last Updated** | April 2026 |

---

*This documentation covers the complete frontend implementation of the RouteMasters Pro website. For backend integration, API setup, or deployment instructions, consult your project's backend documentation.*
