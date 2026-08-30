# Manaber — Design System Contract

**Status:** Phase 1 complete (tokens, primitives, layout chrome, Home).
**Phase 2 scope:** `Features.tsx`, `UseCases.tsx`, `Contact.tsx`, `Privacy.tsx`, `NotFound.tsx`.

Interior pages MUST be built strictly against this file. Nothing below is
optional or advisory — it is the contract. Where a rule and a visual instinct
disagree, the rule wins.

This system **replaces the emerald / rounded / Instrument-Serif-italic language
entirely**. If you find an `emerald-*` class, a non-zero radius, a gradient, a
blur, a drop shadow or an italic heading in a page you are restyling, it is a
leftover from the old brand. Delete it.

---

## 1. Palette

Flat fills only. **Zero gradients, zero blurs, zero tints, zero shadows** (one
narrow exception in §6). Colour blocks are separated by whitespace, never by
rules or borders.

| Token | Hex | Tailwind | Role |
| --- | --- | --- | --- |
| Ink | `#000000` | `ink` | Pure black. Body text, black slabs, the footer. |
| White | `#FFFFFF` | `white` | Default ground. |
| Periwinkle | `#8587FF` | `periwinkle` | Primary accent **card fill**. |
| Lavender | `#C0C0FF` | `lavender` | Soft card fill; the FAQ ground. |
| Lime | `#C8FC00` | `lime` | Primary **CTA** fill; accent card. |
| Lime deep | `#B4E300` | `lime-deep` | Lime hover only. |
| Indigo | `#2E0A78` | `indigo` | Dark feature slab; **accent text on light**. |
| Indigo deep | `#210757` | `indigo-deep` | Indigo hover only. |
| Slate | `#4A4458` | `slate` | Muted card fill on black sections. |
| Slate deep | `#37323F` | `slate-deep` | Slate hover only. |

`neutral-*` still resolves (it is a plain grey ramp) but **is not part of this
language**. Use `ink` with an opacity suffix instead — `text-ink/70` for
secondary body copy, `bg-ink/15` for hairlines.

### 1.1 Approved text-on-ground pairings (ALL verified ≥ 4.5:1)

Never invent a pairing. Use one of these.

| Ground | Approved text | Contrast |
| --- | --- | --- |
| White | `text-ink` | 21.0 |
| White | `text-ink/70` (secondary body) | ~11.4 |
| White | `text-indigo` (bold lead line) | 14.7 |
| Periwinkle `#8587FF` | `text-ink` | 6.88 |
| Periwinkle | `text-indigo` (bold body) | 4.81 |
| Lavender `#C0C0FF` | `text-ink` | 11.2 |
| Lavender | `text-indigo` | 8.54 |
| Lime `#C8FC00` | `text-ink` | 17.4 |
| Lime | `text-indigo` | 12.1 |
| Indigo `#2E0A78` | `text-white` | 14.7 |
| Indigo | `text-lavender` | 8.54 |
| Indigo | `text-lime` | 12.1 |
| Slate `#4A4458` | `text-white` | 9.30 |
| Slate | `text-white/80` | ~7.4 |
| Black | `text-white`, `text-lavender`, `text-lime`, `text-periwinkle` | ≥ 6.88 |

**Banned pairings — these fail and must never ship:**

- ❌ `text-white` on **lime** (1.2:1) and on **lavender** (1.9:1). Lime and
  lavender carry **near-black or indigo text only**.
- ❌ `text-periwinkle` on **white** — 3.05:1, fails the 4.5 floor. The brief's
  "bold periwinkle sub-line" is therefore rendered in **`text-indigo`** on light
  grounds: same hue family, 14.7:1. Periwinkle is a **fill** colour, and is
  text only on black or indigo.
- ❌ `text-lime` on white (1.2:1).

Text is **never** placed directly on a photograph. It rides an opaque
`BubbleCard`, so contrast is a property of the fill, not of the frame behind it.
The only exception is the hero, which uses a flat `bg-ink/75` scrim.

---

## 2. Typography

