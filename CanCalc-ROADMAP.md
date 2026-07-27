# cancalc-ROADMAP.md

**Version:** v01_00_000

Status markers: 💡 Idea · 📋 Planned · 🔄 In Progress · ✅ Done

---

## MVP

The minimum set of features required for a usable v1 Play Store release.

- ✅ Project scaffold — folder structure, `index.html` shell, `manifest.json`, `service-worker.js`
- ✅ App shell — bottom navigation bar, global imperial/metric toggle, localStorage persistence
- ✅ Concrete calculator — slab volume, footing/pier volume, bag count (25 kg and 30 kg)
- ✅ Lumber & framing calculator — board feet, stud count (12"/16"/24" o/c), nominal vs actual sizing
- ✅ Masonry calculator — brick and block count, mortar volume, opening deductions
- ✅ Roofing calculator — roof squares, shingle bundles, rafter length, ridge length
- ✅ Paint & coatings calculator — wall area, litres per coat, door/window deductions, coat count
- ✅ Excavation calculator — cut/fill volume, truck load count, swell factor presets
- 📋 Waste factor field on every calculator (default 10%, range 0–50%)
- 📋 Live result updates on every keystroke (no submit button)
- 📋 Formula display beneath every result (plain language)
- 📋 Copy result to clipboard (plain text, suitable for quotes/emails)
- 📋 Calculation history — last 20 results, stored in localStorage
- 📋 Full offline support via cache-first service worker
- 📋 Dark mode via `prefers-color-scheme`
- 📋 Bubblewrap TWA build — signed APK/AAB for Play Store submission
- 📋 Play Store listing — description, screenshots, content rating
- 📋 Branding update — app name, logo, icon design, colour scheme, and typography refresh

---

## High Priority

Important features to add shortly after v1 ships.

- 💡 Share result via Web Share API (in addition to copy-to-clipboard)
- 💡 Favourite/pin a calculator to always appear first
- 💡 Input validation with friendly error messages (e.g. negative dimensions)
- 💡 "Clear all" button per calculator
- 💡 Onboarding screen — brief tour for first-time users
- 💡 App icon and splash screen polished for Play Store guidelines
- 💡 `asset_links.json` verified and TWA digital asset link working correctly
- 💡 Accessibility audit — screen reader labels, contrast ratios, focus order

---

## Future Enhancements

Worthwhile additions once the core is stable.

- 💡 Saved projects — group a set of calculations under a job name
- 💡 Export calculation history as CSV or plain-text email
- 💡 Additional calculator modules — drywall, flooring, insulation, paving
- 💡 Metric-only mode with no imperial option (for users who never switch)
- 💡 Custom spread rate library — save frequently used paint/coating rates by name
- 💡 iOS PWA distribution (Add to Home Screen guidance in-app)
- 💡 French language support (Canadian bilingual option)

---

## Ideas Parking Lot

Not committed — needs more thought before deciding.

- 💡 QR code sharing — share a calculation result as a scannable code on site
- 💡 Photo attachment on a history entry — snap the site condition with the calc
- 💡 Simple material cost estimator — user enters unit price, app multiplies by quantity
- 💡 Beam span lookup table — reference only, with clear P.Eng disclaimer
- 💡 iPad / tablet layout — wider two-column layout for larger screens
- 💡 Apple App Store release (requires separate Xcode build pipeline)
