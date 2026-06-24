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

## Source of truth

The editable source lives in **`_build/src/`** (the app's JSX, one file per script) plus
**`_build/source-standalone.html`** (the HTML shell, images, fonts, and React libs from the
original Claude Design export). `index.html` and `/assets` at the repo root are **build
output** — don't hand-edit them.

## Updating content (the normal case)

1. Edit the relevant file in `_build/src/`. Quick map:
   - `02__script2` — nav + footer (contact info, links)
   - `06__script6` — Detailing menu, Paint Protection page, "Why a PDR shop" section
   - `10__script10` — homepage section order + page routing
   - others — hero, services, process, reviews, FAQ, contact form, etc.
2. Rebuild, preview, then ship:

   ```bash
   cd _build && npm install   # first time only
   cd ..
   node _build/build.mjs                       # regenerates index.html + /assets
   node _build/serve.mjs "$(pwd)" 4319         # preview at http://localhost:4319
   git add -A && git commit -m "Update content" && git push   # Vercel auto-deploys
   ```

## Re-importing a fresh Claude Design export

If the whole design is rebuilt in Claude Design, export a new **Standalone** HTML and
re-bootstrap (this overwrites the editable source — re-apply any hand edits afterward):

```bash
node _build/unbundle.mjs "/path/to/new-export.html" "$(pwd)"
```

The `_build/` folder is tooling/source and isn't served as part of the site.
