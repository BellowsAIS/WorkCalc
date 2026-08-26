# Comprehensive Documentation — WorkCalc

> **Documentation Version:** 2026-08-02
> **App Version/Last Updated:** v01_00_013 (unreleased to production; in closed testing)
> **Status:** Active Development

---

## 1. App Overview

WorkCalc is a mobile-first Progressive Web App (PWA) that gives Canadian construction tradespeople fast, offline-capable material and quantity calculators. It covers the six estimation tasks reached for most often on site: concrete volumes and bag counts, lumber board feet and stud counts, masonry unit and mortar quantities, roofing squares and shingle bundles, paint and coatings volumes, and excavation bank and loose volumes.

**The problem it solves:** Tradespeople estimating material quantities on site typically switch between a measuring tape, a phone calculator, and mental arithmetic — a process prone to errors and forgotten formulas. WorkCalc puts the right formula in the right context, with Canadian-standard constants baked in (25 kg and 30 kg bag yields, standard brick and block dimensions, shingle bundle counts, swell factor presets), so the user can enter dimensions and get a reliable estimate immediately.

**Who uses it:** Field crew and tradespeople — carpenters, concreters, masons, roofers, painters, and excavation operators — working on Canadian residential and light commercial construction projects. The app is also useful for project managers and estimators doing quick take-offs at a desk.

**Current status:** All six calculator modules are complete. The app is live as a GitHub Pages PWA and is available on Android via Google Play Store closed testing (as of the `appVersionCode 6` build targeting Android 16). Play Store production release is pending final listing assets (screenshots, feature graphic).

---

## 2. End Users

### 2.1 Getting Started

WorkCalc requires no account, no login, and no setup. Users access it in two ways:

**Browser / PWA install:**
Open `https://BellowsAIS.github.io/WorkCalc/` in any modern browser. On Android Chrome, the browser will offer an "Add to Home Screen" prompt automatically. On iOS Safari (16.4+), use the Share menu → "Add to Home Screen." Once installed, the app is fully available offline.

**Google Play Store (Android):**
Search for WorkCalc by Bellows Applied Intelligence Solutions, or install directly from the Play Store listing. The app installs as a Trusted Web Activity (TWA) — it opens in a full-screen browser shell with no visible browser chrome, behaving like a native app. It is identical to the PWA version in every functional respect.

**Prerequisites from the user's perspective:**
- Android 5.0+ (API 21) or any modern browser
- Internet connection required for the very first load only; all subsequent use is offline
- No account, no subscription, no permissions beyond storage (for history and unit preference)

### 2.2 User Guide & Features

**Navigation**

The bottom navigation bar has eight tabs: Concrete, Lumber, Masonry, Roofing, Paint, Excavation, History, and About. Tapping a tab opens that calculator immediately. The active tab is highlighted.

**How every calculator works**

1. Select the calculation type from the dropdown (e.g. Slab, Footing, or Round pier on the Concrete calculator).
2. Enter dimensions in the labelled fields. Results update live on every keystroke — there is no submit button. This was a deliberate design decision to reduce friction on site: users are entering real-world measurements progressively and should see the result change as they type.
3. Adjust the waste factor (default 10%). The waste-adjusted result appears directly below the base result. The default 10% reflects common Canadian construction practice for ordering extras.
4. Read the plain-language formula beneath the result. This serves two purposes: it lets experienced users verify the calculation method, and it helps less-experienced users understand what the app actually did.
5. Tap **Copy result** to copy a plain-text summary (label, result, formula, waste-adjusted result) suitable for pasting into a text message, quote, or email. Tapping Copy also saves the entry to History.

**Imperial / metric toggle**

The header contains a toggle button (labelled "Metric" or "Imperial" depending on the active state). Tapping it switches all input labels and result units instantly. Select options (bag size labels, stud spacing labels) also switch — for example, "25 kg (yield 0.010 m³)" becomes "55 lb (25 kg) · yield 0.353 ft³." The selected unit system persists in `localStorage` across sessions.

**Calculator-specific notes**

