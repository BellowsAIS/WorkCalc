# CLAUDE.project.md — WorkCalc

**Version:** 2026-07-26-01

Project-specific instructions. These extend and, where noted, override `CLAUDE.md`.

---

## Project overview

WorkCalc is a mobile-first Progressive Web App (PWA) for Canadian construction
tradespeople. It provides offline-capable calculators for common on-site
quantity and material estimation tasks: concrete, lumber & framing, masonry,
roofing, paint & coatings, and excavation.

The app is fully self-contained — no login, no backend, no paid APIs, no
external data. All logic runs in the browser. It is distributed via the Google
Play Store using a Trusted Web Activity (TWA) wrapper built with Bubblewrap,
and is also installable directly from any browser as a standard PWA.

---

## Tech stack

| Layer | Choice |
|---|---|
| Language | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| Framework | None — no build step, no bundler |
| Entry point | `index.html` |
| Offline | Service worker (`service-worker.js`) — cache-first strategy |
| Persistence | `localStorage` only (unit preference, calculation history) |
| Distribution | Google Play Store via Bubblewrap TWA wrapper |
| Direct install | Standard PWA (browser prompt) |
| CI/CD | GitHub Actions |

No npm packages, no node_modules, no transpilation. The app must run by
opening `index.html` directly in a browser with no build step.

---

## Repo structure

```
workcalc/
├── CLAUDE.md                    # Base instructions (unmodified)
├── CLAUDE.project.md            # This file
├── WorkCalc-ROADMAP.md           # Project roadmap
├── workcalc-CHANGELOG.md         # Version history
├── Documentation/               # Brief, specs, Play Store notes
├── Samples/                     # Reference screenshots, design refs
├── Archive/                     # Superseded files
├── index.html                   # App entry point (also the versioned file)
├── manifest.json                # Web App Manifest (TWA-configured)
├── service-worker.js            # Offline cache worker
├── css/
│   └── main.css                 # All styles
├── js/
│   ├── app.js                   # App shell, navigation, global state
│   ├── history.js               # Calculation history (localStorage)
│   ├── units.js                 # Imperial/metric conversion utilities
│   └── calculators/
│       ├── concrete.js
│       ├── lumber.js
│       ├── masonry.js
│       ├── roofing.js
│       ├── paint.js
│       └── excavation.js
└── icons/                       # PWA icons (192px, 512px, maskable)
```

---

## Versioning

This project follows the standard `CLAUDE.md` versioning convention adapted
for a PWA (no `.html` suffix on the version string since the entry point is
always `index.html`).

Version format: `vMM_mm_ppp`
- `MM` — major version (breaking change or full redesign)
- `mm` — minor version (new calculator module or significant feature)
- `ppp` — patch (bug fix, copy change, formula correction)

Record every version bump in `workcalc-CHANGELOG.md` before opening a PR.
The current version string must also be reflected in `manifest.json`
(`version` field) and displayed in the app's footer/about screen.

Starting version: `v01_00_000`

---

## Calculator modules

Each module lives in `js/calculators/[name].js` and exports a single default
object with:
- `id` — matches the nav tab identifier
- `label` — display name (Canadian English)
- `inputs` — array of input field definitions
- `calculate(inputs, unitSystem)` — pure function, returns `{ result, formula }`
- `wasteFactor` — default waste percentage (all modules default to `10`)

### Module specs

**Concrete**
- Slab volume (m³ or ft³): length × width × thickness
- Footing/pier volume: length × width × depth (or π × r² × depth for round piers)
- Bag count: volume ÷ yield per bag; Canadian standard bag sizes 25 kg and 30 kg
  (yield: 25 kg ≈ 0.010 m³, 30 kg ≈ 0.012 m³)

**Lumber & framing**
- Board feet: (thickness_in × width_in × length_ft) ÷ 12
- Stud count: (wall length ÷ spacing) + 1, with options for 12", 16", 24" o/c
- Rough beam span: display as lookup reference only (not a structural calc —
  show a disclaimer)
- Use nominal vs actual sizing constants (e.g. 2×4 actual = 38 × 89 mm)

