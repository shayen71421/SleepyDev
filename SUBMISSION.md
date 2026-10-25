# Project submission

Use this file to prepare the project submission through the method announced by the organizers.

## Project

- **Project name:** Sleepy Dev
- **Short description:** A webcam-powered, hands-free survival arcade game where facial gestures control gravity, shooting, and speed. Players can submit scores to a public top-10 leaderboard.
- **Code repository URL:** https://github.com/shayen71421/SleepyDev
- **Final submitted implementation commit SHA:** `3c2c0b3b0a78a19139a0811cbadc46ef67205c82`
- **Working demo URL or local demo steps:** [https://sleepy-dev-five.vercel.app/](https://sleepy-dev-five.vercel.app/) — or run `npm install`, then `npm run dev`, open the Vite URL, and allow webcam access.
- **Demo access requirements:** A modern browser with webcam support, good lighting, and Firebase Firestore rules published from [firestore.rules](firestore.rules) for live leaderboard writes.

## Participants

List participants according to the organizers' current participation format. Remove unused rows.

| Participant name | GitHub handle | Contribution |
| --- | --- | --- |
| Shayen Thomas | [shayen71421](https://github.com/shayen71421) | Solo developer — game design, gameplay, face-tracking controls, UI/UX, Firebase leaderboard, and documentation |

## Run and demonstrate

- **Prerequisites and versions:** Node.js 22+, a modern browser, webcam access, and a Firebase project with Firestore rules published.
- **Install command:** `npm install`
- **Required environment variable names:** None. The Firebase Web configuration is public and currently hardcoded in `firebase.js`.
- **Start command:** `npm run dev`
- **Demo walkthrough:** Open the public leaderboard from home, calibrate with five blinks, start a run, use blink/right wink/left wink gestures, then optionally save the final score with a name.
- **Checks performed and results:** `npm run build` passed; `git diff --check` passed.
- **Known limitations or incomplete features:** Camera quality and lighting affect tracking; audio is not wired; live score saving requires Firestore rules to be published; public score submission has no moderation or authentication.
- **Libraries, APIs, and public datasets used:** Vite, Phaser, MediaPipe Face Mesh, Firebase Firestore, and `navigator.mediaDevices.getUserMedia`; no public datasets used.
- **AI usage record:** AI assistance was used during development; the final submitted repository does not include a separate usage log.
- **Development change log:** Development history is available in the repository commit history.

## Submission checklist

- [ ] The project follows the organizers' current project-start and eligibility instructions.
- [ ] The participation format follows the organizers' current instructions.
- [ ] Any AI usage record included accurately identifies the tools used; the event requires no particular AI tool or provider.
- [ ] The code repository URL, short description, and working demo are provided.
- [ ] README setup and demo instructions match the submitted code.
- [ ] Actual checks and known limitations are documented.
- [ ] Meaningful changes are documented and committed throughout development.
- [ ] The final implementation is committed and pushed, and its SHA is recorded above.
- [ ] No credentials or private data are included in the repository or demo instructions.
- [ ] The organizers' announced submission method and timing have been followed.

Event: **Devin Hack Kochi**. Follow the organizers' current submission method and deadline. The event has no major AI usage constraints.