Loaded in `index.html` from Google Fonts:
`Inter:wght@400;500;600;700` + `Roboto Serif:opsz,wght@8..144,300..600`.

### 2.1 Display — upright roman serif, REGULAR weight

**Every `h1`/`h2`/`h3`** uses `font-display`, which resolves to
**Roboto Serif** (fallbacks: Source Serif 4 → Iowan Old Style → Charter →
Georgia → Times New Roman → serif).

Three hard rules, and they are the single biggest thing the previous build got
wrong:

1. **Upright. Never `italic`.**
2. **Regular weight. Always pair `font-display` with `font-normal`.** Never
   `font-bold`/`font-semibold` on a heading. Hierarchy comes from **size and
   colour**, never weight.
3. **Large.** Serif headings are the loudest thing on any slab.

> ⚠️ **Tech gotcha — do not undo this.** Multi-word family names in
> `tailwind.config.js` are quoted (`'"Roboto Serif"'`, `'"Source Serif 4"'`,
> `'"Segoe UI"'`). Tailwind emits the list verbatim, and unquoted
> `Source Serif 4` is invalid CSS — the browser silently drops the **entire**
> `font-family` declaration and every heading falls back to sans. Likewise, do
> not hand-write a `.font-display` rule in `index.css`: that selector collides
> with the Tailwind utility.

### 2.2 Type scale

| Token | Size | Use |
| --- | --- | --- |
| `text-display-xl` | `clamp(2.75rem, 5.6vw, 4.5rem)` / 1.06 | Page `h1` only |
| `text-display-lg` | `clamp(2.25rem, 4.2vw, 3.5rem)` / 1.08 | Section `h2` |
| `text-display-md` | `clamp(1.875rem, 2.8vw, 2.5rem)` / 1.12 | Panel titles, stat numerals |
| `text-display-sm` | `clamp(1.5rem, 1.9vw, 1.875rem)` / 1.18 | Sub-headings |
| `text-display-xs` | `1.375rem` / 1.25 | Card `h3`, FAQ questions |
| `text-label` | `0.8125rem`, `0.1em` tracking | Buttons, eyebrows, dt labels |
| `text-label-lg` | `0.875rem`, `0.1em` tracking | Large button faces |

### 2.3 Body — Inter

- Body copy floor is **18px (`text-lg`)**. `text-xs` / `text-sm` / `text-base`
  are **banned**; uppercase labels use `text-label` instead.
- **Lead paragraphs are bold** (`text-lg`/`text-xl` + `font-bold`), and coloured
  `text-indigo` on light grounds, `text-lavender` on dark grounds. This is a
  signature of the language — a section without a bold lead line reads flat.
- Secondary body: `text-lg leading-relaxed text-ink/70` (or `text-white/80`).
- **Eyebrows and buttons:** UPPERCASE, `tracking-eyebrow` (0.1em),
  `font-medium`, `text-label`.

---

## 3. Geometry — the zero-radius rule

**Border radius is 0 everywhere.** Cards, buttons, panels, images, inputs,
badges, avatars. No exceptions.

The `card` / `panel` / `frame` radius tokens still exist but now resolve to
`0px`, purely so stale markup cannot reintroduce a curve. **Do not use them in
new markup** — use `rounded-none`, or simply omit radius.

Banned: `rounded-full`, `rounded-lg`, `rounded-xl`, `rounded-2xl`,
`rounded-[…]`, and every `shadow-*` except `shadow-lift` (§6).

---

## 4. The signature motif — the speech-bubble tail

This is what makes the design recognisable. **Every page must carry at least
one.**

### 4.1 Geometry

Defined once in `src/index.css` as `.bubble`:

```css
.bubble[data-tail]::before {
  content: '';
  position: absolute;
  left: 0;
  width: var(--tail-w);   /* 34px */
  height: var(--tail-h);  /* 30px */
  background: inherit;                      /* takes the card's own fill */
  clip-path: polygon(0 0, 100% 0, 0 100%);  /* flat top, vertical left edge,
                                               hypotenuse top-right → bottom-left */
}
.bubble[data-tail='top-left']::before    { bottom: 100%; }  /* above the card */
.bubble[data-tail='bottom-left']::before { top: 100%; }     /* below the card */
```

