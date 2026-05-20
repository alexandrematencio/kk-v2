---
name: thai-restaurant-hero-design
description: Design laws for the homepage hero section (HeroSection.vue) — borders, layout, breakpoints. Source of truth so design intent doesn't drift across edits.
---

# Hero Section — Design Laws

Source file: `app/components/HeroSection.vue`
In-flow nav for non-homepage pages: `app/components/MainNav.vue` (used by `layouts/default.vue`)
Sticky companion (shown on scroll on every page): `app/components/StickyNav.vue`

All three mirror the same border + layout rules — keep them in sync.

## Borders

### Law 1 — All hero borders share the **same visible width: 1px**

Every separator line in the hero (top nav, logo divider, nav-items divider, bottom nav top, bottom nav bottom, contact bar bottom, bottom-item dividers, image-wrap left edge) renders as **exactly 1px** on screen. No exceptions. If a border looks thinner than the others, it is a bug.

> **Why it gets lost**: pseudo-element offsets + `overflow: hidden` parents can clip half the stroke. Always verify visible width, not just `height/width: 1px` in CSS.

### Law 2 — Borders use **center-stroke alignment** (Figma "Center" stroke)

Borders are drawn with `::before` / `::after` pseudo-elements offset by half their thickness outside the host (`transform: translateX(±50%)` for vertical, `transform: translateY(±50%)` for horizontal). This places the line **exactly on the boundary between two adjacent blocks** so:
- adjacent borders from sibling elements stack as one clean line, no 1px jog at corners,
- horizontal and vertical strokes join precisely at intersections.

Native CSS `border` is **not** used for hero separators because it draws inside-only, which causes 1px offsets where two adjacent elements both carry a border.

### Law 3 — Exception: edges clipped by `overflow: hidden` use **inside alignment**

`.hero2` has `overflow: hidden` (required by the entry animations). Any border that sits on the outer edge of `.hero2` would have its outside half clipped under Law 2 and render at 0.5px.

For those edges, drop the `transform: translateY/X(±50%)` and let the stroke sit fully inside the host. The visible width stays 1px (Law 1) at the cost of the line being offset by 0.5px from the geometric boundary — acceptable because there is no adjacent element to join with.

Current concrete case: `.hero2-bottomnav::after` (the bottom border under the bottom nav bar). It sits at the bottom of `.hero2`. Inside alignment, no transform.

If a future edit adds a border at another clipped edge, apply the same rule.

## Layout

### Two columns, fixed split

- `.hero2-left`: `flex: 1` (≈ 67% viewport on desktop)
- `.hero2-right`: `width: 33%` viewport

`.hero2-contact` and `.hero2-image-wrap` are both 100% of `.hero2-right` — they share the same visible width in all desktop circumstances. This is a hard requirement (do not give either a different padding-box width).

### Title / subtitle / CTA alignment

Title, subtitle and CTA must share the same left edge. They each sit in a 640px max-width container, centered horizontally inside `.hero2-content` (`align-items: center`), with their content left-aligned. The CTA is wrapped in `.hero2-cta-wrap` for the same constraint — do not give the CTA `align-self: flex-start` directly on `.hero2-content`, that would pull it to the column's left edge instead of the title's left edge.

## Responsive breakpoints

| Range | Behaviour |
|---|---|
| `> 1280px` | Full desktop. Logo 50px tall, nav-items gap/padding 48px, font 24px. |
| `1025–1280px` | Topnav tightens (logo-wrap padding 12/16, nav-items gap/padding 16, font 18) to keep the nav fitting in the 67% left column. Title 44px, CTA 36px. |
| `1025–1200px` | Same as above + contact bar collapses to icons only (`.hero2-contact-item span { display: none }`). |
| `≤ 1024px` | Mobile stack. `.hero2-right` drops below `.hero2-bottomnav` in vertical flow. `.hero2-contact` gets a center-stroke `::before` border-top because it now follows the bottomnav vertically. Contact labels reappear. |
| `≤ 480px` | Phone-specific font-size shrinks (title 26, cta-text 18, bottom-item 12). |

### Mobile collapse trigger

The mobile breakpoint is set where the tightened nav-items (font 18, gap/padding 16) **stops fitting** in the 67% left column. If a future edit changes nav-item content (more items, longer labels) or the logo-wrap width, recompute the threshold and adjust 1024px accordingly.

## Companion nav components

Two components share the same nav design and must be kept visually consistent with the hero2 topnav:

- **`MainNav.vue`** — in-flow top nav rendered by `layouts/default.vue` on every non-homepage route (`/reserver`, `/commander`, `/contact`, …). The homepage skips the default layout (`definePageMeta({ layout: false })`) because its top nav is embedded inside the hero's 2-column layout.
- **`StickyNav.vue`** — fixed-position version that appears on scroll on every page (mounted at the app root in `app.vue`). Threshold: past the hero (`window.innerHeight - 60`) on the homepage, 120px on inner pages.

Both use the same row layout (`logo | nav-items | contact`), same center-stroke borders, same breakpoints, same icons-only intermediate state at 1025–1200px, same mobile collapse to burger at ≤1024px. Any design tweak must be propagated to **all three** files (`HeroSection.vue`, `MainNav.vue`, `StickyNav.vue`).

---

**Last updated**: 2026-05-16
