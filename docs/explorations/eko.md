# EKO — two comparable design studies

Open `public/explorations/index.html` through the repository's documented development server. The neutral storefront remains unchanged. These are viewable proposals for choosing a direction, not a completed BRAND-001 or a deployed commerce service.

Both versions share one AI-generated white-shirt visualization, headline, supporting text, deeper story, meaning section, size choices, and functioning temporary demo bag. There are no garment specifications, price, checkout, payments, customer testimonials, or inventory claims.

## 01 — The quiet structure / modernist interpretation

Reference: [IBM Plex, IBM and Bold Monday, 2017](https://github.com/IBM/plex). The original project's documentation and actual typeface were inspected. The font is distributed under the SIL Open Font License; its license is included with the preview assets.

- Translate the typeface's functional range and measured forms into a repeated grid, clear hierarchy, and left-aligned product story.
- Give the product and text separate, stable spaces; use repeated fine rules for navigation and sequence.
- Use generous space to give the ordinary object attention rather than adding decoration.

Intended effect: a grounded, legible expression of quiet strength for everyday wear. Risk: the strict structure may feel impersonal. This is a contemporary interpretation of modernist principles, not a claim that the 2017 typeface is a historical modernist artifact.

## 02 — The inner world / postmodern interpretation

Reference: [Syne for Synesthésie, Bonjour Monde and Lucas Descroix, 2017; open-source release 2018](https://gitlab.com/bonjour-monde/fonderie/syne-typeface). The original designer README and specimen images `syne-typeface-01.jpg` and `syne-typeface-04.jpg` were viewed. The specimen contrasts a conventional regular with a radically expanded Extra and an unexpected italic; the README discusses historical quotation, atypical combinations and the found object. The modern variable-font distribution is used under its included OFL license.

- Quote the familiar presentation language of a technology product reveal, then place EKO lettering at a scale that competes with the everyday object.
- Juxtapose geometric Syne with a conventional italic serif; the same words take on a second visual voice.
- Keep the calm monochrome surface, introducing a restrained lavender note and an unexpected rounded corner in the abstract light study.

Intended effect: a quiet surface with emotional depth and a more expressive visual identity. Risk: the type treatment could distract from the product. Apple is the user's requested inspiration; its current website was blocked by network policy, so no exact Apple page or current rendering is claimed as inspected. This is an interpretation using quotation and juxtaposition, not a claim that minimalism by itself is postmodern.

## Current validation

- Formatting and JavaScript, HTML and CSS lint pass.
- Seven existing server tests and thirteen browser tests pass with system Chromium 154.0.8037.57 through a temporary Playwright executable override. The installed browser differs from the locked Playwright download revision; the repository's default config and CI browser installation remain unchanged.
- Both directions were rendered and inspected at 1440px and 390px; width checks and automated axe scans also ran at 320px. The separate review found no WCAG 2 A/AA or 2.1 AA axe violations at those widths. This does not prove complete accessibility.
- Checks exercise missing-size feedback, valid additions, clearing the bag and native keyboard size controls, and compare product/content equality between the two directions.
- Intended fonts and image loading were verified. Desktop thumbnails in the gallery are actual browser screenshots from this code.

No learner preference between the two actual renders or learner browser observation is claimed. The provisional wordmark, prose and voice are reviewable AI proposals. The archetype, complete three-trait voice, secondary audience and ethical persuasion applications are not finalized. No conversation excerpts are included in the publication commit; LEARNING.md changes remain local and unreviewed.

## Publication

The first `Publish EKO previews` run passed its checks but failed at Pages configuration: the site does not exist and GitHub's integration cannot enable it (`Resource not accessible by integration`). No live deployment is claimed.

The corrected workflow always saves a downloadable artifact and explicitly skips live publication until Pages is configured for GitHub Actions. Once enabled in repository settings, rerun the workflow on the feature branch. It publishes the full `public/` folder so the original baseline stays at the root and both previews remain under `/explorations/`, then verifies both published URLs. Only a successful deployment and those checks establish that a live link works.

The complete, self-contained website bundle is `public/explorations/EKO-previews.zip`. Unzip it and open `EKO/index.html`; each direction includes its fonts, image, styles and working bag. The standalone content and interaction were also checked through a local HTTP server with external requests blocked. Browser policy prevents direct `file://` inspection in this cloud machine, so no local-file browser check is claimed.
