# CF Recall

A Spaced Repetition Helper for Codeforces

CF Recall is a Chrome extension that helps competitive programmers systematically revisit Codeforces problems using spaced repetition.
It is designed to prevent forgetting previously solved problems and to improve long-term problem-solving ability.

The extension is built using Chrome Extensions (Manifest V3), React, and modern JavaScript tooling.

---

## Features

- Add Codeforces problems to a personal revision list
- Practice problems using spaced repetition intervals
- Automatically show problems due for revision on the current day
- Carry forward missed or overdue problems
- Mark problems as reviewed to schedule the next revision
- Maintain revision history for each problem
- Add problems directly from Codeforces problem pages
- Persistent local storage using the Chrome Storage API

---

## Spaced Repetition Strategy

Problems are scheduled using increasing review intervals:

- 1 day
- 3 days
- 7 days
- 14 days
- 30 days
- 60 days

Each successful review advances the problem to the next interval.

---

## Tech Stack

- Chrome Extensions (Manifest V3)
- React
- Vite
- JavaScript (ES6+)
- Bulma CSS
- Chrome Storage API

---

## Project Structure

```text
cf-recall/
├── dist/                # Compiled extension (Load this into Chrome)
│   ├── manifest.json
│   ├── index.html
│   ├── assets/
│   ├── background/
│   │   └── serviceWorker.js
│   ├── contentScript.js
│   └── icons/
├── src/                 # Source code (React components)
│   ├── popup/           # UI for the extension bubble
│   └── utils/           # Shared logic (storage, dates, etc.)
├── public/              # Static assets (copied to dist)
├── package.json         # Dependencies and scripts
└── README.md
```
## Local Development

### Install dependencies

npm install

### Build the extension

npm run build

### Load in Chrome

1. Open chrome://extensions
2. Enable Developer Mode
3. Click Load unpacked
4. Select the dist/ directory

---

## Permissions

storage - Store problems and revision data locally

The extension does not collect personal data or communicate with external servers.

---

## License

MIT License

---

## Author

Lakshya
