# CanCalc-CHANGELOG.md

**Version:** v01_00_000

---

## v01_00_000 — Unreleased

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
