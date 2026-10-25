# AI usage record

If maintaining this record, briefly document the actual contributions of whichever AI tools you use at Devin Hack Kochi. Add a row after each meaningful task or milestone. Keep summaries concise and omit secrets, private data, and full chat transcripts.

## Event build log

## 2026-10-25T04:55:00+05:30 — Add project owner and repository details

- Tool: Codex.
- Task: record the participant name, GitHub handle, repository URL, and contribution in the submission template.
- Affected files: `SUBMISSION.md`, `CHANGELOG.md`.
- Human review: pending.
- Validation: reviewed the updated submission fields and repository link.

## 2026-10-25T04:50:00+05:30 — Complete README and submission documentation

- Tool: Codex.
- Task: align README and submission documentation with the repository template and implemented Firebase leaderboard flow.
- Affected files: `README.md`, `SUBMISSION.md`, `CHANGELOG.md`.
- Human review: pending.
- Validation: reviewed Markdown links and checked documented commands against `package.json`.

## 2026-10-25T04:45:00+05:30 — Add public leaderboard home view

- Tool: Codex.
- Task: add a public top-10 leaderboard entry point to the home/setup screen.
- Affected files: `index.html`, `main.js`, `style.css`, `README.md`, and `CHANGELOG.md`.
- Human review: pending.
- Validation: production build and whitespace checks passed.

## 2026-10-25T04:39:07+05:30 — Add Firebase score saving and leaderboard

- Tool: Codex.
- Task: add opt-in score saving with player names and a top-10 Firestore leaderboard, using bounded reads and create-only rules.
- Affected files: `firebase.js`, `firestore.rules`, `index.html`, `main.js`, `style.css`, `README.md`, and package manifests.
- Human review: pending.
- Validation: production build and whitespace checks passed; Firebase rules deployment and live browser save are still pending.

## 2026-10-25T04:40:00+05:30 — Shift palette to blue and yellow

- Tool: Codex.
- Task: change the game palette to electric blue and yellow while keeping the opening speed fast.
- Affected files: `style.css`, `game.js`, `CHANGELOG.md`.
- Human review: pending.
- Validation: production build and whitespace checks passed.

## 2026-10-25T04:34:00+05:30 — Increase run pace and time-based difficulty

- Tool: Codex.
- Task: make the game start faster, accelerate with survival time, and keep left wink as the sole temporary speed boost.
- Affected files: `game.js`, `CHANGELOG.md`.
- Human review: pending.
- Validation: production build and whitespace checks passed.

## 2026-10-25T04:28:00+05:30 — Restyle obstacle gates

- Tool: Codex.
- Task: replace flat red blocks with more distinctive neon hazard gate visuals.
- Affected files: `game.js`, `CHANGELOG.md`.
- Human review: pending.
- Validation: production build and whitespace checks passed.

## 2026-10-25T04:22:00+05:30 — Add active-play feedback and arena motion

- Tool: Codex.
- Task: respond to an active-game screenshot by improving HUD fit, animation, contrast, and gesture feedback.
- Affected files: `index.html`, `style.css`, `main.js`, `game.js`, `CHANGELOG.md`.
- Human review: pending.
- Validation: production build and whitespace checks passed; visual browser review remains pending.

## 2026-10-25T04:14:03+05:30 — Improve game UI and UX

- Tool: Codex.
- Task: redesign the game onboarding and in-game interface for clearer hierarchy, feedback, and responsive behavior.
- Affected files: `index.html`, `style.css`, `main.js`, `game.js`, and `CHANGELOG.md`.
- Human review: pending.
- Validation: production build and whitespace checks passed; manual camera/device review remains pending.

## 2026-10-24T22:40:00+05:30 — Transfer and rebrand application

- Tool: Codex.
- Task: copy the existing game into SleepyDev and rebrand it as Sleepy Dev.
- Affected files: application files in the repository root, `README.md`, and `CHANGELOG.md`.
- Human review: pending.
- Validation: installed dependencies and verified the Vite production build succeeds; browser runtime review remains pending.

No participant AI usage has been recorded yet. Replace the placeholder row as you build. Mark human review as pending until someone has reviewed the contribution.

| Date and time with timezone | Tool / model, if known | Task | Assistance and affected files | Human review / corrections | Validation and result |
| --- | --- | --- | --- | --- | --- |
| TODO | Tool / model used, if any | TODO | TODO | Pending | TODO |

## Template preparation

This historical preparation note refers to the older template. It does not define Devin Hack Kochi's event rules or AI tool requirements.

On 10 October 2026, Codex prepared this documentation template from the organizer's supplied rules and checked the linked Luma page for the event name and dates. This covered `README.md`, `RULES.md`, `AGENTS.md`, `CHANGELOG.md`, `AI_USAGE.md`, `SUBMISSION.md`, `.gitignore`, and the pull request checklist. Agent validation covered local links, event consistency, required documents, and diff whitespace; organizer review is pending.

This preparation is separate from participant project implementation and participant AI usage during the event.

## Event documentation correction — 2026-10-24T21:53:05+05:30

- Tool: Codex.
- Task: correct the organizer-shared template to Devin Hack Kochi and clarify
  that the event has no major AI usage constraints.
- Affected files: `.github/pull_request_template.md`, `AGENTS.md`, `AI_USAGE.md`, `CHANGELOG.md`, `README.md`, `RULES.md`, `SUBMISSION.md`.
- Human review: pending maintainer review of this pull request.
- Validation: documentation diff, whitespace, and local Markdown link checks;
  no application code changed and no runtime checks were needed.
