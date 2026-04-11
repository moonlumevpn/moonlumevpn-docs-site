<p align="center">
  <h1 align="center">MoonlumeVPN Docs Site</h1>
  <p align="center"><b>Docusaurus engine for MoonlumeVPN documentation</b></p>
  <p align="center">
    External docs content in, static site out, auto-deployed to GitHub Pages.
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/framework-Docusaurus-2ea44f" alt="Framework"/>
    <img src="https://img.shields.io/badge/runtime-Node.js-339933" alt="Runtime"/>
    <img src="https://img.shields.io/badge/deploy-GitHub%20Pages-222222" alt="Deploy"/>
    <img src="https://img.shields.io/badge/i18n-ru%20%7C%20en-blue" alt="Locales"/>
    <img src="https://img.shields.io/badge/domain-docs.moonlumevpn.ru-0a66c2" alt="Domain"/>
  </p>
  <p align="center">
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-cicd-workflow">CI/CD</a> •
    <a href="#-secrets-and-variables">Secrets</a> •
    <a href="#-dns">DNS</a>
  </p>
</p>

---

Production URL: `https://docs.moonlumevpn.ru`

This repository (`moonlumevpn-docs-site`) is the docs engine.  
During CI, it pulls Markdown docs from `moonlumevpn-docs`, builds the static site, and deploys via GitHub Actions Pages.

## Quick Start

Install dependencies:

```bash
npm install
```

Run local dev server:

```bash
npm start
```

Create production build:

```bash
npm run build
```

## Architecture

Two repositories work together:

1. `moonlumevpn-docs`
- Source of truth for Markdown content.
- Multilingual docs live in `/docs` and `/i18n/<locale>/docusaurus-plugin-content-docs/current`.

2. `moonlumevpn-docs-site` (this repo)
- Docusaurus engine and theme.
- CI clones `moonlumevpn-docs` and replaces local `/docs` and `/i18n` before build.
- Uploads `build/` as a Pages artifact and deploys with `actions/deploy-pages`.

## CI/CD Workflow

Workflow file: `.github/workflows/deploy.yml`

Triggers:
- Push to `production`
- `repository_dispatch` with type `docs-update`
- Manual run (`workflow_dispatch`)

Pipeline steps:
1. Checkout docs site repo
2. Clone `moonlumevpn-docs`
3. Replace local `/docs` and `/i18n` with external docs content
4. `npm ci`
5. `npm run build`
6. Upload `build/` via `actions/upload-pages-artifact`
7. Deploy via `actions/deploy-pages`

## Content Layout (`moonlumevpn-docs`)

```text
moonlumevpn-docs/
├─ docs/                                # default locale (ru)
│  ├─ index.md
│  └─ ...
├─ i18n/
│  └─ en/
│     └─ docusaurus-plugin-content-docs/
│        └─ current/
│           ├─ index.md
│           └─ ...
└─ README.md
```

Configured locales in this engine:
- `ru` (default)
- `en`

## Required GitHub Pages Settings

In `moonlumevpn-docs-site`:
- Settings -> Pages -> Source: `GitHub Actions`
- Custom domain: `docs.moonlumevpn.ru`

## Secrets And Variables

In `moonlumevpn-docs-site`:
- Optional secret: `DOCS_REPO_TOKEN` (required if `moonlumevpn-docs` is private)
- Repository variables for DocSearch:
  - `DOCSEARCH_APP_ID`
  - `DOCSEARCH_API_KEY`
  - `DOCSEARCH_INDEX_NAME`

In `moonlumevpn-docs`:
- Secret: `REPO_TOKEN` with permission to trigger `repository_dispatch` in `moonlumevpn-docs-site`

## Trigger From Content Repo

Create `moonlumevpn-docs/.github/workflows/trigger.yml`:

```yaml
name: Trigger Docs Site Rebuild

on:
  push:
    branches: [production]

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger rebuild in docs site repo
        run: |
          curl -X POST \
          -H "Accept: application/vnd.github+json" \
          -H "Authorization: Bearer ${{ secrets.REPO_TOKEN }}" \
          https://api.github.com/repos/moonlumevpn/moonlumevpn-docs-site/dispatches \
          -d '{"event_type":"docs-update"}'
```

If your content repo uses a different main branch, update `branches: [production]`.

## Search (Algolia DocSearch)

Docusaurus DocSearch is enabled automatically when all variables are present:
- `DOCSEARCH_APP_ID`
- `DOCSEARCH_API_KEY`
- `DOCSEARCH_INDEX_NAME`

If any variable is missing, search UI stays hidden.

## DNS

At your DNS provider:
- Type: `CNAME`
- Name: `docs`
- Value: `moonlumevpn.github.io`
