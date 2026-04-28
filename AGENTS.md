# Project Instructions

This repository is a React + TypeScript + Vite static portfolio for GitHub Pages.

## Structure

- Portfolio content lives in `src/data/portfolio.ts`.
- Markdown posts live in `content/posts/` and are exposed through the Vite virtual module `virtual:portfolio-posts`.
- Shared UI labels live in `src/content/ui.ts`.
- Section components live in `src/components/sections/`.
- Global visual styling lives in `src/styles.css`.
- Static assets, including the resume PDF, live in `public/`.

## Commands

- Install dependencies: `npm ci`
- Development server: `npm run dev`
- Type check: `npm run typecheck`
- Production build: `npm run build`
- Smoke test: `npm run test:smoke`
- Resume sync check: `npm run verify:resume-sync`

## Workflow

- Keep the portfolio data-driven; prefer editing `src/data/portfolio.ts` and reusable section components over hardcoded one-off markup.
- Preserve hash-based routes for sections and project detail pages.
- Run `npm run typecheck`, `npm run build`, and the smoke test after meaningful UI or routing changes.
- GitHub Actions deploys pushes to `main` or `master` via `gh-pages`.
