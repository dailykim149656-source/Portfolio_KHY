# Kim Hyoyeol Portfolio

React + TypeScript + Vite portfolio optimized for static hosting on GitHub Pages.

## Features

- Data-driven portfolio content in `src/data/portfolio.ts`
- Hash-based section navigation and project detail routes
- Locale-ready content model with English default rendering
- Linked PDF export for offline sharing
- Browser smoke test for key navigation flows
- GitHub Actions deployment to `gh-pages`

## Local Setup

```bash
npm install
npx playwright install chromium
npm run dev
```

## Validation

```bash
npm run typecheck
npm run build
npm run test:smoke
```

If `dist/` is already up to date, you can skip the extra build inside the smoke test:

```bash
npm run test:smoke -- --skip-build
```

## Export Linked PDF

```bash
npx playwright install chromium
npm run export:pdf
```

Optional: rewrite internal links in the PDF to the production origin.

```bash
PDF_PUBLIC_ORIGIN=https://dailykim149656-source.github.io/Portfolio_KHY npm run export:pdf
```

Output:

- `dist/portfolio-linked.pdf`

## Deployment

GitHub Actions deploys on pushes to `main` or `master`.

Local deployment still works:

```bash
npm run build
npm run deploy
```

The Vite config defaults to a relative base path, which works well for standard GitHub Pages repository deployments. If you need a fixed absolute base path for another host, set `BASE_PATH` during build:

```bash
BASE_PATH=/Portfolio_KHY/ npm run build
```

## Routes

Project detail routes:

- `#/project/snap-q`
- `#/project/honeypot`
- `#/project/labit-lab`
- `#/project/sram-noise`

Section routes:

- `#/summary`
- `#/experience`
- `#/projects`
- `#/skills`
- `#/contact`
- `#/`
