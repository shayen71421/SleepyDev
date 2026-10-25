# Sleepy Dev

Sleepy Dev is a hands-free browser arcade game controlled with facial gestures. Blink both eyes to flip gravity, wink with the right eye to shoot, and wink with the left eye to trigger a short speed boost. Survive the neon hazard gates, shoot yellow enemies, and submit your best run to the public top-10 leaderboard.

**[Event rules](RULES.md)** · **[Agent instructions](AGENTS.md)**

## Event details

Devin Hack Kochi has no major AI usage constraints. Participants may use Devin and other AI tools, models, and providers. Follow the organizers' current announcements for logistics, participation format, eligibility, submission timing, and credits. See [RULES.md](RULES.md).

## Project

- **Project name:** Sleepy Dev
- **Short description:** A webcam-powered, hands-free survival game that turns blinks and winks into gameplay controls.
- **Technology stack:** Vite, Phaser, MediaPipe Face Mesh, Firebase Firestore, browser webcam APIs, and vanilla JavaScript.

## Run locally

1. Install Node.js 22 or newer.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the local URL shown by Vite in a browser with webcam support.
5. Allow camera access when prompted.
6. Build for production with `npm run build`.

For a production-like local preview, run `npm run build` followed by `npm run preview`.

## Demo walkthrough

1. Open the home screen and optionally select **View public leaderboard**.
2. Allow camera access, select **Start calibration**, and blink naturally five times.
3. Review the gesture guide and select **Start the run**.
4. Blink to flip gravity, right-wink to fire, and left-wink to activate the temporary speed boost.
5. After a crash, choose whether to save the score, enter a name, and review the top 10.

### Current status

- Working features: webcam calibration, blink gravity control, wink shooting, left-wink speed boost, time-based difficulty ramp, neon obstacles, enemies, scoring, restart flow, responsive onboarding, public leaderboard, and persistent gesture guidance.
- Known limitations: camera permission and a well-lit, centered face are required; audio files in `public/assets` are placeholders and are not wired into gameplay; Firestore rules must be published for live score saving; public score creation can still receive spam without server-side moderation.
- Libraries and APIs used: [Phaser](https://phaser.io/), [MediaPipe Face Mesh](https://github.com/google-ai-edge/mediapipe), [Firebase Firestore](https://firebase.google.com/docs/firestore), and [`navigator.mediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia).

### Leaderboard setup

The game uses the public Firebase Web configuration in `firebase.js` and reads at most ten leaderboard documents only when the public leaderboard or game-over screen opens. Saving a score performs one Firestore write, then one bounded refresh. Create the `sleepy-dev-scores` collection in the Firebase project and publish [firestore.rules](firestore.rules) before demoing the leaderboard. The rules allow public reads and validated score creation, but no updates or deletes. No environment variables are required by the current hardcoded Firebase web configuration.

AI assistance was used during development. The submitted repository preserves the implementation history in Git commits.
