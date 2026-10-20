# ScoreBase

ScoreBase helps coaches from the BQ ministry keep score and search quiz material.

## Local-first storage

ScoreBase is free to use and does not require an account. On first use, the app asks for a name for the current browser profile. That name, saved quizzes, and saved quizzers are stored in IndexedDB in the browser.

- Data is available only in the browser profile where it was created.
- Clearing site data, using a private window, or switching browsers/devices starts a separate empty ScoreBase profile.
- ScoreBase does not synchronize data between devices and does not provide cloud backup or account recovery.

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