`background: inherit` means the tail matches any fill without being told which.

### 4.2 API — `src/components/ui/BubbleCard.tsx`

```tsx
<BubbleCard
  tone="periwinkle" // periwinkle | lavender | lime | indigo | slate | white | black
  tail="top-left"   // top-left | bottom-left | none   (default: top-left)
  as="li"           // any element type (default: div)
  className="p-6 sm:p-7"
>
```

`tone` sets the fill **and** the text colour that clears 4.5:1 against it, and
adds `on-dark` to dark tones so focus rings flip to lime.

### 4.3 Rules

- **`top-left`** for cards that sit on a ground — hero cards, the indigo slab's
  statement card.
- **`bottom-left`** for cards overlaid onto a photograph, and for
  article-style cards.
- ❌ **A tailed card must never carry `overflow-hidden`.** The tail lives
  outside the box and would be clipped away. Put `overflow-hidden` on the photo
  wrapper *around* the bubble instead, and inset the bubble far enough that the
  tail stays inside.
- ❌ **Never add `relative` to a `BubbleCard`'s `className`.** `.bubble` already
  supplies `position: relative`, and a `relative` utility would *beat* an
  `absolute` you pass for an overlay — Tailwind emits `.relative` after
  `.absolute` and `cn()` does not resolve conflicts. This silently drops
  overlay bubbles back into flow.

### 4.4 The motif at section scale

`.section-notch` (`clip-path: polygon(0 0, 100% 100%, 0 100%)`) is the same
wedge, used as a section hand-off: a `h-10 w-[7.5rem] bg-ink` block on the
bottom edge of the lavender FAQ ground, dropping into the black footer. It is
aligned to the **content shell's** right edge, not the viewport's.

---

## 5. Layout & spacing

- **Shell:** `max-w-shell` (1200px), `px-5 sm:px-6` — always via `<Container>`.
  Nav card, every slab and the footer share this edge.
- **Grid:** `grid grid-cols-12` for section content.
- **Column pairs leave a one-column gutter and carry NO `gap-x`** — the empty
  column *is* the spacing:
  - `lg:col-span-5` + `lg:col-span-6 lg:col-start-7`
  - `lg:col-span-7` + `lg:col-span-4 lg:col-start-9`
  - `lg:col-span-4` + `lg:col-span-7 lg:col-start-6`
  Card grids (the bento) are the exception and do use `gap-4 lg:gap-5`.
- **Vertical rhythm** (`<Section spacing>`), on an 8pt grid:
  `tight` `py-16 sm:py-20` · `default` `py-20 sm:py-24 lg:py-28` ·
  `loose` `py-24 sm:py-32 lg:py-36` · `none`.
- All spacing snaps to 4/8/12/16/24/32/48/64. No arbitrary values.
- Interior pages need **`pt-36 sm:pt-44`** at minimum on their first section:
  the nav is a *floating card*, not a bar, and needs clearance.

### 5.1 Slab alternation

Home, top to bottom — interior pages inherit this rhythm:

```
white nav card → DARK hero → white → INDIGO → BLACK → white → LAVENDER → BLACK footer
```

Never place two identically-coloured slabs adjacent. Every page ends on the
black footer, so the last section before it must not be black.

---

## 6. Shadows, focus, motion

- **Shadows are absent.** The single exception is `shadow-lift` on the floating
  nav card, so it separates from a photographic hero.
- **Focus:** square (radius 0) 2px indigo ring with a 2px white offset. Inside
  an `on-dark` subtree the ring flips to lime on black. Add `on-dark` to any
  dark or saturated slab you build.
- **Motion:** colour transitions only, 200ms `ease-out-expo`. Hovers are a
  **flat colour shift**, never a lift, scale or shadow.
- **Reveals:** `useReveal()` + `.reveal` / `.reveal-delay-1…6`, for
  **below-the-fold content only**. Above-the-fold markup (hero, nav, first
  screen) must render at final opacity on first paint and must never carry
  `.reveal`. `prefers-reduced-motion` disables all of it.

