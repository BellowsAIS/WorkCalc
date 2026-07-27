# Bubblewrap-Build-Guide.md — WorkCalc TWA

**Purpose:** Build a signed Android App Bundle (AAB) for Play Store submission using Bubblewrap.

**Prerequisites on your local machine:**
- Node.js 18 or later (`node --version`)
- Java JDK 11 or later (`java -version`)
- ~2 GB free disk space (Bubblewrap downloads the Android SDK automatically)

---

## One-time setup

### 1. Install Bubblewrap CLI

```bash
npm install -g @bubblewrap/cli
```

### 2. Clone the WorkCalc repo locally (if you haven't already)

```bash
git clone https://github.com/MaestroMRRennie/WorkCalc.git
cd WorkCalc
```

---

## Build the Android project

### 3. Initialise the TWA project

Run this from inside the `twa/` folder. Bubblewrap will download the Android SDK on first run — this takes a few minutes.

```bash
cd twa
bubblewrap init --manifest https://maestromrrennie.github.io/WorkCalc/manifest.json
```

When prompted, accept the pre-filled values (they come from `twa-manifest.json`). The only prompts you need to fill in are:

| Prompt | Value |
|---|---|
| Key store password | Choose a strong password — **write it down and keep it safe** |
| Key password | Same as above (or a different one — both are needed to build future updates) |

Bubblewrap generates `android.keystore` in the `twa/` folder. **Back this file up immediately** — if you lose it you cannot update the app on Play Store without requesting a key reset from Google. Do not commit it to git.

### 4. Build the signed AAB

```bash
bubblewrap build
```

This produces `app-release-signed.aab` in the `twa/` folder. This is the file you upload to Play Console.

---

## Upload to Play Store

### 5. Create the release in Play Console

1. Go to [play.google.com/console](https://play.google.com/console) and open the WorkCalc app
2. Go to **Release → Production → Create new release**
3. Under **App bundles**, click **Upload** and select `app-release-signed.aab`
4. Set the release name to `1.0.013`
5. Fill in the release notes (e.g. "Initial release")
6. Click **Save**, then **Review release**, then **Start rollout to Production**

---

## Future updates

When you release a new version of WorkCalc:

1. Bump `appVersionCode` (integer, increment by 1) and `appVersionName` (e.g. `"1.0.014"`) in `twa/twa-manifest.json`
2. Run `bubblewrap build` from the `twa/` folder (you will be prompted for your keystore password)
3. Upload the new `app-release-signed.aab` to Play Console as a new release

---

## Key files

| File | Location | Notes |
|---|---|---|
| Bubblewrap config | `twa/twa-manifest.json` | Committed to repo — safe |
| Android keystore | `twa/android.keystore` | **Never commit — back up separately** |
| App bundle output | `twa/app-release-signed.aab` | Ephemeral build output — not committed |
| Asset links | `maestromrrennie.github.io/.well-known/assetlinks.json` | Already live |

---

## Troubleshooting

**"Digital asset link verification failed"** — wait 10–15 min after pushing `assetlinks.json`; GitHub Pages can be slow to deploy. Verify with:
```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://maestromrrennie.github.io&relation=delegate_permission/common.handle_all_urls
```

**"App not verified" bar appears in TWA** — the SHA-256 fingerprint in `assetlinks.json` must match the Play Store signing key (not the upload key). Confirm the fingerprint in Play Console under **Setup → App integrity → App signing key certificate**.

**Build fails with SDK errors** — run `bubblewrap doctor` to diagnose SDK/JDK issues.
