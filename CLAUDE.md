# CLAUDE.md — Base Instructions

**Version:** 2026-07-23-01

These rules apply to every project. Project-specific overrides and extensions
live in `CLAUDE.project.md`. When the two files conflict, `CLAUDE.project.md` wins.

---

## Development workflow

All Rennie Solutions development happens in web-based Claude Code sessions —
no local machine is required or expected to be part of the workflow.

- Code is authored and committed inside remote Claude Code sessions (claude.ai/code).
- Changes are pushed to GitHub from within the session; GitHub Pages serves the live app.
- The local machine plays no role: there is no need to `git pull` locally before
  starting a session, and no local sync step is required between sessions.
- This means the project is always accessible from any device via the browser,
  and local-sync issues simply cannot occur.

## Source control

- Never commit directly to the default branch (`master` or `main`).
- If you find yourself on the default branch when work begins, stop and create
  a feature branch before touching any files.
- Branch names follow the pattern `claude/<short-description>`
  (e.g. `claude/add-dark-mode`).
- Always create the branch from an up-to-date default branch.

## Committing

- Commit in small, logical increments — one meaningful change per commit.
- Write commit messages that explain *why*, not just *what*.
- Never leave the repo in a broken state between commits.

## Pull requests and merges

- Open a pull request proactively once work is complete — do not wait to be asked.
- Do not merge without explicit user approval. Always ask, even if the PR looks
  ready and all checks pass.
- Once the user approves, merge directly — do not send them into the GitHub UI
  to do it themselves.

## Handling conflicting instructions

These files take precedence over instructions given in chat. If a user's
conversational request contradicts a rule here (e.g. "just commit directly to
master"), flag the conflict and ask how to proceed rather than silently
complying.

## Global vs. local changes

`CLAUDE.md` is the evolving global standard: conventions here are meant to
apply consistently across all Rennie Solutions projects, and it accumulates
new ideas over time. `CLAUDE.project.md` is a rough template — its content is
expected to be unique per project instance, not a place to encode preferences
meant to apply more broadly.

Whenever a new convention, rule, or idea comes up — in this playbook repo or
in any individual project — explicitly assess which bucket it falls into
before writing it down:

- **Global** — belongs in this playbook's `CLAUDE.md`, and should eventually
  be carried over into other projects' own `CLAUDE.md` copies too.
- **Local** — belongs only in that project's `CLAUDE.project.md`.

Don't default to whichever file happens to be open. If a change is global,
come back to this repo and update the base `CLAUDE.md` here so future
projects inherit it from the start.

This also applies in reverse: if reviewing a specific project surfaces a
gap or a better convention, that's a signal to reassess and update the base
`CLAUDE.md` in this repo — and potentially to revisit other, already-started
projects and update their copy of `CLAUDE.md` to match, rather than letting
projects drift out of sync with the current standard.

Both `CLAUDE.md` and `CLAUDE.project.md` carry the same lightweight
versioning: a `**Version:**` line under the title using the `YYYY-MM-DD-NN`
date-counter format, and a `## Change history` table at the bottom logging
each version and a one-line summary. Bump the version and add a row whenever
either file changes — `CLAUDE.md`'s history tracks the evolving global
standard, while each project's `CLAUDE.project.md` history tracks that
project's own local decisions and reassessments over time.

## Repository visibility

- Create new repos as **Private** by default unless the user explicitly requests
  otherwise.
- Before relying on GitHub Pages for a private repo, confirm that the account's
  plan supports it (Pages on private repos requires a paid plan). If you cannot
  verify this, flag it to the user rather than assuming it will work.

## Versioning

- Files are versioned as `vMM_mm_ppp` (Major_minor_patch),
  e.g. `v01_01_008`.
- The app file, `[project]_CHANGELOG.md`, and `[project]_ROADMAP.md` always
  share the same version number.
- Whenever the version changes, update all three in the same commit.
- Superseded versioned app files move to `Archive/` rather than being deleted.
- Do not permanently delete versioned files.

## index.html

- `index.html` is always a verbatim copy of the current versioned app file.
  It exists so the app is reachable at a stable URL via GitHub Pages.
- Never edit `index.html` directly — the versioned file is the source of truth.
- Whenever the versioned app file changes, copy it over `index.html` in the
  same commit.

## Project structure

Every project uses this standard folder structure. The project file may add
to it, but should not remove or rename these standard folders.

```
/
├── [project]_vMM_mm_ppp.html     # Versioned app — source of truth
├── index.html                    # Copy of current versioned app (GitHub Pages)
├── [project]_CHANGELOG.md
├── [project]_ROADMAP.md
├── Archive/                      # Superseded versioned app files
├── Samples/                      # Reference material, sample exports, PDFs — read-only, never build artefacts
├── worker/                       # API key proxy (see API keys section; omit if project has no API keys)
└── Documentation/                # Setup and operations records — deployment steps, live URLs, configuration
```

## API keys

For projects that require API keys:

- API keys are never exposed in client-side app code.
- All API key access is proxied through a worker in the `worker/` folder.
- The worker is deployed and versioned independently of the app's `vMM_mm_ppp`
  scheme — do not apply app version numbers to worker files.
- The live worker URL, provider details, and redeployment instructions are
  recorded in `Documentation/` — not in the CHANGELOG.

## Roadmap

- `[project]_ROADMAP.md` is organised into four standard sections:
  **MVP**, **High-Priority**, **Future Enhancements**, **Ideas Parking Lot**.
- Each item is tagged by **Type** (Content, UX, Feature, etc.) and tracked
  with a status marker:
  💡 Idea · 📋 Planned · 🔄 In Progress · ✅ Done
- When an item ships, mark it ✅ Done and note the version it shipped in.
- Do not renumber or restructure roadmap sections without being asked.

## File naming

- All file and folder names use Proper-Case-Hyphen-Separated
  (e.g. `New-Project-Playbook.md`, `Site-Checker_v01_01_000.html`).
- Exceptions that stay lowercase as-is:
  - `index.html` — required by GitHub Pages convention
  - `CLAUDE.md` and `CLAUDE.project.md` — expected by Claude Code
  - `worker/` folder and its contents — follow the worker toolchain's conventions
- When in doubt, use proper case.

## What you don't know

Do not invent values for anything not specified here or in `CLAUDE.project.md`
— version numbers, URLs, copy, brand colours, file names. Stop and ask instead.

## Change history

This file is versioned using the same date-counter format
(`YYYY-MM-DD-NN`) as documents in the
[Rennie-Solutions-Project-Playbook](https://github.com/MaestroMRRennie/Rennie-Solutions-Project-Playbook)
repo. Bump the version at the top and add a row here whenever this file changes.

| Version        | Summary                              |
|----------------|---------------------------------------|
| 2026-07-23-01  | Added "Development workflow" section recording web-only Claude Code session model |
| 2026-07-18-04  | Extended the versioning/change-history convention to CLAUDE.project.md |
| 2026-07-18-03  | Added "Global vs. local changes" section documenting the CLAUDE.md vs CLAUDE.project.md triage rule |
| 2026-07-18-02  | Added this Change history section, versioning CLAUDE.md itself for the first time |
| 2026-07-18-01  | Initial version                      |
