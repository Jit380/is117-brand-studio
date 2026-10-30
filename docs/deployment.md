# EKO hosting and automatic updates

Public website: https://jit380.github.io/is117-brand-studio/

Live style guide: https://jit380.github.io/is117-brand-studio/styleguide.html

## What runs in production

EKO uses plain HTML, CSS and browser JavaScript under `public/`. It has no frontend framework or production build step. `server.mjs` is a local file-preview server with optional development refresh; it is not an application backend. The demo bag runs in browser memory, with no API, database, real checkout or payments.

GitHub Pages hosts `public/` over HTTPS on GitHub’s infrastructure. Hosting is free for this public repository. Your computer, terminal and local development server can all be turned off after a successful deployment; the published files remain available. No sleeping application instance, personal computer, tunnel or background process is required.

Node and npm are used by GitHub Actions for validation, not as a running production server. No database, hosting account, custom domain or paid server is needed for this version.

## Publishing source

The sole publishing branch is `feature/brand-001-first-branded-storefront` in [Jit380/is117-brand-studio](https://github.com/Jit380/is117-brand-studio/tree/feature/brand-001-first-branded-storefront).

`.github/workflows/eko-previews.yml` appears in Actions as **Publish EKO website**. Pushes to that branch automatically install the check dependencies, run formatting/lint/server/browser checks, upload `public/`, publish it to GitHub Pages and verify the live storefront, images, guide, mobile layout, purple thread and demo bag. Failed pre-deployment checks prevent publication; the last successful website stays available.

`.github/workflows/check-and-publish.yml` now appears as **Project checks** and only runs checks. Pushes to `main`, other branches, and pull requests do not replace the EKO website. The publishing workflow also checks its branch when started manually, preventing accidental publication of the older `main` content. Publishing jobs share one concurrency group.

## Publish an update from your computer

From your cloned `is117-brand-studio` repository, with unrelated work saved first:

```sh
git fetch origin
git switch feature/brand-001-first-branded-storefront
git pull --ff-only origin feature/brand-001-first-branded-storefront
```

Edit the website files under `public/`, then review and upload those changes:

```sh
git diff
git add public/
git commit -m "Update EKO website"
git push origin feature/brand-001-first-branded-storefront
```

For workflow or documentation changes, stage the specific changed files too. Keep unreviewed conversation summaries out of commits. If you use an editor or GitHub’s web interface instead of terminal Git, select this same branch before editing and committing.

Open [Publish EKO website in Actions](https://github.com/Jit380/is117-brand-studio/actions/workflows/eko-previews.yml). Wait for the run associated with your push to finish successfully, then open the public website above. Publication typically takes a few minutes. The public URL stays the same on every deployment. You can close your computer once the push has completed; GitHub runs the checks and publication independently.

## One-time Pages setting or manual republish

GitHub Pages is already enabled for this repository. If you need to restore the setting:

1. Sign into the GitHub account that owns `Jit380/is117-brand-studio`.
2. Open **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.
3. In **Actions → Publish EKO website → Run workflow**, select `feature/brand-001-first-branded-storefront`, then press **Run workflow**.
4. Wait for successful publication and live verification. Open https://jit380.github.io/is117-brand-studio/ .

If Pages settings are missing, confirm that the browser is signed into the owning account. A working terminal connection does not sign the browser in.

## Future backend features

The current demo works entirely on static hosting. Adding real orders, accounts, persistent customer data, payments or a private API would require an appropriate service or backend and a separate deployment decision. Do not expose private keys in `public/`.