| Calculator | Key notes |
|---|---|
| **Concrete** | Three pour types: Slab, Footing/rectangular pier, Round pier. Width field hides automatically for Round pier (not needed for π × r² × depth). Bag count is for 25 kg or 30 kg Canadian standard pre-mix bags. |
| **Lumber** | Board feet uses *nominal* dimensions (enter 2 for a 2×4, not the actual 1½"). Stud count adds one to account for the starting stud. Wall height field appears in stud count mode and shows stud length in the result for ordering reference — it does not affect the count. |
| **Masonry** | Calculates brick or block units plus mortar volume. Opening deductions (doors, windows) are subtracted from gross wall area before the calculation. Uses standard Canadian brick (190 × 90 × 57 mm actual) and block (390 × 190 × 190 mm actual) with a default 10 mm mortar joint. |
| **Roofing** | Roof squares calculated from plan area × pitch factor ÷ 9.29 m²/sq. Shingle bundles are always 3 per square (Canadian standard). Pitch is entered as rise/12 (e.g. 6/12 = a 6-in-12 pitch). |
| **Paint & Coatings** | Wall area is 2 × (length + width) × height. Default spread rate is 10 m²/L (400 ft²/gal imperial). Door deduction is 1.9 m² per door; window deduction is 1.4 m² per window. |
| **Excavation** | Bank volume is the undisturbed cut/fill. Loose volume applies a swell factor preset (sand 10%, topsoil 15%, clay 25%, rock 50%). Truck load count is optional. |

**History tab**

Shows the last 20 calculations that were explicitly copied using the Copy result button. History is stored in `localStorage` — it does not sync across devices. The "Clear all" button wipes the history. Note: simply viewing a result does not save it to history; you must tap Copy. This is intentional — it avoids cluttering history with in-progress entries as the user types.

**About tab**

Contains the app version, a full liability disclaimer, governing law notice (Province of Ontario), and BAIS contact details.

**Input hints**

Every input field has a ⓘ icon. Tapping it reveals a plain-language explanation of what the field expects and any gotchas (e.g. that board-foot calculations use nominal, not actual, dimensions). Tapping again collapses it.

**Conditional fields**

Fields that are irrelevant to the selected calculation type hide automatically. For example, on the Concrete calculator, the Width field hides when Round pier is selected. This reduces visual clutter on a small screen.

### 2.3 Accessibility & Localisation

**Accessibility:**
- All tap targets are a minimum 48 × 48 px (Google's recommended minimum for touch targets)
- ARIA roles are in use: bottom nav uses `role="tab"` / `aria-selected`; panels use `role="tabpanel"` / `aria-labelledby`; hint buttons use `aria-expanded`
- High-contrast UI designed for bright outdoor sunlight
- Dark mode via `prefers-color-scheme: dark`

**Known accessibility gaps:**
- No formal accessibility audit has been conducted. Screen reader behaviour (VoiceOver, TalkBack) has not been verified. Contrast ratios have not been formally measured against WCAG 2.1 AA thresholds. This is listed on the roadmap as a High Priority item.
- No skip-navigation link or keyboard shortcut to jump between sections

**Language:**
- Canadian English throughout (metres, litres, millimetres, "on-centre," "storey," etc.)
- No French language support in v1. This is a Future Enhancement on the roadmap, noted as potentially important for Quebec deployment or bilingual contexts.

**Units:**
- Default is metric. Imperial can be toggled at any time. The unit preference persists between sessions.
- Board feet is always calculated in nominal inches and feet regardless of the unit toggle — this is correct construction industry behaviour (board feet is inherently an imperial measure) and is explained in the lumber input hints.
- Canadian construction mixes metric and imperial depending on trade and project vintage. The dual-unit design reflects this reality.

**Mobile / field use:**
- Mobile-first layout; designed and tested at phone width
- `inputmode="decimal"` on all numeric fields triggers the numeric keyboard on mobile — avoids the user needing to manually switch keyboards
- No offline dependency on network: once installed, works with no signal
- Not optimised for tablets or wide screens (listed as an Ideas Parking Lot item)

**Provincial variations:**
- The app uses national Canadian construction standards (e.g. CSA brick/block dimensions, national bag sizes). No province-specific logic is implemented. If provincial building code nuances are relevant to a calculation (e.g. insulation R-values by climate zone), those are out of scope for v1.

### 2.4 Support & Contacts

| Type | Contact |
|---|---|
| General inquiries and support | BellowsAIS@outlook.com |
| Bug reports and feature requests | GitHub Issues: `https://github.com/BellowsAIS/WorkCalc/issues` |
| Developer (BAIS) | Bellows Applied Intelligence Solutions, Ontario, Canada |

Expected response time for support inquiries is not formally defined. For a tool of this scale serving a small audience, a reasonable expectation is a few business days.

---

## 3. Developers

### 3.1 Standards & Conventions Compliance

#### claude.md

The repo's `CLAUDE.md` is version **2026-08-01-01**. The PR rule matches the reference standard: "Open a pull request proactively once work is complete — do not wait to be asked." (Version 2026-07-26-01 had tightened this to "Open a pull request immediately after every push"; that change was reverted in 2026-08-01-01.)

A previous deviation — the Change history footer referencing `Rennie-Solutions-Project-Playbook` and "Rennie Solutions" branding throughout — was resolved in version 2026-08-01-01, which updated all references to "Bellows Applied Intelligence Solutions" and `BellowsAIS-Project-Playbook`.

#### claude.project.md

Present. Version 2026-07-27-01. Well-structured and comprehensive. Key content:
- Defines the tech stack, repo structure, calculator module interface, UX requirements, design constraints, versioning approach, service worker strategy, out-of-scope items, branching rules, and Play Store notes
- Marks certain items explicitly out of scope: cost/pricing, structural engineering, user accounts, analytics, iOS App Store, push notifications

**Instructions that override CLAUDE.md:**

| Topic | CLAUDE.project.md instruction | CLAUDE.md instruction | Note |
|---|---|---|---|
| Branching | `feature/short-description` | `claude/<short-description>` | Conflict — CLAUDE.project.md wins per the rules. In practice, all branches in this repo use the `claude/` prefix (verified from git history). The project file's branching rule appears to be a documentation lag. |

**Other notes in CLAUDE.project.md:**
- Play Store notes section references `Documentation/playstore-guide.md`. This file does not exist. The actual guide is `Documentation/Bubblewrap-Build-Guide.md`. The reference should be updated.
- The tech stack table lists "GitHub Actions" as the CI/CD tool. No `.github/workflows/` directory exists in the repo. Either CI was planned and not implemented, or it was removed. This should be clarified and the project file updated.
- The manifest.json key fields shown in the file show `"background_color": "#ffffff"` and `"theme_color": "#1a1a1a"`. The actual `manifest.json` correctly uses `"#082d56"` for both (updated during the v01_00_011 branding refresh). The spec in CLAUDE.project.md is stale.

#### General Standards Compliance

| Item | Standard | Actual | Status |
|---|---|---|---|
| `Samples/` folder | Required | Absent | ⚠️ Missing. No sample exports, screenshots, or reference material are committed. Screenshots are listed as pending for the Play Store listing. Adding representative screenshots to `Samples/` would be worth considering. |
| `twa/` folder | Not in standard structure | Present (contains `twa-manifest.json`) | Acceptable omission from the standard — the standard predates TWA projects. The project file's repo structure diagram should include it. |
| Versioned files at root | Only current version at root; superseded to `Archive/` | `workcalc_v01_00_010.html`, `011.html`, `012.html`, and `013.html` are all at root | ⚠️ 010, 011, and 012 are superseded and should only be in `Archive/`. They are currently in both locations — they appear to have been copied rather than moved. |
| `manifest.json` version field | Should reflect current app version | Set to `"01.00.000"` | ⚠️ Stale. Should be `"01.00.013"`. |
| File naming — Proper-Case-Hyphen-Separated | Required | `Documentation/WorkCalc-Tech-Stack.md` is correct; `workcalc-CHANGELOG.md` and `workcalc-ROADMAP.md` mentioned in CLAUDE.project.md's repo diagram are the old lowercase names | Note: Actual files are correctly named `WorkCalc-CHANGELOG.md` and `WorkCalc-ROADMAP.md`. The diagram in CLAUDE.project.md is inaccurate. |
| `WorkCalc-Tech-Stack.md` package ID | `ca.bais.workcalc` | `ca.bais.workcalc` | ✅ Resolved — Tech Stack doc updated to correct package ID. |
| `twa-manifest.json` minSdkVersion | — | 21 (Android 5.0) | ✅ Resolved — Tech Stack doc updated to reflect Android 5.0 (API 21) minimum and Android 16 (API 36) target SDK. |
| CHANGELOG structure | One `v01_00_000` entry | Two separate `v01_00_000` sections ("Unreleased" UX features, then "Scaffold") | ⚠️ Confusing. The UX features (conditional fields, hints, masonry, roofing, paint, excavation, lumber) were likely developed before the rename and filed under the wrong version header. A developer reading the changelog will find this misleading. |
| CI/CD | Mentioned in CLAUDE.project.md | No `.github/workflows/` | ⚠️ No CI in place. |

### 3.2 Architecture & Repository Structure

#### Architecture Overview

WorkCalc is a single-page application with no build step, no framework, and no backend. The choice of vanilla HTML5/CSS3/JS with ES modules was deliberate: it eliminates build toolchain complexity, ensures the app remains maintainable by any developer who knows web fundamentals, and keeps the dependency surface area at zero.

```
Browser
  └── index.html (app shell — minimal HTML, loads modules)
        ├── css/main.css (all styles — light, dark, mobile-first)
        └── js/
              ├── app.js (app shell, nav, rendering, live calc, copy, history rendering)
              ├── units.js (conversion utilities, formatting)
              ├── history.js (localStorage CRUD)
              └── calculators/
                    ├── concrete.js
                    ├── lumber.js
                    ├── masonry.js
                    ├── roofing.js
                    ├── paint.js
                    └── excavation.js

PWA Layer
  ├── manifest.json (installability, TWA configuration)
  └── service-worker.js (cache-first offline strategy)

Distribution
  └── twa/
        └── twa-manifest.json (Bubblewrap config — builds the Android AAB)
```

**Key architectural decisions:**

- **ES modules with `type="module"`:** Calculator files each export a single default object conforming to a defined interface. `app.js` imports all six and iterates over them to render the UI generically — adding a new calculator requires only adding one file and one import line. This was chosen over a global registration pattern to keep each module fully self-contained.

- **No state management library:** All state lives in two places: `localStorage` (unit preference, history) and the DOM (current input values, active panel). The app re-reads input values on every keystroke and recomputes from scratch. This is appropriate for a stateless estimation tool and avoids the complexity of a reactive framework.

- **Pure calculate() functions:** Each calculator's `calculate(inputs, unitSystem)` function is a pure function — no side effects, no DOM access, no globals. This was a deliberate choice to make the core calculation logic independently testable and verifiable.

#### Repository Structure

```
/
├── workcalc_v01_00_013.html      # Current versioned app (source of truth)
├── workcalc_v01_00_012.html      # ⚠️ Should be in Archive only
├── workcalc_v01_00_011.html      # ⚠️ Should be in Archive only
├── workcalc_v01_00_010.html      # ⚠️ Should be in Archive only
├── index.html                    # Verbatim copy of 013 (GitHub Pages entry point)
├── privacy.html                  # Standalone privacy policy page (GitHub Pages)
├── manifest.json                 # Web App Manifest
├── service-worker.js             # Offline cache (cache key: workcalc-v01_00_013)
├── CLAUDE.md                     # Base development instructions
├── CLAUDE.project.md             # Project-specific instructions
├── WorkCalc-CHANGELOG.md         # Version history
├── WorkCalc-ROADMAP.md           # Planned and in-progress features
├── README.md
├── css/
│   └── main.css                  # All styles (light, dark, mobile-first, all components)
├── js/
│   ├── app.js                    # App shell — nav, rendering, live calc wiring, copy, history
│   ├── units.js                  # Metric/imperial conversion utilities and formatting
│   ├── history.js                # localStorage-backed calculation history
│   └── calculators/
│       ├── concrete.js
│       ├── lumber.js
│       ├── masonry.js
│       ├── roofing.js
│       ├── paint.js
│       └── excavation.js
├── icons/
│   ├── favicon.svg               # SVG icon for modern browser tabs
│   ├── favicon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable.png         # Required for Play Store adaptive icon
│   └── feature-graphic.png       # 1024×500 Play Store banner (committed to icons/)
├── twa/
│   └── twa-manifest.json         # Bubblewrap TWA configuration (appVersionCode: 6)
├── Archive/                      # Superseded versioned files (cancalc v000–v009, workcalc v010–v012)
├── Documentation/
│   ├── Bubblewrap-Build-Guide.md # Step-by-step Android build and Play Store upload
│   ├── PlayStore-Listing.md      # App store copy and outstanding items checklist
│   ├── WorkCalc-Project-Brief.md # Original project brief
│   └── WorkCalc-Tech-Stack.md    # Technical stack reference
└── Samples/                      # ⚠️ Not present — missing per standard structure
```

### 3.3 Installation, Configuration & Deployment Architecture

#### Installation & Dependencies

**Prerequisites:**
- No prerequisites to run or develop the app itself — it is plain HTML/CSS/JS
- To develop: a text editor and a browser. No Node.js, no package manager, no build step
- To build the Android TWA (on a local machine only — not possible in a remote Claude Code session):
  - Node.js 18+
  - Java JDK 11+
  - `npm install -g @bubblewrap/cli`
  - ~2 GB free disk space (Bubblewrap downloads the Android SDK on first run)

**Development environment setup:**
1. Clone the repo: `git clone https://github.com/BellowsAIS/WorkCalc.git`
2. Open `index.html` in a browser. That's it.
3. To test the service worker and PWA install behaviour, use a local server (e.g. `npx serve .` or VS Code Live Server) because service workers require HTTPS or localhost.

#### Configuration

There are no environment variables and no config files beyond the source files themselves. The configurable constants in the app are:

| Constant | Location | Notes |
|---|---|---|
| Service worker cache key | `service-worker.js` line 1 (`const CACHE`) | Must be bumped on every release to push updated assets to clients |
| Unit preference | `localStorage['workcalc-units']` | Set by the user, persisted between sessions |
| Calculation history | `localStorage['workcalc-history']` | Up to 20 entries, JSON array |
| Manifest version | `manifest.json` `"version"` field | Currently stale — should be kept in sync with `appVersionName` |
| TWA version code | `twa/twa-manifest.json` `appVersionCode` | Currently 6; must increment on every Play Store upload |
| TWA version name | `twa/twa-manifest.json` `appVersionName` | Currently `"1.0.013"`; should match the app version |

**Secrets:**
- The Android keystore (`twa/android.keystore`) is excluded from git via `.gitignore`. It is stored only on the local Windows machine used for builds. Loss of this file means loss of the ability to update the Play Store listing without a key reset request to Google. Keep it backed up.
- No API keys, tokens, or credentials exist anywhere in the codebase.

#### Deployment

**PWA (primary):**
GitHub Pages serves the app automatically from the `main` branch. There is no manual deploy step. Pushing to `main` (via merged PR) makes the change live within a few minutes, subject to GitHub's CDN propagation time. The live URL is `https://BellowsAIS.github.io/WorkCalc/`.

**Service worker caching caveat:** If the service worker cache key in `service-worker.js` is not bumped, returning users will continue to see the old cached version. The cache key must be changed on every release that modifies any cached asset.

**Android TWA (Play Store):**
Built manually on a local Windows machine. See `Documentation/Bubblewrap-Build-Guide.md` for the full procedure. In summary:
1. `npm install -g @bubblewrap/cli` (update CLI)
2. `bubblewrap update` (regenerate Android project)
3. `bubblewrap build` (produce signed AAB)
4. Upload `app-release-bundle.aab` to Play Console

**CI/CD:**
No CI pipeline exists. CLAUDE.project.md lists GitHub Actions under the tech stack, but no workflow files have been created. There are no automated tests, no automated deployments, and no status checks on PRs. This is a gap that is acceptable for the current scale but should be addressed if the project grows.

**Rollback:**
The previous versioned app files are retained in `Archive/`. To roll back the PWA, copy the desired archived version over `index.html` and push. The service worker cache key in the new `service-worker.js` would also need to be updated to force cache invalidation.

#### Dependencies & Third-Party Services

| Dependency | Version | Purpose |
|---|---|---|
| `@bubblewrap/cli` | Latest (updated August 2026) | Android TWA build toolchain; not a runtime dependency |
| None at runtime | — | The app has zero runtime dependencies — no frameworks, no libraries, no CDN calls |

The zero-runtime-dependency design is intentional and is a hard constraint documented in CLAUDE.project.md. It guarantees full offline functionality, eliminates CDN availability risk, and prevents any supply chain vulnerability from affecting the running app.

**Third-party services:**
- **GitHub Pages:** Hosts and serves the PWA. Free tier; availability dependent on GitHub's infrastructure.
- **Google Play Store:** Distributes the Android TWA. Subject to Google's policies, review processes, and Play Store terms.

### 3.4 API & Integrations

This app has no external API integrations. It makes no network requests at runtime; all data is local to the device.

There is no API exposed by this app.

This is by design. The app was explicitly constrained to zero external dependencies to ensure full offline functionality and to avoid introducing paid service dependencies. If future requirements include sharing calculation results with estimating software, project management platforms, or a web-based dashboard, an integration layer would need to be designed from scratch. The Web Share API (already on the High Priority roadmap) would be a low-cost first step toward sharing data to other apps on the device.

### 3.5 Data Model

This app has no database or server-side persistence. All data is transient or held in the browser's `localStorage`.

**localStorage keys:**

| Key | Type | Content | Max size |
|---|---|---|---|
| `workcalc-units` | String | `"metric"` or `"imperial"` | Trivial |
| `workcalc-history` | JSON array | Up to 20 history entries | ~10 KB typical |

**History entry structure:**
```json
{
  "module": "concrete",
  "label": "Concrete",
  "result": "0.54 m³  ·  54 bags (25 kg)",
  "formula": "Length × Width × Thickness: 3.00 m × 3.00 m × 60 mm ÷ 1,000 = 0.54 m³",
  "timestamp": 1753920000000
}
```

**Data flows:**
1. User enters dimensions → `app.js` reads input values → calls `module.calculate(inputs, unitSystem)` → renders result to DOM
2. User taps Copy → `app.js` copies text to clipboard → calls `history.add(entry)` → entry written to `localStorage`
3. User opens History tab → `app.js` calls `history.getAll()` → renders entries from `localStorage`
4. User taps unit toggle → `app.js` writes `unitSystem` to `localStorage` → re-renders active calculator

**Data retention:**
History entries persist until the user clears them or clears browser storage. There is no automatic expiry. The 20-entry cap prevents unbounded growth. No data is ever transmitted off-device.

**Canadian construction record-keeping note:** WorkCalc produces estimates only. If a user intends to retain a calculation as a project record (e.g. for a job file or quote), they must use the Copy result function to paste it into an external document. The app does not provide any record-keeping suitable for compliance or audit purposes.

### 3.6 Security

**Authentication:** None — by design. WorkCalc is a fully public utility with no user accounts, no login, and no personal data. There is nothing to authenticate.

**Authorisation:** Not applicable. All users have the same access: all calculators, all features.

**Sensitive data:** The app does not collect, transmit, or store any personally identifiable information (PII). The only data stored locally is the unit preference and calculation history — neither of which is sensitive.

**PIPEDA / Privacy:** Given that the app collects no personal data and has no backend, it has minimal PIPEDA exposure. There is no account creation, no email capture, no analytics, and no third-party SDKs. Google requires all Play Store apps to link to a privacy policy, even if the policy simply states that no data is collected. A privacy policy is now live at `https://BellowsAIS.github.io/WorkCalc/privacy.html`, satisfying this requirement.

**Quebec Law 25:** Not a current concern given the absence of personal data collection. If the app ever adds accounts or analytics, Quebec Law 25 obligations would need to be assessed.

**Client-side code exposure:** All application logic is visible in the browser's developer tools, since the app is fully client-side with no obfuscation. This is acceptable — there are no secrets in the code, and the calculation formulas are not proprietary in any commercially sensitive sense.

**Known risks:**
- `localStorage` is accessible to any JavaScript running in the same origin. Since there are no external scripts, no CDN calls, and no injected content, the attack surface here is minimal.
- The `document.execCommand('copy')` fallback in the copy handler is a legacy API. It works correctly but is deprecated. The modern `navigator.clipboard.writeText` path is used preferentially.

### 3.7 Additional Design Decisions & Rationale

**History only saves on "Copy result," not on every calculation**

Alternatives considered: auto-save on every keypress (too noisy — would fill history with in-progress partial calculations), auto-save when the result renders (would fill history with every intermediate result as the user types). The chosen approach — save only on explicit Copy — means history reflects decisions the user made deliberately, making it more useful as a reference for quotes and ordering. The tradeoff is that a user who forgets to copy loses the entry; this is documented in the user guide.

**Pure calculate() functions with no side effects**

All six calculator modules implement `calculate(inputs, unitSystem)` as a pure function. This was chosen over approaches where the calculator directly updates the DOM, because it makes the calculation logic independently verifiable and potentially testable. The rendering concern stays entirely in `app.js`. The tradeoff is a slightly more abstract module interface.

**Single CSS file, no preprocessor**

A single `css/main.css` was chosen over component-level styles, CSS modules, or a preprocessor like Sass. This keeps the styling simple, removes the build step, and keeps the entire style surface visible in one place. The tradeoff is that the file may become harder to navigate as the calculator count grows. The current size (for six calculators plus the shell) is manageable.

**No input validation beyond min=0**

The input fields use `min="0"` and `type="number"` but do not display user-facing validation messages for invalid inputs (negative numbers, letters, etc.). Invalid inputs simply produce no result (the `calculate()` functions return `null` for zero or missing required values, and the result card hides). This was chosen to avoid cluttering the mobile interface with error states during fast typing. The tradeoff is that a user who enters a genuinely invalid value gets no explanation — listed on the roadmap under High Priority as "Input validation with friendly error messages."

**Board feet always computed in nominal inches/feet regardless of unit toggle**

Board feet is a traditional imperial volumetric unit used universally in Canadian lumber trade, even on metric jobsites. Attempting to remap it to a metric equivalent would produce a result that no lumber supplier or tradesperson would recognise. The `unitSystem` toggle affects input labels and result units for all other calculators, but lumber board feet always inputs nominal inch dimensions and outputs board feet. The input hints explain this clearly to avoid user confusion.

### 3.8 Testing

#### Testing Approach

There is currently no automated test suite of any kind — no unit tests, no integration tests, no end-to-end tests, no CI pipeline. The calculation logic has been verified manually during development.

Given that the `calculate()` functions are pure functions with no side effects, they are straightforward to unit test. The absence of tests is a known gap, not an architectural barrier.

#### Critical Workflows to Test

Working backwards from what a real user would consider a failure:

1. **Concrete slab bag count is wrong** — A tradesperson orders 20 bags based on the app result and arrives on site 10 bags short. This is the highest-stakes failure: a wrong concrete bag count results in a wasted trip and project delay. Priority: test all three pour types (slab, footing, round pier) in both metric and imperial, at boundary bag-size thresholds (just under and just over a bag boundary).

2. **Stud count is off by one** — A framer orders studs based on the count and runs short on a long wall. The `floor(length / spacing) + 1` formula needs verification at common wall lengths and all three spacings, particularly where the wall length is an exact multiple of the spacing.

3. **Unit conversion gives a wrong result** — A user switches from metric to imperial mid-session and gets a nonsensical result. Test every calculator with the same physical dimensions entered in both unit systems and verify the results are equivalent.

4. **Waste factor is ignored or applied twice** — The waste-adjusted result must be exactly `base × (1 + waste/100)` and must not appear when waste is 0%.

5. **History does not save or becomes corrupted** — A user copies results throughout the day and finds history empty or garbled. Test `localStorage` read/write on all entry shapes, max-20 cap, and clear function.

6. **Service worker serves stale assets after an update** — A user on an older cached version of the app doesn't receive a bug fix. This requires manual testing of the cache invalidation flow whenever the cache key is updated.

7. **Concrete formula double-assignment bug** — In `js/calculators/concrete.js` at approximately line 22, the `formula` variable is assigned twice in succession inside the `else` branch:
   ```javascript
   formula = `${fmt(L)} m × ...`;   // ← this line is dead code
   formula = `Length × Width × ...`; // ← this overwrites the previous line immediately
   ```
   The first assignment is never used. The result is functionally correct (the second assignment is the right formula), but the dead code is misleading and should be removed.

**Who should validate test scenarios:** Active tradespeople are the right validators — not developers. A carpenter should verify that the stud count result matches what they'd order; a mason should verify the brick count; a roofer should verify the square and bundle count. The most valuable test data comes from real project measurements compared against the app's output.

#### Current Test Coverage

Zero. No automated tests exist.

#### Test Data Considerations

Good test data for this app should include:

- Common Canadian residential construction dimensions (e.g. 4" concrete slab, 2×4 stud walls at 16" o/c, standard 8' ceilings)
- Boundary conditions: zero inputs, very small values, very large values (e.g. a commercial pour)
- Round pier diameters at common sonotube sizes (8", 10", 12", 16")
- Stud wall lengths that are exact multiples of 400 mm and non-multiples
- Roofing at common Canadian pitches (4/12, 5/12, 6/12)
- Waste factor at 0% (waste row should not appear), 10% (default), and 50% (max)
- Switching unit systems mid-session with values already entered

### 3.9 Performance & Scalability

The app is a static single-page application with no network requests after the initial cache. Performance characteristics are dominated by the browser's own rendering speed, not by server round-trips or complex computation.

**Typical performance:**
- Cold load (first visit, no cache): time to load all assets from GitHub Pages (~15 cached files)
- Warm load (cached): effectively instant — all assets served from the service worker cache
- Live result calculation: imperceptible latency — the calculation functions are trivial arithmetic operations executing in under 1 ms in all cases

**Scalability:**
This app is not multi-user and has no server-side infrastructure to scale. GitHub Pages can serve the static assets to any number of concurrent users without configuration changes. The Play Store TWA has no server-side component.

**Known bottleneck:**
The service worker's `skipWaiting()` and `clients.claim()` calls ensure new versions are adopted immediately on install/activate rather than on the next navigation. In practice this is fast, but on a slow network the initial cache population (all 15 assets) may take several seconds. This is a one-time cost.

Performance and scalability are not current concerns for the app's intended audience and usage patterns. If the app were deployed in a high-traffic context or expanded to include server-side features, these would need to be revisited.

### 3.10 Known Issues & Limitations

| Issue | Details | Workaround | Roadmap? |
|---|---|---|---|
| Dead code in concrete formula | `concrete.js` ~line 22: `formula` is assigned twice; the first assignment is immediately overwritten and never used. No functional impact, but misleading. | None needed — output is correct. | Fix in next patch. |
| `manifest.json` version stale | `"version": "01.00.000"` — not updated since scaffold. | None — this field is informational only and does not affect functionality. | Fix in next patch. |
| `WorkCalc-Tech-Stack.md` stale content | ~~Still references old package ID `ca.renniesolutions.workcalc`; browser/device targets table lists Android 8.0 as minimum but twa-manifest.json sets minSdkVersion 21 (Android 5.0).~~ | ✅ Resolved — Tech Stack doc fully refreshed (package ID, Android SDK targets, module interface, file structure). | — |
| Superseded versioned files at root | `workcalc_v01_00_010.html`, `011.html`, and `012.html` are in both the repo root and `Archive/`. They should only be in `Archive/`. | No functional impact — `index.html` is the entry point. | Clean up per standards. |
| No input validation messages | Entering 0 or invalid values silently hides the result card with no explanation. | User enters valid values. | High Priority roadmap item. |
| History only saves on Copy | Calculations are not auto-saved. Users who forget to tap Copy lose the entry. | Tap Copy before navigating away. | By design; may reconsider. |
| No CI pipeline | CLAUDE.project.md lists GitHub Actions but no workflows exist. | Manual review process. | Address if project grows. |
| Branching rule discrepancy | CLAUDE.project.md says `feature/` prefix; CLAUDE.md says `claude/`. In practice `claude/` is used. | Use `claude/` prefix consistently. | Update CLAUDE.project.md. |
| Play Store not in production | App is in closed testing only. Production release pending screenshots and feature graphic. | Distribute via direct PWA install. | See PlayStore-Listing.md outstanding items. |
| No French support | App is English-only. | N/A | Future Enhancement on roadmap. |
| iOS not a primary target | App is installable via Add to Home Screen on iOS 16.4+ but is not in the Apple App Store. | Use browser Add to Home Screen. | Future Enhancement on roadmap. |
| No beam span calculator | Lumber module deliberately excludes span tables to avoid structural engineering liability. | Use the NRC span tables or engineered lumber manufacturer software. | Ideas Parking Lot (display-only reference table with prominent P.Eng disclaimer). |
| CHANGELOG double v01_00_000 | Two separate sections both labelled `v01_00_000` — one for UX features (conditional fields, hints, six calculators) and one for the initial scaffold. | Read both sections. | Clarify in next documentation pass. |

### 3.11 Changelog & Roadmap

#### Changelog

*(Reconstructed from `WorkCalc-CHANGELOG.md` and git history. The CHANGELOG has two `v01_00_000` sections — this is preserved below with clarifying notes.)*

| Version | Status | Summary |
|---|---|---|
| **v01_00_013** | Unreleased | Added About panel with full BAIS liability disclaimer, Ontario governing law notice, and company contact; added "Estimates only — verify before ordering" disclaimer to every result card; renamed company from Rennie Solutions to Bellows Applied Intelligence Solutions (BAIS) throughout; updated package ID in CLAUDE.project.md to `ca.bais.workcalc`; bumped service worker cache to `workcalc-v01_00_013` |
| **v01_00_012** | Unreleased | Fixed PWA install on GitHub Pages subpath: added `scope: "/WorkCalc/"` and corrected `start_url` to `/WorkCalc/` in manifest.json; prefixed all service worker ASSETS paths with `/WorkCalc/`; fixed service worker registration to use relative path `./service-worker.js`; bumped cache to `workcalc-v01_00_012` |
| **v01_00_011** | — | Blueprint blue visual rebrand: new colour palette `#082d56`, new tape measure + calculator icon, updated manifest.json theme and background colours, added SVG icon, bumped cache to `workcalc-v01_00_011` |
| **v01_00_010** | — | App renamed from CanCalc to WorkCalc: manifest, service worker cache key, localStorage keys, versioned HTML filename, CHANGELOG, ROADMAP, Documentation, CLAUDE.project.md all updated |
| **v01_00_000 (features)** | Unreleased | *(These entries appear under a second v01_00_000 heading in the CHANGELOG — likely misfiled during rapid development.)* Conditional field visibility; input hints on all 30+ fields; masonry calculator; roofing calculator; paint & coatings calculator; excavation calculator; lumber calculator (board feet and stud count, nominal sizing, wall height display, imperial stud spacing labels); concrete calculator (slab, footing/rectangular pier, round pier; 25/30 kg bags; metric and imperial) |
| **v01_00_000 (scaffold)** | — | Initial app scaffold: full UI shell, bottom navigation, manifest.json, service-worker.js, css/main.css, app.js, units.js, history.js, six calculator stubs (inputs defined, no calculate logic yet) |

**Android build history (separate from app versioning):**

| appVersionCode | appVersionName | Notes |
|---|---|---|
| 1 | 1.0.013 | Initial Play Store upload |
| 2 | 1.0.013 | — |
| 3 | 1.0.013 | Failed upload; code 3 consumed |
| 4 | 1.0.013 | — |
| 5 | 1.0.013 | — |
| **6** | 1.0.013 | Current; built with updated Bubblewrap targeting Android 16 (API 36) |

#### Roadmap

See `WorkCalc-ROADMAP.md` for the full tracked roadmap. Summary:

**Outstanding MVP items:**
- 📋 Bubblewrap TWA production release (currently in closed testing)
- 📋 Play Store listing finalisation (screenshots, feature graphic, privacy policy)
- 📋 Lumber calc: show board length in result summary for purchasing reference

**High Priority (post-MVP):**
- Input validation with friendly error messages for invalid inputs
- Web Share API integration (share result natively on Android)
- Accessibility audit (screen reader, contrast ratios, focus order)
- Onboarding screen for first-time users
- Favourite/pin a calculator

**Future Enhancements:**
- Saved projects (group calculations under a job name)
- Export history as CSV or plain text
- Additional calculator modules (drywall, flooring, insulation, paving)
- French language support
- iOS PWA distribution guidance

### 3.12 Contributing & Development Guidelines

**Branching:**
Per CLAUDE.md, branch names use the `claude/<short-description>` pattern (e.g. `claude/add-masonry-calc`). Note: CLAUDE.project.md says `feature/<short-description>` — treat CLAUDE.md as authoritative here; CLAUDE.project.md needs to be updated.

**Git workflow:**
1. Create a branch from up-to-date `main`
2. Commit in small, logical increments with descriptive messages explaining *why*
3. Push and open a PR immediately — do not accumulate uncommitted changes
4. Wait for explicit approval before merging

**Before every PR:**
- Bump the service worker cache version string in `service-worker.js` if any cached asset changed
- Verify the app opens and works in a browser
- Update `WorkCalc-CHANGELOG.md` with a meaningful entry for the version being changed
- If the app version changes, also update `WorkCalc-ROADMAP.md` and `twa-manifest.json` appVersionName

**Calculator module interface (required for new calculators):**
```javascript
export default {
  id: 'mymodule',           // unique string, matches nav tab id
  label: 'My Module',       // Canadian English display name
  defaultWasteFactor: 10,   // percent
  inputs: [
    {
      id: 'field-name',
      label: 'Field Label',
      hint: 'Plain-language explanation shown when ⓘ is tapped.',
      type: 'select' | undefined,   // omit for numeric inputs
      unit: { metric: 'm', imperial: 'ft' },  // for numeric inputs
      options: [...],               // for select inputs (or {metric:[...], imperial:[...]} for unit-aware selects)
      visibleWhen: { 'other-field-id': 'value' },  // optional conditional visibility
      min: 0,
    }
  ],
  calculate(inputs, unitSystem) {
    // Pure function — no side effects, no DOM access
    // Returns: { display, formula, wasteAdjusted } or null if inputs are insufficient
  },
};
```

**Getting oriented quickly:**
1. Read `CLAUDE.project.md` for project context, module specs, and UX requirements
2. Read `js/app.js` to understand how modules are rendered and wired to the UI
3. Read `js/calculators/concrete.js` as the reference implementation for a calculator module
4. Open `index.html` in a browser and use the app for a few minutes

---

## 4. Technicians

WorkCalc has no infrastructure to manage. The app is fully hosted on GitHub Pages (static file serving managed by GitHub) and distributed via the Google Play Store (managed by Google). There are no servers, no databases, no monitoring dashboards, and no scheduled jobs.

**Operational considerations:**

- **GitHub Pages outage:** If GitHub Pages is down, the app is unavailable to users who have not installed it (browser or Play Store). Users who have installed the PWA continue to have full offline functionality from the service worker cache.
- **Play Store updates:** Updates to the Android app require a local build using Bubblewrap (see `Documentation/Bubblewrap-Build-Guide.md`). There is no automated pipeline — each update is a manual build and upload. `appVersionCode` must be incremented on every upload.
- **Keystore backup:** The Android signing keystore (`twa/android.keystore`) is the single point of failure for Play Store updates. If it is lost, a Google key reset must be requested (a lengthy process with no guarantee of success). It must be kept backed up on at least two separate locations.
- **Service worker cache invalidation:** If a user reports seeing an old version of the app after a release, they may have a cached service worker still serving old assets. Advise them to: Settings → Apps → WorkCalc → Clear cache, then reload. Alternatively, opening the site in Chrome → DevTools → Application → Service Workers → Unregister, then reload.

---

## 5. Legal & Compliance

### 5.1 Licence & Legal

⚠️ *This section documents facts only. It has not been reviewed by a qualified legal professional and should not be treated as legal advice. The content below should be reviewed by a lawyer before the app is released to production or offered in a commercial context.*

**Ownership and licence:**
WorkCalc is proprietary software developed by Bellows Applied Intelligence Solutions (BAIS), Ontario, Canada. No open-source licence has been applied. The app is distributed as a free download with no source licence notice displayed to end users.

**Third-party licences:**
The app has zero third-party runtime dependencies. No open-source libraries are bundled, so there are no third-party licence obligations in the distributed app.

The Android build toolchain uses `@bubblewrap/cli` (Apache 2.0 licence), but this is a development tool only — it is not distributed with the app. Android SDK components used by Bubblewrap are subject to Google's Android SDK licence.

**Data handling and privacy:**
The app collects no personal data. No analytics, no crash reporting, no advertising SDKs, no account system. The only data stored is the user's unit preference and local calculation history, both in the device's own `localStorage`. No data is transmitted off the device.

**PIPEDA:** Given the absence of personal data collection, PIPEDA obligations are minimal. If the app is updated to include any user data collection (accounts, analytics, feedback), a formal PIPEDA assessment would be required.

**Google Play Store requirements:**
Google requires all Play Store apps to link to a privacy policy, regardless of whether they collect personal data. A privacy policy is now live at `https://BellowsAIS.github.io/WorkCalc/privacy.html`. The policy states that WorkCalc collects no personal data and explains the two on-device localStorage items (unit preference, calculation history). This satisfies Google's requirement.

**Liability:**
The app includes a disclaimer in the About panel and on every result card stating that results are estimates only, for planning purposes, and that BAIS is not liable for errors. This disclaimer is governed by the laws of the Province of Ontario. ⚠️ Whether this disclaimer is legally effective in limiting liability has not been assessed by a lawyer.

**Consumer protection:**
The app is free with no in-app purchases, no subscriptions, and no advertising. No consumer protection legislation specific to paid apps applies.

**Regulated use:**
The app explicitly excludes structural engineering calculations (beam spans, load capacity, etc.) and notes in the disclaimer that results should not be used in place of engineering review. The target audience is tradespeople doing material estimation, not licensed engineers performing structural analysis.

---

## 6. Related Documents & Resources

| Resource | Link / Location |
|---|---|
| Live app (PWA) | `https://BellowsAIS.github.io/WorkCalc/` |
| GitHub repository | `https://github.com/BellowsAIS/WorkCalc` |
| Google Play Console | `https://play.google.com/console` (requires BAIS account login) |
| Bubblewrap build guide | `Documentation/Bubblewrap-Build-Guide.md` |
| Play Store listing draft | `Documentation/PlayStore-Listing.md` |
| Original project brief | `Documentation/WorkCalc-Project-Brief.md` |
| Privacy policy | `https://BellowsAIS.github.io/WorkCalc/privacy.html` |
| Tech stack reference | `Documentation/WorkCalc-Tech-Stack.md` |
| Roadmap | `WorkCalc-ROADMAP.md` |
| Changelog | `WorkCalc-CHANGELOG.md` |
| Bubblewrap CLI docs | `https://github.com/GoogleChromeLabs/bubblewrap` |
| Digital Asset Links verifier | `https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://BellowsAIS.github.io&relation=delegate_permission/common.handle_all_urls` |
| PWA install criteria (Chrome) | `https://web.dev/articles/install-criteria` |

---

## 7. Glossary

| Term | Definition | Notes |
|---|---|---|
| **AAB (Android App Bundle)** | The file format used to submit Android apps to the Play Store. Bubblewrap produces `app-release-bundle.aab`. | Not the same as an APK, which is a direct install file. |
| **appVersionCode** | An integer required by the Play Store that must increment on every upload. Currently 6. | Distinct from the app's semantic version name (`appVersionName`). Play Store rejects uploads where the code has not increased. |
| **appVersionName** | A human-readable version string shown in the Play Store listing. Currently `"1.0.013"`. | Does not need to follow any particular format but is conventionally major.minor.patch. |
| **Bank volume** | The volume of soil or material in its undisturbed, in-ground state. | Contrasted with loose volume, which accounts for swell. |
| **Board feet** | A volumetric unit for lumber: 1 board foot = 1 foot × 1 foot × 1 inch thick. Always computed from *nominal* dimensions, not actual. | Used universally in Canadian lumber trade regardless of metric/imperial preference on the job. |
| **Bubblewrap** | Google's official CLI tool for wrapping a PWA as a Trusted Web Activity (TWA) Android app. | `@bubblewrap/cli`. Used to build the WorkCalc APK/AAB. |
| **Cache-first** | A service worker caching strategy where the service worker serves assets from the local cache, falling back to the network only if the asset is not cached. | WorkCalc uses this strategy for all assets, making it fully offline after first load. |
| **Conditional fields** | Input fields that show or hide automatically based on the selected calculation type. | E.g. the Width field hides when Round pier is selected in the Concrete calculator. |
| **IARC** | International Age Rating Coalition — the content rating system used by the Play Store. All apps require a rating before production release. | The questionnaire is completed inside Play Console. |
| **loose volume** | The volume of excavated material after it has been removed from the ground. Larger than bank volume due to swell. | `loose volume = bank volume × (1 + swell factor)` |
| **minSdkVersion** | The minimum Android API level the TWA app supports. Set to 21 (Android 5.0) in `twa-manifest.json`. | Affects who can install from the Play Store. Android 5.0+ covers all but very old devices. |
| **Nominal dimensions** | The stated (traditional) dimensions of lumber, e.g. "2×4". Nominal dimensions are larger than actual milled dimensions (a 2×4 is actually 1½" × 3½"). | The board-foot formula uses nominal dimensions; construction field references use nominal dimensions. |
| **On-centre (o/c)** | The spacing between structural members measured from the centre of one to the centre of the next. Common spacings: 300 mm (12"), 400 mm (16"), 600 mm (24"). | Sometimes written "on center" in American English. WorkCalc uses "on-centre." |
| **Pitch factor** | A multiplier applied to a roof's plan area to account for the actual sloped surface area. `pitch factor = √(rise² + run²) ÷ run`. | Used in the roofing calculator to convert plan area to actual roof area. |
| **Plan area** | The horizontal footprint area of a roof, as seen from directly above. | Smaller than actual roof area; the pitch factor converts between the two. |
| **Progressive Web App (PWA)** | A website that uses modern web APIs to behave like a native app: installable, offline-capable, and full-screen. | WorkCalc is a PWA served from GitHub Pages and wrapped as a TWA for the Play Store. |
| **Roof square** | A unit of roofing area equal to 100 square feet (9.29 m²). | Standard unit used by Canadian roofing suppliers to measure and price shingles. |
| **Swell factor** | The percentage by which excavated material expands when removed from the ground. | Presets: sand 10%, topsoil 15%, clay 25%, rock 50%. |
| **Trusted Web Activity (TWA)** | An Android mechanism that allows a PWA to be packaged and distributed through the Play Store as if it were a native app, running in Chrome rather than a WebView. | WorkCalc uses Bubblewrap to produce the TWA wrapper. |
| **Waste factor** | A percentage added to a calculated quantity to account for cuts, breakage, overlaps, and over-ordering buffer. | Default 10% across all calculators. Adjustable 0–50% per calculator. |

---

## 8. Appendices

### Appendix A — Calculator Constants Reference

| Calculator | Constant | Value | Source |
|---|---|---|---|
| Concrete | 25 kg bag yield | 0.010 m³ | Canadian industry standard |
| Concrete | 30 kg bag yield | 0.012 m³ | Canadian industry standard |
| Masonry | Standard brick (actual) | 190 × 90 × 57 mm | CSA A82 |
| Masonry | Standard block (actual) | 390 × 190 × 190 mm | CSA A165 |
| Masonry | Default mortar joint | 10 mm | Canadian standard practice |
| Roofing | 1 square | 9.29 m² (100 ft²) | Industry standard |
| Roofing | Bundles per square | 3 | Canadian standard for 3-tab shingles |
| Paint | Default spread rate | 10 m²/L (400 ft²/gal) | Typical interior latex |
| Paint | Door deduction | 1.9 m² | Standard Canadian interior door |
| Paint | Window deduction | 1.4 m² per window | Default; user-adjustable |
| Excavation | Sand swell | 10% | Standard estimating practice |
| Excavation | Topsoil swell | 15% | Standard estimating practice |
| Excavation | Clay swell | 25% | Standard estimating practice |
| Excavation | Rock swell | 50% | Standard estimating practice |

### Appendix B — Calculator Module Interface (Reference)

```javascript
export default {
  id: 'moduleid',              // String — matches nav tab id, localStorage key prefix
  label: 'Module Label',       // String — Canadian English display name
  defaultWasteFactor: 10,      // Number — default waste % (0–50)
  inputs: [
    {
      id: 'field-id',          // String — must be unique within this module
      label: 'Field Label',    // String — shown in the UI
      hint: '...',             // String — shown when ⓘ tapped (optional)
      type: 'select',          // Omit for numeric inputs; 'select' for dropdowns
      unit: {                  // For numeric inputs only
        metric: 'm',
        imperial: 'ft',
      },
      options: [               // For select inputs — array, or {metric:[...], imperial:[...]}
        { value: 'key', label: 'Display text' }
      ],
      visibleWhen: {           // Optional — hides field unless condition is met
        'other-field-id': 'required-value',       // single value
        'other-field-id': ['value1', 'value2'],   // multiple allowed values
      },
      min: 0,                  // Minimum value for numeric inputs
    }
  ],
  calculate(inputs, unitSystem) {
    // inputs: { [field-id]: number|string, waste: number }
    // unitSystem: 'metric' | 'imperial'
    // Returns: { display: string, formula: string, wasteAdjusted: string|null }
    //   or null if required inputs are missing/zero
  },
};
```

### Appendix C — Play Store Outstanding Items

*(From `Documentation/PlayStore-Listing.md`)*

- [ ] Screenshots — minimum 2, recommended 4–8 at 1080×1920 (16:9)
- [ ] Feature graphic — 1024×500 px PNG
- [ ] IARC content rating questionnaire (completed inside Play Console)
- [x] Privacy policy URL — live at `https://BellowsAIS.github.io/WorkCalc/privacy.html`
- [ ] Verify `asset_links.json` is live and TWA digital asset link passes verification

### Appendix D — Android Build Quick Reference

Full procedure: `Documentation/Bubblewrap-Build-Guide.md`

```
# Update CLI (run once when CLI version changes)
npm install -g @bubblewrap/cli

# Update Android project (run after CLI update or API target change)
cd C:\Users\mrenn\WorkCalc\twa
bubblewrap update

# Build signed AAB (run for every Play Store upload)
bubblewrap build
# → enter keystore password when prompted
# → output: twa/app-release-bundle.aab

# Before uploading:
# 1. Increment appVersionCode in twa/twa-manifest.json
# 2. Commit and push to repo
```
