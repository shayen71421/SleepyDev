# Change log

## 2026-10-25T04:45:00+05:30 — Add public leaderboard home view

- Changed: added a public leaderboard modal linked from the setup screen, reusing the cached top-10 Firestore query in `index.html`, `main.js`, and `style.css`.
- Why: let visitors browse community scores before starting a game.
- Validation: `npm run build` and `git diff --check` passed.
- Limitations: the live board requires the Firebase Firestore rules to be published.

## 2026-10-25T04:39:07+05:30 — Add Firebase score saving and leaderboard

- Changed: added a post-run save prompt, player name form, bounded top-10 leaderboard, Firebase Firestore integration, and restrictive create-only rules in `index.html`, `main.js`, `firebase.js`, and `firestore.rules`.
- Why: let players opt in to saving their score while keeping reads capped at ten documents and preventing score edits/deletes through the client rules.
- Validation: `npm run build` and `git diff --check` passed.
- Limitations: Firestore rules must be published in the Firebase console before remote saving works.

## 2026-10-25T04:40:00+05:30 — Shift palette to blue and yellow

- Changed: replaced red obstacle visuals and orange enemies with an electric-blue and warm-yellow palette, while increasing the opening pace and left-wink boost in `style.css` and `game.js`.
- Why: create a more cohesive, energetic visual identity and make the run feel fast immediately.
- Validation: `npm run build` and `git diff --check` passed.
- Limitations: webcam playtest is still recommended for difficulty tuning.

## 2026-10-25T04:34:00+05:30 — Increase run pace and time-based difficulty

- Changed: raised starting obstacle/enemy speeds, added elapsed-time acceleration, tightened spawn intervals during longer runs, and made left-wink boost temporary and reversible in `game.js`.
- Why: give the run immediate momentum and ensure surviving always gets faster; left wink remains the only speed-boost gesture.
- Validation: `npm run build` and `git diff --check` passed.
- Limitations: final tuning still benefits from a real webcam playtest.

## 2026-10-25T04:28:00+05:30 — Restyle obstacle gates

- Changed: replaced flat red obstacle rectangles with layered neon hazard gates featuring a dark core, glowing rails, warning bands, and beveled edges in `game.js`.
- Why: make obstacles feel like intentional game objects and improve their visual readability during fast play.
- Validation: `npm run build` and `git diff --check` passed.
- Limitations: obstacle styling has not yet been manually reviewed at every viewport size.

## 2026-10-25T04:22:00+05:30 — Add active-play feedback and arena motion

- Changed: fixed top HUD overflow, added animated ambient grid/stars, brighter game textures, gesture feedback banners, and subtle HUD/modal motion in `game.js`, `main.js`, and `style.css`.
- Why: make active play feel responsive and visually legible instead of flat and static.
- Validation: `npm run build` and `git diff --check` passed.
- Limitations: gesture feedback and camera framing still need a manual browser/device check.

## 2026-10-25T04:14:03+05:30 — Refresh game UI and onboarding UX

- Changed: redesigned the calibration, instructions, game HUD, webcam preview, settings panel, and game-over screen in `index.html` and `style.css`; improved score/tracking updates in `main.js` and `game.js`.
- Why: make the game easier to understand at a glance, give gesture controls persistent visibility, and create a more polished arcade presentation across desktop and mobile.
- Validation: `npm run build` passed; `git diff --check` passed.
- Limitations: browser camera and gesture interactions still need a manual device check in a well-lit environment.

## 2026-10-24T22:40:00+05:30 — Add Sleepy Dev game

- Changed: copied the Blind Diving browser game into this hackathon repository and rebranded it as Sleepy Dev.
- Why: turn the repository template into a runnable project for the hackathon.
- Scope: added the Vite/Phaser app, face tracking, game UI, styling, and public assets; removed unused default Vite starter files.
- Validation: installed dependencies with `npm install --no-audit` and verified `npm run build` succeeds.
- Limitations: the checked-in MP3 files are invalid 404 HTML placeholders and audio is not yet connected to the game.

## 2026-10-24T21:53:05+05:30 — Correct Devin Hack Kochi event guidance

- Changed: corrected the current event name and AI tool guidance in `.github/pull_request_template.md`, `AGENTS.md`, `AI_USAGE.md`, `CHANGELOG.md`, `README.md`, `RULES.md`, `SUBMISSION.md`.
- Why: the organizer shared an older event template; Devin Hack Kochi has no
  major AI usage constraints and the template must not require a particular AI provider.
- Scope: preserved project implementation and historical assistance records.
- Removed obsolete template logistics, participation limits, and credit promises; current organizer instructions remain authoritative.
- Validation: reviewed documentation diffs, checked whitespace with `git diff --check`, and checked local Markdown links for new breakage.
- Limitations: maintainer review is pending; application tests were not run for this documentation-only correction.

Record each meaningful project change during the event, newest first. Update this file in the same commit as the change. Use a real timestamp with timezone, for example `YYYY-MM-DDTHH:MM:SS+05:30`.

## Event build log

No project implementation has been recorded yet. Replace this sentence with entries as you build:

```text
## <actual timestamp> — <short change title>

- Changed: <feature or files changed>
- Why: <reason for the change>
- Validation: <commands or manual checks actually run, with results>
- Limitations: <known issues or "None identified in these checks">
```

## Template setup — 10 October 2026

- Changed: Added the event README, rules, agent guide, change log, AI usage record, submission checklist, Git ignore rules, and pull request checklist.
- Why: Give participants a consistent starting point for event rules, basic coding patterns, documented changes, and regular commits.
- Validation: Checked local Markdown links, event detail consistency, required documents, and diff whitespace before publishing.
- Limitations: Documentation scaffolding only; no participant project, application, or working demo is included. GitHub publication and template status are verified separately after creation.
