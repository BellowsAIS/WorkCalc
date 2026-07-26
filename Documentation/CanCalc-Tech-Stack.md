# cancalc-Tech-Stack.md

Technical reference for the CanCalc PWA. Describes every layer of the stack,
the rationale for each choice, and constraints Claude Code must respect.

---

## Guiding constraints

- **No build step.** The app must run by opening `index.html` directly in a
  browser. No npm, no bundler, no transpiler.
- **No external dependencies at runtime.** Everything the app needs must be
  cached locally. No CDN calls, no API calls, no web fonts loaded from the
  network.
- **No backend.** All logic runs in the browser. No server, no database, no
  cloud sync.
- **No paid services.** The app is free to build, free to run, and free to
  distribute (Play Store one-time fee aside).

---

## Language and runtime

| Layer | Choice | Notes |
|---|---|---|
| Markup | HTML5 | Single `index.html` entry point |
| Styles | CSS3 | Single `css/main.css`; no preprocessor |
| Logic | Vanilla JavaScript ES6+ | No framework, no transpiler |
| Module pattern | ES modules (`type="module"`) | Supported by all modern browsers |

---

## Progressive Web App layer

| Feature | Implementation |
|---|---|
| Installability | `manifest.json` at root |
| Offline support | `service-worker.js` at root — cache-first strategy |
| Cache scope | All local assets cached on first load; no network calls at runtime |
| Cache invalidation | Version constant in `service-worker.js` — bump on every release |
| Storage | `localStorage` only — unit preference and calculation history |

### manifest.json key fields

```json
{
  "name": "CanCalc — Construction Calculators",
  "short_name": "CanCalc",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#ffffff",
  "theme_color": "#1a1a1a"
}
```

---

## File structure

```
cancalc/
├── CLAUDE.md
├── CLAUDE.project.md
├── cancalc-ROADMAP.md
├── cancalc-CHANGELOG.md
├── cancalc-Tech-Stack.md          ← this file
├── Documentation/
├── Samples/
├── Archive/
├── index.html                     ← copy of current versioned file
├── cancalc_v01_00_000.html        ← versioned app file
├── manifest.json
├── service-worker.js
├── css/
│   └── main.css
├── js/
│   ├── app.js                     ← shell, navigation, global state
│   ├── history.js                 ← calculation history (localStorage)
│   ├── units.js                   ← imperial/metric conversion utilities
│   └── calculators/
│       ├── concrete.js
│       ├── lumber.js
│       ├── masonry.js
│       ├── roofing.js
│       ├── paint.js
│       └── excavation.js
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    └── icon-maskable.png          ← required for Play Store
```

---

## Calculator module interface

Each file in `js/calculators/` exports a default object conforming to this
interface:

```javascript
export default {
  id: 'concrete',               // matches nav tab identifier
  label: 'Concrete',            // display name, Canadian English
  inputs: [                     // array of input field definitions
    {
      id: 'length',
      label: 'Length',
      unit: { metric: 'm', imperial: 'ft' },
      inputmode: 'decimal',
      min: 0
    }
    // ...
  ],
  calculate(inputs, unitSystem) {
    // Pure function — no side effects
    // unitSystem: 'metric' | 'imperial'
    // Returns: { result, unit, formula, wasteAdjusted }
  },
  defaultWasteFactor: 10        // percent
}
```

---

## Key constants

### Canadian brick and block dimensions

| Unit | Brick | Concrete block |
|---|---|---|
| Nominal (mm) | 200 × 100 × 75 | 400 × 200 × 200 |
| Actual (mm) | 190 × 90 × 57 | 390 × 190 × 190 |
| Default joint | 10 mm | 10 mm |

### Concrete bag yields

| Bag size | Yield (m³) |
|---|---|
| 25 kg | 0.010 |
| 30 kg | 0.012 |

### Roofing

| Constant | Value |
|---|---|
| 1 square | 9.29 m² |
| Bundles per square | 3 |

### Paint

| Constant | Default value |
|---|---|
| Spread rate | 10 m²/L |
| Door deduction | 1.9 m² |
| Window deduction | 1.4 m² |

### Excavation swell factors

| Soil type | Swell factor |
|---|---|
| Sand | 10% |
| Clay | 25% |
| Rock | 50% |
| Topsoil | 15% |

---

## Distribution — Google Play Store via TWA

The PWA is wrapped as an Android app using Bubblewrap (Google's official CLI).

| Item | Detail |
|---|---|
| Tool | `@bubblewrap/cli` (npx, no global install required) |
| Package ID | `ca.renniesolutions.cancalc` (confirm before first submission) |
| Output | Signed AAB (Android App Bundle) for Play Store |
| `asset_links.json` | Added after Play Console app is created and SHA-256 fingerprint is known |
| Step-by-step guide | `Documentation/Play-Store-Guide.md` (generated during build) |

---

## Browser and device targets

| Target | Minimum version |
|---|---|
| Chrome for Android | 90+ |
| Samsung Internet | 14+ |
| Android WebView (TWA) | Android 8.0 (API 26)+ |
| Desktop Chrome (PWA) | 90+ |

iOS Safari is not a primary target for v1 but the PWA will be installable
via Add to Home Screen on iOS 16.4+.

---

## Out of scope — do not implement

- Any server-side code or cloud service
- User authentication or accounts
- Cost or material pricing (prices change; liability risk)
- Structural engineering calculations (requires P.Eng stamp)
- Analytics or usage tracking of any kind
- Push notifications
- Apple App Store / Xcode build pipeline (v1 Android only)