---

## 7. Primitives

All live in `src/components/ui/`.

| Component | Notes |
| --- | --- |
| `BubbleCard` | §4. The signature. |
| `Button` | `lime` (primary CTA) · `black` · `white` · `outline-dark` · `outline-light` · `outline-lime`. Sharp, uppercase, tracked, `h-11`/`h-14`. |
| `Card` | Flat block: `white` `lavender` `periwinkle` `lime` `indigo` `slate` `black` `outline`. `interactive` = flat colour shift. |
| `Section` | Ground slab: `white` `black` `indigo` `lavender` `periwinkle` `lime`. |
| `Eyebrow` | Uppercase label. Tones `ink` `indigo` `lime` `lavender` `periwinkle` `muted`. `withMark` is off by default. |
| `Container` | The 1200px shell. |

> `StoreButtons` was **deleted**, not restyled. The app has no public
> storefront listing, so there is nothing to link to. Every call to action on
> the site routes to `/contact` instead.
| `Icon` | Inline SVG set, 24×24, stroke, `currentColor`. |

### 7.1 Legacy prop aliases — do not use in new work

So the not-yet-restyled pages keep compiling, these old values still resolve:

- `Section tone`: `tint`→lavender, `emerald`→periwinkle, `dark`→black
- `Card tone`: `raised`→white+border, `plain`→lavender, `dark`→black
- `Eyebrow tone`: `emerald`→indigo, `neutral`→`ink/55`, `light`→lime
- `Button variant`: `primary`→lime, `secondary`→outline-dark, `ghost`→ghost

**Phase 2 must replace every one of these with a canonical name and then these
aliases should be deleted.**

---

## 8. Content integrity — hard constraints

- **Nothing is fabricated.** No client logos, no "Trusted by" wall, no
  testimonials, no case studies, no blog posts, no pricing, no awards, no
  latency or accuracy figures, no invented quotes or named people.
- The **only** real figures are **+70% audience engagement** and the
  **25+ languages** count. Do not coin a third. The storefront rating and the
  ratings count were removed along with the store links — the app has no public
  listing, so neither number can be stood behind.
- **The app does not exist publicly yet.** No download, no storefront, no
  "coming soon", no waiting list, no launch date. Every CTA routes to
  `/contact`.
- Real contact details, from `src/lib/site.ts`: `contact@manaber.ai` ·
  `+971 50 216 4876` · Dubai, UAE.
- Where the reference site has content Manaber does not have, the slot is
  **re-purposed, not faked** — its logo wall became the stats band; its
  testimonial panel became a product statement on the indigo slab.
- **No Stenomatic copy.** Their headline, feature names and body text are
  theirs. Write Manaber's own.

### 8.1 Images — frozen

There are exactly **9** AI-generated images. Seven were frozen in phase 1; the
two `usecase-mosque-announcements` / `usecase-team-meetings` frames were added
with the solution pages and are the last additions. **No further new ones may
be created.**
Reuse them by keeping each `<img src>` URL string **byte-identical** — never
retype it, never build it with a template literal, never compute it. Moving an
`<img>` to a different component is fine; altering its `src` is not.

| `data-ai-id` | Currently used in |
| --- | --- |
| `hero-visual` | `home/Hero.tsx` |
| `privacy-visual` | `home/HeroCards.tsx` |
| `languages-visual` | `home/HeroCards.tsx` |
| `usecase-friday-sermon` | `home/UseCaseBento.tsx`, `pages/UseCases.tsx`, `lib/solutions.ts` |
| `usecase-conference` | `home/UseCaseBento.tsx`, `pages/UseCases.tsx`, `lib/solutions.ts` |
| `usecase-business-meeting` | `home/UseCaseBento.tsx`, `pages/UseCases.tsx`, `lib/solutions.ts` |
| `usecase-education` | `home/UseCaseBento.tsx`, `pages/UseCases.tsx`, `lib/solutions.ts` |
| `usecase-mosque-announcements` | `lib/solutions.ts` |
| `usecase-team-meetings` | `lib/solutions.ts` |

