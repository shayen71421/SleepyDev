# Sleepy Dev

Sleepy Dev is a hands-free browser arcade game controlled with facial gestures. Blink both eyes to flip gravity, wink with the right eye to shoot, and wink with the left eye to trigger a short speed boost.

**[Event rules](RULES.md)** · **[Agent instructions](AGENTS.md)**

## Event details

Devin Hack Kochi has no major AI usage constraints. Participants may use Devin and other AI tools, models, and providers; this template does not require Codex or restrict AI usage to OpenAI. AI usage notes are project documentation, not an additional event eligibility requirement.

The organizer shared an older event template. Follow the current organizer announcements for logistics, participation format, eligibility, submission timing, and credits; the older template's details do not apply. See [RULES.md](RULES.md).

## Project

- **Project name:** Sleepy Dev
- **Short description:** A webcam-powered, hands-free survival game that turns blinks and winks into gameplay controls.
- **Technology stack:** Vite, Phaser, MediaPipe Face Mesh, browser webcam APIs, and vanilla JavaScript.

### Run the project

1. Install a current Node.js release.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the local URL shown by Vite and allow webcam access.
5. Build for production: `npm run build`

### Current status

- Working features: webcam calibration, blink gravity control, wink shooting, speed boost, obstacles, enemies, scoring, restart flow, and a responsive onboarding/game HUD with persistent gesture guidance.
- Known limitations: camera permission and a well-lit face are required; audio files in `public/assets` are placeholders and are not currently wired into gameplay.
- Libraries and APIs used: Phaser, MediaPipe Face Mesh, Firebase Firestore, and `navigator.mediaDevices.getUserMedia`.

### Leaderboard setup

The game uses the public Firebase Web configuration in `firebase.js` and reads at most ten leaderboard documents only when the public leaderboard or game-over screen opens. Saving a score performs one Firestore write, then one bounded refresh. Create the `sleepy-dev-scores` collection in the Firebase project and publish [firestore.rules](firestore.rules) before demoing the leaderboard. The rules allow public reads and validated score creation, but no updates or deletes.

See [AI_USAGE.md](AI_USAGE.md) for AI assistance and [CHANGELOG.md](CHANGELOG.md) for the development record.
