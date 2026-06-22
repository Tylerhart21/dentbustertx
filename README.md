# Dent Busters — Auto Hail Repair

Marketing site for Dent Busters (Texas auto hail / paintless dent repair).

- **Live site:** https://dentbusterstx.com
- **Hosting:** Vercel (auto-deploys from this repo's `main` branch)
- **Stack:** Pre-built static site — `index.html` + `/assets` (real image, font, and
  JavaScript files). No in-browser bundling or compiling, so it loads fast and works
  on every device including mobile.

## How this was built

The site was designed in Claude Design and exported as a **"Standalone" HTML bundle**.
That standalone file unpacks and compiles itself in the browser (Babel + gzip), which
works on desktop but fails on many mobile browsers ("bundle error"). So we convert it
into a normal static site at build time:

- images & fonts → real files in `/assets`
- React/ReactDOM → self-hosted in `/assets`
- the app's JSX → **pre-compiled** to plain JS (Babel dropped entirely)

## Updating the site

1. Re-export from Claude Design as a **Standalone** HTML file.
2. Run the converter, pointing it at the new export:

   ```bash
   cd _build
   npm install            # first time only
   cd ..
   node _build/unbundle.mjs "/path/to/new-export.html" "$(pwd)"
   ```

3. (Optional) Preview locally:

   ```bash
   node _build/serve.mjs "$(pwd)" 4319   # then open http://localhost:4319
   ```

4. Commit and push — Vercel redeploys automatically:

   ```bash
   git add -A
   git commit -m "Update site"
   git push
   ```

The `_build/` folder holds the conversion tooling and isn't part of the deployed site.