The six use-case frames now live as literal `src` strings in
`src/lib/solutions.ts` and are rendered by `pages/SolutionDetail.tsx` through
`<img src={image.src} data-ai-id={image.id}>`. The URL literal is what the
image pipeline find-and-replaces, so it must stay a plain quoted string in the
data file — never a template literal, never assembled from parts.

> **Known follow-up for the client:** `privacy-visual` and `languages-visual`
> are abstract renders in the *old* emerald/teal palette and now sit inside
> periwinkle and lavender cards. They read as a leftover from the previous
> brand. Regenerating them was out of scope here ("zero new images") — flag it
> as a deliberate, separately-approved change rather than fixing it silently.

---

## 9. Behaviour that must be preserved

These carry fixes from an earlier review. **Restyle them; do not rewrite their
logic.**

- Routes: `/` `/features` `/use-cases` `/solutions/:slug` `/contact` `/privacy`
  + `*` → `NotFound`. An unknown solution slug renders `NotFound` too.
- `ScrollToTop` — route-change scroll reset **and** its `<Link>` hash handling.
- The Privacy page's scroll-spy.
- `<NavLink>` in the header, with the active page marked (lime underline).
- The header drawer closes **before** the new route paints — the close is
  derived during render, not run in an effect. The Solutions mega-menu uses the
  same pattern. Do not move either into a `useEffect`.
- `vite.config.ts` `allowedHosts: true` and the `dev:host` script.
- Forms use react-hook-form + zod with `noValidate` and inline, brand-voiced
  errors.

---

## 10. Home page section map (built)

| # | Section | Ground | Notes |
| --- | --- | --- | --- |
| — | `layout/Header` | white card | Floating, sharp, `shadow-lift`, lime CTA + lime-outlined secondary. |
| 1 | `home/Hero` | photographic + `bg-ink/75` | Serif `h1`, bold white subhead, lime + white-outline buttons. Above fold — no `.reveal`. |
| 2 | `home/HeroCards` | none (straddles hero edge) | 3 `top-left` bubble cards: periwinkle / lime / lavender. |
| 3 | `home/StatsBand` | white | The ONE real figure (+70%), set large across the left half, with a supporting line, the bold indigo claim and the contact CTA opposite. Closed by a hairline. |
| 4 | `home/SplitFeature` | white | Serif headline + bold indigo lead + lime CTA / 5 capability rows. |
| 5 | `home/PrivacySlab` | indigo | Lavender `top-left` bubble carrying the product claim. No quote, no person. |
| 6 | `home/UseCaseBento` | black | 6 use cases, `7+5 · 4+4+4 · 12`. 4 photo cards with `bottom-left` overlay bubbles + 2 flat icon cards. |
| 7 | `home/SplitCta` | white | Serif headline / lime panel with the contact CTA and real contact details. |
| 8 | `home/Faq` | lavender | White sharp rows, serif questions, `+` rotating 45°. Closes with the black `.section-notch`. |
| — | `layout/Footer` | black | 5 link columns (Solutions · Product · Company · Contact · Get in touch) at `3+2+2+2+3`, hairline, wordmark row. |

---

## 11. Solutions — six detail pages from one component

`/solutions/:slug` is **data-driven, not six hand-written pages.** All six
routes render `src/pages/SolutionDetail.tsx`; everything that differs between
them lives in `src/lib/solutions.ts`.

### 11.1 The data module

`src/lib/solutions.ts` exports a typed `SOLUTIONS` array and a `getSolution()`
lookup. The six slugs are fixed and **match the section ids on `/use-cases`**,
so `/use-cases#friday-sermons` and `/solutions/friday-sermons` are always the
same subject at two depths:

`friday-sermons` · `conferences` · `business-meetings` ·
`educational-sessions` · `mosque-announcements` · `team-meetings`

Each entry carries: nav label + one-line nav description + nav icon, document
title, hero headline / bold standfirst / secondary intro / bubble line, an
accent fill, the image (literal `src`, `alt`, `data-ai-id`, dimensions), a
four-row capability checklist, a three-step how-it-works, four capability
cards, one privacy line and the closing CTA copy.

