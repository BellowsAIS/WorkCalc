# CanCalc — Construction Calculators

A mobile-first Progressive Web App (PWA) for Canadian construction tradespeople. CanCalc provides fast, offline-capable calculators for common on-site quantity and material estimation tasks — no login, no internet connection required after first load.

Available on Android via the Google Play Store, and installable directly from any browser as a standard PWA.

---

## Calculators

| Module | What it calculates |
|---|---|
| **Concrete** | Slab volume, footing/pier volume, bag count (25 kg and 30 kg Canadian standard bags) |
| **Lumber & Framing** | Board feet, stud count (12"/16"/24" o/c), nominal vs actual sizing |
| **Masonry** | Brick and block count, mortar volume, opening deductions (standard Canadian brick and block dimensions) |
| **Roofing** | Roof squares, shingle bundle count, rafter length, ridge length |
| **Paint & Coatings** | Wall area, litres per coat, door and window deductions, coat count |
| **Excavation** | Cut/fill volume, truck load count, swell factor presets (sand, clay, rock, topsoil) |

---

## Features

- **Live results** — updates on every keystroke, no submit button
- **Imperial/metric toggle** — switch units globally, persists between sessions
- **Waste factor** — adjustable per calculator (default 10%)
- **Formula display** — plain-language formula shown beneath every result
- **Calculation history** — last 20 results saved locally
- **Copy to clipboard** — plain-text summary ready to paste into a quote or email
- **Full offline support** — cache-first service worker, works with no connection
- **Dark mode** — respects `prefers-color-scheme`
- **Canadian English** throughout — metres, litres, millimetres

---

## Tech stack

Vanilla HTML5, CSS3, and JavaScript (ES6+) — no frameworks, no build step, no external dependencies. Opens directly in a browser. Distributed as a TWA on Android via Bubblewrap.

---

## Status

Under active development. See [`CanCalc-ROADMAP.md`](CanCalc-ROADMAP.md) for what's planned and [`CanCalc-CHANGELOG.md`](CanCalc-CHANGELOG.md) for version history.
