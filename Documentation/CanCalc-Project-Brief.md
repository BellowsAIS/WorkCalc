Build a Progressive Web App called CanCalc — a construction calculator for Canadian tradespeople. The app must be fully offline-capable, require no login, no paid APIs, and no backend. All logic runs in the browser.

## Tech stack
- Vanilla HTML, CSS, and JavaScript only — no frameworks
- Single index.html entry point with modular JS files
- Service worker for full offline support
- Web App Manifest for installability
- Target: Android via Google Play Store using Bubblewrap (TWA wrapper)

## Six calculator modules

Each calculator follows this pattern: labelled inputs → instant live result → waste factor field (default 10%) → share/copy button that copies result as plain text.

1. Concrete — slab volume (m³), footing/pier volumes, bag count estimator using Canadian standard bag sizes (25 kg and 30 kg)
2. Lumber & framing — board feet, stud count for walls at 12", 16", or 24" o/c, rough beam span estimates using nominal vs actual sizing
3. Masonry — brick and concrete block count from wall area, mortar volume (with joint width input), opening deductions; use standard Canadian brick (190×90×57 mm) and block (390×190×190 mm) dimensions
4. Roofing — roof squares from plan area + pitch, shingle bundle count (3 bundles/square), rafter length from span and pitch, ridge length
5. Paint & coatings — room area from wall dimensions, litres per coat (default spread rate 10 m²/L, overridable), door and window deductions, coat count
6. Excavation — cut/fill volume (m³), truck load count from volume and truck capacity, swell factor with soil type presets (sand 10%, clay 25%, rock 50%, topsoil 15%)

## UX requirements
- Mobile-first layout, large tap targets (minimum 48px), numeric keyboard triggered automatically on number inputs
- Bottom navigation bar with an icon and label for each of the six modules
- Global imperial/metric toggle, persistent via localStorage
- Every result displays the formula used beneath it (plain language, not code)
- Waste factor field on every calculator, defaulting to 10%
- Calculation history: last 20 results stored in localStorage, accessible from a history tab
- Results copyable as plain text suitable for pasting into a quote or email

## Design
- Clean, high-contrast UI suitable for use in bright outdoor light
- Canadian English throughout (metres, litres, "storey", etc.)
- Dark mode support via prefers-color-scheme
- No gradients, no heavy animations — fast and utilitarian

## Deliverables
1. All source files for the PWA
2. A manifest.json configured for TWA use (including share_target if feasible)
3. A service-worker.js that caches all assets for full offline use
4. A README.md with step-by-step instructions for wrapping the app with Bubblewrap and submitting to the Google Play Store

## Out of scope
- Cost or material pricing
- Structural engineering calculations
- Any server-side logic
- User accounts

Start by scaffolding the file structure and index.html, then build one calculator module at a time, testing each before moving to the next.