**Masonry**
- Brick count: wall area ÷ (brick face area + mortar joint)
  Standard Canadian brick: 190 × 90 × 57 mm; default joint: 10 mm
- Block count: same formula; standard block: 390 × 190 × 190 mm
- Mortar volume: number of joints × joint volume
- Opening deductions: subtract door/window area from wall area before calc

**Roofing**
- Roof squares: (plan area × pitch factor) ÷ 9.29 m² per square
  Pitch factor = √(rise² + run²) ÷ run
- Shingle bundles: squares × 3 bundles per square (standard Canadian)
- Rafter length: √(run² + rise²) where rise = run × pitch (rise/12)
- Ridge length: equals building length (gable roof)

**Paint & coatings**
- Wall area: 2 × (length + width) × height
- Door deduction: 1.9 m² per door (standard Canadian interior door)
- Window deduction: user-specified or default 1.4 m² per window
- Litres per coat: area ÷ spread rate (default 10 m²/L, overridable)
- Total litres: litres per coat × number of coats

**Excavation**
- Cut/fill volume: length × width × depth (rectangular) or
  (top area + bottom area + 4 × mid area) ÷ 6 × depth (prismoidal)
- Truck load count: volume × swell factor ÷ truck capacity
- Swell factor presets: sand 10%, clay 25%, rock 50%, topsoil 15%

---

## UX requirements

- Mobile-first; all tap targets minimum 48 × 48 px
- Numeric keyboard (`inputmode="decimal"`) on all number inputs
- Results update live on every keystroke — no submit button needed
- Every result panel shows: result value, unit, formula in plain language,
  waste-adjusted result (if waste factor > 0)
- Waste factor field on every calculator; defaults to 10%; range 0–50%
- Global imperial/metric toggle in the header; persists via `localStorage`
- Calculation history: last 20 results, stored in `localStorage`, shown in
  a dedicated History tab
- Copy result button: copies a plain-text summary suitable for pasting
  into a quote or email
- All copy text uses Canadian English (metres, litres, millimetres, etc.)

---

## Design constraints

- High-contrast UI — must be readable in direct sunlight on a phone
- Dark mode via `prefers-color-scheme: dark`
- No gradients, no heavy animations, no decorative flourishes
- Single bottom navigation bar with icon + label for each of the six
  calculator modules plus History
- Canadian English throughout — no American spellings
- No external fonts, no CDN dependencies — everything must work offline

---

## manifest.json requirements

```json
{
  "name": "WorkCalc — Construction Calculators",
  "short_name": "WorkCalc",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#ffffff",
  "theme_color": "#1a1a1a",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

The `asset_links.json` file required by Bubblewrap will be added after the
Play Store app is created and the SHA-256 fingerprint is known.

---

## Service worker strategy

Cache-first for all local assets. On first load, cache:
- `index.html`
- `manifest.json`
- `css/main.css`
- All `js/` files
- All `icons/`

No network requests are made at runtime, so no network-fallback strategy is
needed. Update the cache version constant in `service-worker.js` on every
release.

---

## Out of scope (do not implement)

- Cost or material pricing (prices change; liability risk)
- Structural engineering calculations (requires P.Eng stamp)
- User accounts, cloud sync, or any backend
- iOS App Store distribution (Android only for v1)
- Push notifications
- Analytics or tracking of any kind

---

## Branching and PR rules

Follows `CLAUDE.md` conventions:
- All work on feature branches: `feature/short-description`
- One PR per feature or calculator module
- Do not merge without explicit approval
- Once approved, Claude Code merges directly — no GitHub UI needed

---

## Play Store notes

After the PWA is complete and tested:
1. Run `npx @bubblewrap/cli init` to generate the Android project
2. Set `packageId` to `ca.renniesolutions.workcalc` (placeholder — confirm
   before submission)
3. Build a signed APK/AAB using the Bubblewrap CLI
4. Submit to Google Play via the Play Console
5. Full step-by-step instructions are in `Documentation/playstore-guide.md`
   (generated by Claude Code during the build)

---

## Change history

| Version       | Summary                                                               |
|---------------|-----------------------------------------------------------------------|
| 2026-07-26-01 | Initial version — project overview, tech stack, module specs, UX/design requirements, versioning, Play Store notes |
