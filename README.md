# ScoreBase

ScoreBase helps coaches from the BQ ministry keep score and search quiz material.

## Local-first storage

ScoreBase is free to use and does not require an account. On first use, the app asks for a name for the current browser profile. That name, saved quizzes, and saved quizzers are stored in IndexedDB in the browser.

- Data is available only in the browser profile where it was created.
- Clearing site data, using a private window, or switching browsers/devices starts a separate empty ScoreBase profile.
- Saved quizzes and quizzers do not synchronize between devices, and ScoreBase does not provide cloud backup or account recovery.

## Phone buzzers

After starting a quiz, use **Enable phone buzzers** in the scorekeeping page. The host computer creates an ephemeral WebRTC room with Trystero and displays a QR code and invite URL.

- Each phone opens the invite, chooses an available active roster seat, and receives a large buzz button.
- Only the first buzz accepted by the host for the current round is shown on the scorekeeping page.
- The accepted buzz starts the 30-second timer, plays a Web Audio tone on the host computer, and opens that quizzer's scorebar controls.
- Selecting a correct or error action, changing questions, or using **Reopen buzzing** starts a new round for all phones.
- Phone claims, invite URLs, round state, and buzz events are temporary. They are not saved in IndexedDB.

Phone buzzers require HTTPS in production because WebRTC signaling and browser audio features are restricted on insecure origins. `localhost` is suitable for browser development, but a phone must reach the app over an HTTPS tunnel or deployed HTTPS URL.

Trystero uses public signaling relays for peer discovery; buzzer data then travels directly over encrypted WebRTC data channels when a connection can be established. The host accepts buzzes in arrival order, so this MVP is intended for ordinary local quiz rooms rather than tournament-grade timestamp arbitration. Restrictive school or cellular networks may require configured TURN infrastructure or a hosted WebSocket/Realtime backend for stronger reliability.

## Development

Install dependencies and start the development server:

```bash
npm install
npm start
```

Run the test suite once:

```bash
CI=true npm test -- --watchAll=false
```

Create a production build with:

```bash
npm run build
```