# MoonlumeVPN Documentation Platform

This repository is the **docs engine** (`moonlumevpn-docs-site`) built with Docusaurus.

It pulls Markdown docs from the **content repo** (`moonlumevpn-docs`) during CI, builds a static site, and deploys to GitHub Pages.

Production URL: `https://docs.moonlumevpn.ru`

## Architecture

Two repositories are used:

1. `moonlumevpn-docs`
- Source of truth for Markdown docs.
- Multi-language docs are stored in `/docs` and `/i18n/<locale>/docusaurus-plugin-content-docs/current`.

2. `moonlumevpn-docs-site` (this repo)
- Docusaurus engine and theme.
- CI clones `moonlumevpn-docs` and replaces local `/docs` before build.
- Deploys to `gh-pages`.

## Local Development

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm start
```

Build static output:

```bash
npm run build
```

## CI/CD Workflow (This Repo)

Workflow file: `.github/workflows/deploy.yml`

Triggers:
- Push to `production`
- `repository_dispatch` with type `docs-update`
- Manual run (`workflow_dispatch`)

Pipeline:
1. Checkout engine repo
2. Clone `moonlumevpn-docs`
3. Replace local `/docs` and `/i18n` with external docs content
4. `npm ci`
5. `npm run build`
6. `npm run deploy` to `gh-pages`

## Multilanguage Content Layout (In `moonlumevpn-docs`)

```text
moonlumevpn-docs/
├─ docs/                                # default locale (ru)
│  ├─ intro.md
│  └─ ...
├─ i18n/
│  └─ en/
│     └─ docusaurus-plugin-content-docs/
│        └─ current/
│           ├─ intro.md
│           └─ ...
└─ README.md
```

Configured locales in this engine repo:
- `ru` (default)
- `en`

## Required GitHub Settings

In `moonlumevpn-docs-site`:
- Settings -> Pages -> Source: `Deploy from a branch`
- Branch: `gh-pages` (root)
- Custom domain: `docs.moonlumevpn.ru`

## Secrets

In `moonlumevpn-docs-site`:
- Optional: `DOCS_REPO_TOKEN` if `moonlumevpn-docs` is private
- Repository Variables for DocSearch:
  - `DOCSEARCH_APP_ID`
  - `DOCSEARCH_API_KEY`
  - `DOCSEARCH_INDEX_NAME`

In `moonlumevpn-docs`:
- `REPO_TOKEN` with access to trigger repository dispatch in `moonlumevpn-docs-site`

## Trigger Workflow (Content Repo)

Create this in `moonlumevpn-docs/.github/workflows/trigger.yml`:

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

If your docs repo uses a different default branch, update `branches: [production]` accordingly.

## Search (Algolia DocSearch)

This site is configured to use Algolia DocSearch (DocSearch JS) via Docusaurus built-in integration.

When the following variables are set, the navbar search is enabled automatically:
- `DOCSEARCH_APP_ID`
- `DOCSEARCH_API_KEY`
- `DOCSEARCH_INDEX_NAME`

If variables are missing, search UI is hidden until configured.

## DNS

At your DNS provider:
- Type: `CNAME`
- Name: `docs`
- Value: `moonlumevpn.github.io`
