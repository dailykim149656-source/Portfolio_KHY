# Kim Hyoyeol Portfolio

React + TypeScript + Vite portfolio optimized for long-term expansion.

## Features

- Resume-content driven data structure in `src/data/portfolio.ts`
- Project cards list with route-like detail mode via hash URLs (`#/en/project/<slug>` or `#/ko/project/<slug>`)
- EN/KO UI toggle for main labels and key CTAs
- CTA blocks for portfolio, project review, and contact handoff
- GitHub Pages-friendly build
- Deployment automation via GitHub Actions

## Local Setup

```bash
npm install
npm run dev
```

## GitHub Pages 배포

```bash
npm run build        # 로컬 배포용 파일 확인
npm run deploy       # gh-pages 브랜치에 업로드
```

## 배포 실행 순서

1. GitHub 레포지토리 생성 후 리포지토리명을 확인
   - 예: `https://github.com/<owner>/kimhyoyeol-portfolio`
2. GitHub Pages 설정에서 배포 소스를 `gh-pages` 브랜치로 지정
3. 로컬 배포(루트에서 직접 배포할 때):

```bash
npm run build
export GITHUB_REPOSITORY=<owner>/kimhyoyeol-portfolio   # 필요 시 base 경로 강제
npm run deploy
```

GitHub Actions(`main` 브랜치 푸시)로 배포하면, 워크플로우에서 `npm run deploy`를 실행하므로 `base`가 자동 적용됩니다.

로컬에서 루트 도메인 배포(예: `<username>.github.io`)를 쓰는 경우에는 `base`가 `/`가 맞습니다.
레포지토리 페이지 배포(예: `<username>.github.io/<repo-name>`)는 `base`가 `/<repo-name>/`가 되어야 합니다.

## 라우팅 규칙

### Route-like Project Detail

Use links in the format:

- `#/en/project/snap-q` (or `#/ko/project/snap-q`)
- `#/en/project/honeypot` (or `#/ko/project/honeypot`)
- `#/en/project/sram-noise` (or `#/ko/project/sram-noise`)

Each link opens a project-focused detail panel and keeps the rest of the page data-driven.

### Route-like Section Navigation

Section links now use locale-prefixed anchors:

- `#/en/summary`, `#/en/experience`, `#/en/projects`, `#/en/skills`, `#/en/contact`
- `#/ko/summary`, `#/ko/experience`, `#/ko/projects`, `#/ko/skills`, `#/ko/contact`
- `#/en` or `#/ko` opens with `summary` section as default.
