# Dent Busters — Auto Hail Repair

Marketing site for Dent Busters (Texas auto hail / paintless dent repair).

- **Live site:** https://dentbusterstx.com
- **Hosting:** Vercel (auto-deploys from this repo's `main` branch)
- **Stack:** Single self-contained static page (`index.html`) — no build step.

## Editing

`index.html` is a standalone bundle exported from Claude Design (HTML/CSS/JS with
images and fonts inlined). To update the site, replace `index.html` with a new
export, commit, and push — Vercel rebuilds automatically.

```bash
git add index.html
git commit -m "Update site"
git push
```