Copy is **adapted from `pages/UseCases.tsx` and `pages/Features.tsx`**, never
invented alongside them. If a claim is edited on one of those pages, the
matching entry here must move with it.

### 11.2 Section order — identical on all six

```
white split hero (headline + bold standfirst + Get in touch → /contact,
                  photo right with a bottom-left overlay bubble)
LAVENDER capability checklist (icon rows)
white numbered 3-step how-it-works
BLACK capability card bento (four equal slate cards, lime rule each)
INDIGO on-device privacy slab (lavender top-left bubble — the signature)
white closing CTA → /contact (lime panel, real contact details)
BLACK footer
```

Nothing about that structure varies between the six. The differentiation is
the copy, the photograph and one `accent` fill (periwinkle / lavender / lime)
on the hero bubble — all three of which carry `text-indigo` above 4.8:1.

The hero carries **no `.reveal`**: it is above the fold and renders at final
opacity on first paint. Everything below it uses the single shared observer in
`hooks/useReveal.ts` — never a per-element observer.

### 11.3 The Solutions mega-menu

`src/components/layout/SolutionsMenu.tsx` renders as a single `<li>` inside the
header's primary list. The `<li>` is deliberately left **static** so the panel's
`absolute inset-x-0 top-full` resolves against the nav **card** (which is
`relative`) and drops full-width beneath it.

Keyboard and a11y are part of the contract, not a nicety:

- trigger carries `aria-expanded` / `aria-controls` / `aria-haspopup`
- `ArrowDown` / `ArrowUp` on the trigger open the panel and move focus into it
- `ArrowDown` / `ArrowUp` / `Home` / `End` move between the eight panel links
- `Tab` and `Shift+Tab` are **trapped** inside the panel while it is open
- `Escape` closes and returns focus to the trigger
- an outside pointer-down, focus leaving the region, or a route change closes it

The right-hand rail links `/features` and `/use-cases` only. The reference
site's discount and free-trial cards are **not** reproduced — there is nothing
to discount and no trial to offer.

Mobile uses the drawer's collapsible **Solutions** group instead. Every link in
it still calls `setOpen(false)`, so the drawer is gone before the new route
paints. Do not remove that handler and do not move the route-change close into
an effect.

---

## 12. Pre-ship checklist

Run against every page before calling it done.

- [ ] `npm run build` and `npm run lint` both clean.
- [ ] `grep -n 'emerald' src/pages/<page>.tsx` → nothing.
- [ ] `grep -nE 'rounded-(full|lg|xl|2xl|3xl|\[)' ` → nothing.
- [ ] `grep -nE 'text-(xs|sm|base)\b'` → nothing.
- [ ] `grep -nE 'gradient|blur-|shadow-(card|frame|button)'` → nothing.
- [ ] Every `h1`/`h2`/`h3` carries `font-display font-normal`; none is italic
      or bold.
- [ ] Every text/ground pairing appears in the §1.1 table.
- [ ] No `text-white` on lime or lavender; no `text-periwinkle` on white.
- [ ] At least one `BubbleCard` with a tail, and no tailed card has
      `overflow-hidden` or a `relative` class.
- [ ] Slabs alternate; no two adjacent grounds match; last slab before the
      footer is not black.
- [ ] First section clears the floating nav (`pt-36 sm:pt-44`+).
- [ ] Above-the-fold content carries no `.reveal`.
- [ ] Every `<img src>` is byte-identical to §8.1.
- [ ] Nothing on the page is invented (§8).
- [ ] No storefront language anywhere:
      `grep -rniE 'apps\.apple|play\.google|download the app|app store|google play|waitlist|coming soon' src/`
      → nothing. Every CTA routes to `/contact`.
- [ ] All six `/solutions/*` routes resolve, and an unknown slug
      (`/solutions/nonsense`) renders `NotFound`.
- [ ] The mega-menu opens, closes on `Escape` with focus returned to the
      trigger, and is fully operable without a mouse (§11.3).
