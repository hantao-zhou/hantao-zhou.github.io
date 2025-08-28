# Personal Homepage

This site is a simple Next.js app styled with [Terminal CSS](https://terminalcss.xyz). The home page shows basic information and includes a button that opens a window using [WinBox.js](https://nextapps-de.github.io/winbox/).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static site will be generated in the `out` directory, ready to be published on GitHub Pages.

## Deploy to GitHub Pages

- Source: Set repository Settings → Pages → Build and deployment → Source to `GitHub Actions`.
- Workflow: This repo includes `.github/workflows/deploy.yml` which:
  - builds a static site (`next.config.ts` uses `output: 'export'`),
  - uploads `out/` as the Pages artifact, and
  - deploys to `https://<username>.github.io`.
- Jekyll: A `public/.nojekyll` file is included so the `_next/` assets are served correctly.

Trigger a deploy by pushing to `main`, or run the workflow manually from the Actions tab.

