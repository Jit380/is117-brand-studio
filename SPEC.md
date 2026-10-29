# Brand Studio decisions

This is the durable agreement between the learner and agent. Keep it concise and update it only with agreed choices or actual evidence. `Not chosen yet` is a valid status. Persona cards are hypotheses unless supported by real research.

[LEARNING.md](LEARNING.md) holds the short, reviewable record of learner explanations and help received. Keep the brand decisions and implementation evidence here; link rather than duplicate them.

## Current stage

- Stage: EKO reference-based storefront implemented; publication authorized.
- Current feature: `BRAND-001` — first branded storefront and live style guide.
- Status: Release prepared on `feature/brand-001-first-branded-storefront`; deployment verification runs in GitHub Actions.
- Next small decision: Review the deployed EKO storefront; missing learner reasoning and human observations remain pending.

## Product boundary

The product is the same white T-shirt throughout the comparison. The baseline offers a size selector and temporary demo bag. No real orders, payment, accounts, or persistence. Keep product facts stable between directions; do not add unsupported claims about materials, manufacturing, sustainability, fit, delivery, scarcity, reviews, or sales.

## Audience hypotheses

The primary need guides the page. Give the secondary card one contrasting need to check that same page; keep both cards brief.

| Tiny card                             | Primary audience          | Secondary audience        |
| ------------------------------------- | ------------------------- | ------------------------- |
| Person in a concrete situation        | Not chosen yet            | Not chosen yet            |
| Goal or meaning they seek             | Not chosen yet            | Not chosen yet            |
| Concern before choosing               | Not chosen yet            | Not chosen yet            |
| What the page should help them decide | Not chosen yet            | Not chosen yet            |
| Evidence or assumption                | Assumption; not validated | Assumption; not validated |

## Early brand brief

| Decision                                 | Agreement      |
| ---------------------------------------- | -------------- |
| Brand name                               | Not chosen yet |
| One-sentence promise                     | Not chosen yet |
| Primary archetype: the brand's character | Not chosen yet |
| Three voice traits                       | Not chosen yet |
| One example line in this voice           | Not chosen yet |
| Learner's predicted audience effect      | Not chosen yet |

## Visual decision

Compare two small hero previews before building the whole page. Hold the product, headline, supporting copy, and action identical. Use specific real design references and annotate visual choices, intended effect, and risk.

A simple original SVG wordmark is enough. Show small-size and one-color presentations; they may use the same asset when it works.

| Item                                              | Agreement or evidence |
| ------------------------------------------------- | --------------------- |
| Shared headline / support / action                | Not chosen yet        |
| Modernist preview, reference, and annotations     | Not chosen yet        |
| Postmodernist preview, reference, and annotations | Not chosen yet        |
| Chosen direction and reason                       | Not chosen yet        |
| Original SVG logo                                 | Not chosen yet        |
| Monochrome and small-size variants                | Not chosen yet        |
| Logo review at actual use size                    | Not checked yet       |
| Shared palette, typography, spacing, and assets   | Not chosen yet        |

## Ethical persuasion

Choose two applications that help the visitor make a voluntary, informed decision. Record their real implementation and mechanism rather than a principle name alone. Required size selection or validation alone does not establish consistency. Do not invent social proof, scarcity, authority, or product facts.

| Principle      | Actual copy or interaction | Visitor benefit / factual support |
| -------------- | -------------------------- | --------------------------------- |
| Not chosen yet | Not chosen yet             | Not chosen yet                    |
| Not chosen yet | Not chosen yet             | Not chosen yet                    |

## BRAND-001 — first branded storefront and live style guide

**Scope:** turn the working neutral storefront into the chosen brand's first coherent page. Keep the existing size selector and demo bag usable. Do not add checkout or all future features.

Keep when:

- The learner has chosen the audience hypotheses, brief, visual direction, and logo; the page visibly expresses those choices.
- Two annotated hero directions compare modernist/postmodernist thinking with the same content and real source links.
- The selected SVG logo works at small size and in one color; the presentations may share one asset.
- The storefront and live style guide share CSS variables, typography, components, and assets; they do not drift into separate identities.
- Two ethical persuasion applications are visible and their claims are supportable.
- Prepared checks pass, the agent has reviewed the slice and discussed one actual check, and the learner has reported a browser impression plus keyboard/mobile observations.
- The issue, branch, commit, and PR explain this feature in the learner's repository; agreed decisions and actual evidence are saved here. The learner has approved keeping and merging the change, and the merge into `main` is verified. Publishing is a separate choice.

## Evidence

Write a short result and link only evidence that exists. A passing browser check is evidence for its assertions, not customer research or proof of full accessibility.

| Spec ID   | Files           | Issue / PR      | Actual checks and observations            |
| --------- | --------------- | --------------- | ----------------------------------------- |
| BRAND-001 | Not changed yet | Not created yet | Not run yet; learner observations pending |

## Later

No follow-up is selected. After keeping `BRAND-001`, choose one next cycle: perhaps a brand story, a supported fit guide, or richer demo-bag behavior. Agree its scope and add one new spec ID at that time.

## EKO storefront release

The release presents a centered entirely white shirt, sculptural white fabric on charcoal, and an original conceptual ivory/lavender quilt illustration. Large serif typography and a fine decorative lavender thread connect the three chapters; narrow screens stack them. Product concept imagery is AI-generated, not evidence of product construction or an archival quilt. The existing size selector and temporary demo bag are preserved. The live guide shares the CSS and assets.

Changed files include `public/index.html`, `public/styleguide.html`, shared `public/eko-*.css` and JavaScript, and `public/assets/eko-*.png` / `eko-wordmark.svg`. Existing exploration pages, their source notes and tests are preserved. No unreviewed LEARNING.md excerpts, local screenshots, scripts, caches or dependencies are part of this release.

Validation before publication: formatting, HTML/CSS/JavaScript lint, seven server tests, and the full browser suite using system Chromium. The GitHub workflow uses its standard Playwright Chromium installation and additionally verifies the deployed root, three new image assets, shared style guide and demo-bag operations. Human impressions, audience reasoning and other learning criteria are not inferred from these checks. Publication is separate from completion of all BRAND-001 learning evidence.
