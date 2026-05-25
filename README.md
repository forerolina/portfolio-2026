# portfolio-2026

Personal portfolio site (Vite + vanilla JS SPA).

## Setup

```bash
pnpm install
pnpm dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
pnpm build
pnpm preview
```

Output is in `dist/`.

## Routes

| Path | View |
|------|------|
| `/` | Home (project accordion) |
| `/about` | About |
| `/voice-assistant` | Voice Assistant case study |
| `/design-system`, `/mobile-checkout`, … | Other case studies (by project slug) |

Legacy URLs (`/about.html`, `/case-study.html`, `/case-study?slug=…`) redirect to the routes above.

## Deploy

The app uses the History API. Static hosts must serve `index.html` for unknown paths. [public/_redirects](public/_redirects) covers Netlify-style hosting (`/* → /index.html`).

For GitHub Pages with a project subpath, set Vite `base` in [vite.config.js](vite.config.js) to match the repo name.
