# EKO — two comparable design studies

These are the two original comparable hero studies, preserved alongside the later EKO storefront. [View both studies](https://jit380.github.io/is117-brand-studio/explorations/index.html) or the [current storefront](https://jit380.github.io/is117-brand-studio/). Brand decisions and current evidence are reconciled in [SPEC.md](../../SPEC.md).

Both studies share one AI-generated white-shirt visualization, headline, supporting text, story, meaning section, size choices and temporary demo bag. They do not supply garment specifications, prices, checkout, payments, testimonials or inventory claims.

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

## Validation and evidence

The [recorded publication run](https://github.com/Jit380/is117-brand-studio/actions/runs/41474503263) passed formatting, JavaScript/HTML/CSS lint, seven Node server tests and fourteen Chromium browser tests. It additionally verified the published storefront, guide, approved meaning, image assets, mobile lotus, thread and demo bag.

The original comparison notes report render inspection at 1440px and 390px, plus width and automated axe checks at 320px. The current [study tests](../../tests/browser/explorations.spec.js) check both directions at 1440px, 390px and 320px, exercise the demo bag and native keyboard size controls, and assert matching product/content. These are automated observations, not learner observations or proof of complete accessibility.

The original implementation notes record that the intended fonts, loaded images and gallery thumbnails were checked from the actual renders. The learner later supplied the three-panel reference and requested the lotus, closer text placement and continuous thread for the storefront. That later work does not alter the identical-content comparison preserved here.

See [LEARNING.md](../../LEARNING.md) for the short learner/AI evidence distinction. Earlier personal reasoning and keyboard/mobile observations may exist in the separate setup chat; this document does not invent them.

## Publication and archive

GitHub Pages now serves the current storefront at https://jit380.github.io/is117-brand-studio/ and both studies under /explorations/. Publication and live verification succeeded in the linked run. The neutral root and initial Pages setup notes are historical.

The sole publishing source is feature/brand-001-first-branded-storefront. [Deployment instructions](../deployment.md) document automatic updates, the public URL and manual republishing. The host serves public/ independently of any local development terminal.

The archived public/explorations/EKO-previews.zip contains the original self-contained comparison pair, including its fonts, imagery, styles and bag. Use the current publishing branch for the latest storefront. Earlier implementation notes report local HTTP checks with external requests blocked; direct file:// inspection was unavailable in that environment.
