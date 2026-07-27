# WorkCalc-CHANGELOG.md

**Version:** v01_00_012

---

## v01_00_012 — Unreleased

### Fix — PWA install on GitHub Pages
- `manifest.json`: added `scope: "/WorkCalc/"` and corrected `start_url` from `"/"` to `"/WorkCalc/"` — fixes 404 on PWA install
- `service-worker.js`: all ASSETS paths now prefixed with `/WorkCalc/` to match GitHub Pages subpath; cache bumped to `workcalc-v01_00_012`
- `js/app.js`: service worker registration changed from absolute `/service-worker.js` to relative `./service-worker.js` so it registers at the correct scope

## v01_00_011

### Branding — Visual identity
- Blueprint blue colour palette throughout (light and dark mode)
- New app icon: tape measure body with calculator display and keypad, extended tape with tick marks
- Header colour updated from black to deep navy `#082d56`
- `manifest.json` theme_color and background_color updated to `#082d56`
- Meta theme-color updated in HTML
- SVG icon added to manifest icons list for modern browser installs
- Bumped service worker cache to `workcalc-v01_00_011`

## v01_00_010

### Branding — App rename
- App renamed from CanCalc to WorkCalc throughout
- Updated `manifest.json` name and short_name to WorkCalc
- Updated service worker cache key to `workcalc-v01_00_010`
- Updated localStorage keys to `workcalc-units` and `workcalc-history`
- Versioned HTML file renamed to `workcalc_v01_00_010.html`; `cancalc_v01_00_009.html` moved to `Archive/`
- Updated CHANGELOG, ROADMAP, Documentation, CLAUDE.project.md, and README

---

## v01_00_000 — Unreleased

### UX — Conditional field visibility
- Irrelevant input fields now hidden automatically based on calc-type selection
- Concrete: Width hidden when Round pier is selected (not part of π × r² × depth formula)
- Lumber: Stud thickness and Stud width hidden when Stud count is selected
- General `visibleWhen` property added to input definitions; works for any future calculator

### UX — Input hints
- Every input field on every calculator now has an ⓘ icon next to its label
- Tapping or clicking the icon reveals a plain-language hint explaining what the field expects
- Second tap collapses the hint; works on both mobile and desktop
- Hints added to all 30+ input fields across all six calculators

### Masonry calculator
- Brick count (190 × 90 × 57 mm) and concrete block count (390 × 190 × 190 mm)
- Adjustable mortar joint width (default 10 mm); mortar volume computed from unit count
- Opening deductions (doors, windows) subtracted from gross wall area before calc
- Full metric and imperial support; waste-adjusted unit count and mortar volume
- Plain-language formula displayed beneath every result
- Bumped service worker cache to `cancalc-v01_00_003`

### Roofing calculator
- Roof squares: plan area × pitch factor ÷ 9.29 m²/sq (metric) or ÷ 100 ft²/sq (imperial)
- Pitch factor computed from rise/12 select (2/12 through 12/12)
- Shingle bundles: ceil(squares × 3) — Canadian standard
- Rafter length and ridge length displayed in formula
- Waste-adjusted squares and bundles

### Paint & coatings calculator
- Gross wall area: 2 × (length + width) × height
- Door deduction: 1.9 m² (20.5 ft²) per door; window deduction: 1.4 m² (15.1 ft²) per window
- Adjustable spread rate (default 10 m²/L metric, 400 ft²/gal imperial)
- Total volume = (net area ÷ spread rate) × coats
- Waste-adjusted total volume

### Excavation calculator
- Bank volume: length × width × depth
- Loose volume = bank volume × swell factor (sand 10%, topsoil 15%, clay 25%, rock 50%)
- Optional truck load count: ceil(loose volume ÷ truck capacity)
- Full metric (m³) and imperial (yd³) support

### Lumber & framing calculator
- Board feet: (thickness_nom × width_nom × length) ÷ 12 — always computed in nominal inches/feet regardless of unit toggle
- Stud count: floor(wall length ÷ spacing) + 1 for 300 mm (12"), 400 mm (16"), 600 mm (24") o/c
- Wall height field added to stud count mode — displayed in result as stud length for ordering reference (e.g. "40 studs · 2.44 m each"); does not affect count
- Waste factor applied to both calculations
- Bumped service worker cache to `cancalc-v01_00_002`

### Concrete calculator (in progress)
- Implemented `js/calculators/concrete.js` — slab, footing/rectangular pier, and round pier volume
- Bag count for 25 kg and 30 kg Canadian standard bags (yields 0.010 and 0.012 m³)
- Full metric and imperial support; waste-adjusted volume and bag count
- Plain-language formula displayed beneath every result
- Bumped service worker cache to `cancalc-v01_00_001` to push updated module to clients

---

## v01_00_000 — Scaffold

Initial app scaffold. Full UI shell with navigation, unit toggle, and history.
Calculator modules are stubbed — all six accept inputs but return no results yet.

### Added
- `cancalc_v01_00_000.html` + `index.html` — app shell (header, main, bottom nav)
- `manifest.json` — PWA manifest configured for TWA
- `service-worker.js` — cache-first offline strategy
- `css/main.css` — complete styles: light/dark mode, mobile-first layout, all components
- `js/app.js` — app shell: navigation, unit toggle, live calc wiring, copy, history
- `js/units.js` — metric/imperial conversion utilities
- `js/history.js` — localStorage-backed calculation history (max 20 entries)
- `js/calculators/concrete.js` — stub with full input definitions
- `js/calculators/lumber.js` — stub with full input definitions
- `js/calculators/masonry.js` — stub with full input definitions
- `js/calculators/roofing.js` — stub with full input definitions
- `js/calculators/paint.js` — stub with full input definitions
- `js/calculators/excavation.js` — stub with full input definitions

### Project setup (earlier in this version)
- Added `CLAUDE.md` (global base instructions)
- Added `CLAUDE.project.md` (CanCalc project-specific instructions)
- Added `CanCalc-ROADMAP.md` (project roadmap, all MVP items 📋 Planned)
- Added `Documentation/CanCalc-Project-Brief.md`
- Added `Documentation/CanCalc-Tech-Stack.md`

### Not yet implemented
- Icon files (`icons/`) — placeholder PNGs needed before Play Store submission
- Calculator logic — all six `calculate()` functions return `null` pending implementation
