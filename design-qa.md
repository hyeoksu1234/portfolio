# Portfolio Design QA

## Result

final result: passed

## Source of truth

- Original visual baseline: commit `c62d066f5923b1131f07d841838c430bd5261b1b`
- Original home capture: `/private/tmp/portfolio-original-home-1440.png`
- Original projects capture: `/private/tmp/portfolio-original-projects-1440.png`
- Original detail capture: `/private/tmp/portfolio-original-detail-1440.png`
- Production URL: `https://portfolio-hyeoksu.vercel.app/`
- Implementation commit: `cdd0b2eacf6912125f528dc1df46d5144372e133`

## Comparison inputs

The reference and production captures were placed side by side at the same 1440 × 900 viewport before judging visual differences.

- Home comparison: `/private/tmp/portfolio-compare-home-production.png`
- Projects comparison: `/private/tmp/portfolio-compare-projects-production.png`
- Detail comparison: `/private/tmp/portfolio-compare-detail-production.png`
- Production home: `/private/tmp/portfolio-pm-home-production-1440-light-v2.png`
- Production projects: `/private/tmp/portfolio-pm-projects-production-1440.png`
- Production detail: `/private/tmp/portfolio-pm-detail-production-1440.png`

A separate focused-region comparison was unnecessary: the same-size side-by-side inputs keep the header, hero, filters, cards, banner, typography, and primary spacing legible at once.

## Desktop visual findings

- Home preserves the original cream background, orange `HYEOK / SU` wordmark, centered portrait, header proportions, CTA style, and vertical rhythm.
- Projects preserves the original two-column card grid, rounded image cards, filters, shadows, spacing, and typography.
- Detail preserves the original 800 px single-column shell, banner treatment, top navigation, heading scale, dividers, and content spacing.
- No P0, P1, or P2 visual mismatch was found.
- Intentional content-level differences are the PM-first hero statement and CTAs, the PM-oriented project taxonomy, FILA as the lead case, and the expanded evidence sections in project detail pages.

## Mobile QA

Viewport: 390 × 844.

- Home: `/private/tmp/portfolio-pm-home-production-390.png`
- Projects top: `/private/tmp/portfolio-pm-projects-production-390-top.png`
- Projects cards: `/private/tmp/portfolio-pm-projects-production-390-cards.png`
- FILA detail top: `/private/tmp/portfolio-pm-detail-production-390-top.png`
- FILA outcome section: `/private/tmp/portfolio-pm-detail-production-390-outcome.png`
- No horizontal overflow was found on home, projects, or project detail.
- All tested images loaded with non-zero natural dimensions.
- The hamburger menu opens and closes with the correct expanded state and exposes Home, Projects, About, and Contact navigation.
- Project filters wrap cleanly; `PM & Ops` leaves the single FILA case visible.
- Cards and evidence-rich detail sections remain readable at the mobile viewport.

The browser's stitched full-page mobile capture duplicated the fixed header and compressed later tiles. Element bounds and normal viewport captures confirmed this was a capture artifact, not a page layout defect; only viewport captures are used as mobile visual evidence above.

## Functional and route QA

- Theme toggle: light and dark states both render; the control label and pressed state update correctly.
- Project filter: `PM & Ops` activates and returns only `FILA Korea 자사몰 운영`.
- Card navigation: the FILA card opens `/projects/fila-commerce-pm/` through a native link.
- Legacy route: `/project.html?id=fila-commerce-pm` redirects to the clean FILA route.
- Invalid legacy id redirects to `/not-found/` and shows the custom 404 page.
- Arbitrary missing paths return the custom 404 page with HTTP 404.
- `/`, `/projects/`, all nine generated project routes, `/sitemap.xml`, and `/robots.txt` return HTTP 200.
- Browser warning and error logs checked during the desktop detail pass: none found.

## Comparison history

1. Restored the original stylesheet and page composition, then replaced developer-first copy and taxonomy with PM-first content.
2. Compared original and local implementation captures for home, projects, and detail.
3. Deployed commit `cdd0b2e`, repeated the three comparisons against production, and found no blocking visual drift.
4. Tested desktop theme/filter/navigation states and mobile menu/filter/content states.
5. Verified all public routes, legacy redirects, and the custom 404 response.

