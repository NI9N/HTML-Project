---
name: Hungry Ninja Restaurant — Session State
description: Current project status, key decisions, and file map for the Hungry Ninja demo website.
---

## Project overview
Demo website for Pink Ninja Izakaya (Hungry Ninja), a Japanese restaurant in Stratford, ON.
Stack: React 19 + Vite 7 + Tailwind v4 + Framer Motion + wouter + i18next.

## Colors (authority: DESIGN_GUIDE.md)
- 灯笼红 `#D42B2B` (primary)
- 墨黑 `#1A1A1A`
- 暖白 `#FAF8F4`
- 金色稻米 `#D4A843`
- 深海蓝 `#1B2A4A` (Reviews section bg)

## Current phase: Phase 7 (style refinement)

## Key decisions made this session

### Seigaiha pattern — ABANDONED
- User tried multiple times to get a correct Japanese fish-scale (青海波) CSS pattern on Reviews (`#1B2A4A`) and Footer (`#1A1A1A`) sections.
- Multiple formula attempts all failed visually (columns, X pattern, wrong arcs).
- **User gave up and asked to remove it entirely.** Reviews and Footer now have plain solid backgrounds.
- `SeigaihaBackground` component still exists in `decorative.tsx` but is NOT used in reviews or footer.
- Do NOT re-add the fish scale pattern unless user explicitly asks again.

### Real menu data — scraped from pinkninjaizakaya.com
- curl with browser User-Agent headers successfully fetches the Wix-rendered content.
- Menu is now 100% real Pink Ninja data (10+ categories, 80+ items with prices).
- Categories: Appetizers, Sashimi, Sushi Bowls, Specialty Bowls, Ramen & Noodles, Udon, Shinobi Rolls, Premium Rolls, Pressed Sushi, Party Trays, Party Platters.

### Cart / Order system — display only, no payment
- User confirmed: **display-only, no real payment needed.**
- If payment is ever needed: user prefers Square or a delivery platform (Uber Eats / SkipTheDishes).

## Key files

| File | Purpose |
|------|---------|
| `src/context/CartContext.tsx` | Cart state (items, qty, total, open/close) via React Context |
| `src/components/cart.tsx` | `CartButton` (floating bottom-right) + `CartPanel` (slide-in from right) |
| `src/components/menu.tsx` | Full real menu data + `AddButton` component (+/- on every item) |
| `src/components/decorative.tsx` | `NorenDivider`, `SeigaihaBackground`, `SeigaihaPattern`, `LanternIcon` |
| `src/App.tsx` | Wrapped with `CartProvider` |
| `src/pages/home.tsx` | Renders `CartButton` + `CartPanel` at bottom |

## Bugs fixed this session
- Removing `SeigaihaBackground` import but leaving the JSX tag → runtime error. Fixed.
- `NorenDivider` was lost when `decorative.tsx` was rewritten → re-added as SVG noren curtain divider.

## Scraping note
Wix sites need browser User-Agent header to return server-rendered HTML:
```bash
curl -s "https://www.pinkninjaizakaya.com/menu" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  -H "Accept: text/html,application/xhtml+xml" -L
```
Plain curl or Firecrawl (free tier) both fail on this site.

## Possible next steps (user did not commit to any)
- "Specials of the Day" banner the restaurant can update
- Language toggle for menu items (Chinese / Japanese)
- Connect to real delivery platform (Uber Eats / SkipTheDishes / Square)
