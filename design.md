# Design System — ParthTec

Complete reference for the visual language, motion system, and component patterns used across this site.

---

## Color

All colors are CSS custom properties defined in `src/index.css`. Never use hardcoded hex in components.

### Base palette

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0B0B0D` | Page background |
| `--color-bg-raised` | `#111114` | Elevated surfaces, cards |
| `--color-ink` | `#F5F2EC` | Primary text |
| `--color-ink-dim` | `rgba(245,242,236,0.60)` | Secondary text |
| `--color-ink-faint` | `rgba(245,242,236,0.35)` | Metadata, hints, labels |
| `--color-line` | `rgba(245,242,236,0.08)` | Subtle borders, dividers |
| `--color-line-strong` | `rgba(245,242,236,0.16)` | Emphasized borders |
| `--color-accent` | `#B4B4FF` | Primary interactive — periwinkle |
| `--color-accent-dim` | `rgba(180,180,255,0.50)` | Muted accent |
| `--color-accent-soft` | `rgba(180,180,255,0.12)` | Accent background fill |

### Selection & scrollbar

- Selection: `background: var(--color-accent)`, `color: var(--color-bg)`
- Scrollbar track: transparent; thumb: `rgba(245,242,236,0.08)` → hover `var(--color-accent-dim)`, 8px wide, 4px radius

### Notable one-off colors

- Hero geometric shapes: `#3828B0`, `#5040C8`
- WhatsApp CTA: `#25D366`
- Tool brand dots: Figma `#F24E1E`, Illustrator `#FF9A00`, Photoshop `#31A8FF`, After Effects `#9999FF`, ChatGPT `#10A37F`, Claude `#CC785C`

---

## Typography

Fonts loaded via `@theme` in `src/index.css`, not `tailwind.config.js`.

### Font stacks

| Role | Family | Fallback |
|---|---|---|
| Display | Cabinet Grotesk | Helvetica Neue, Arial, sans-serif |
| Sans | General Sans | Helvetica Neue, Arial, sans-serif |
| Serif | Editorial New | Georgia, serif |
| Mono | JetBrains Mono | ui-monospace, SF Mono, Menlo, monospace |

- General Sans uses OpenType features: `"ss01" "ss02" "cv01"`

### Scale

| Class | Font | Size | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `.text-eyebrow` | Mono | 11px | 500 | 0.18em | Section labels (uppercase) |
| `.text-meta` | Mono | 11px | — | 0.08em | Timestamps, counts, captions |
| `.text-editorial` | Serif italic | varies | — | -0.01em | Sub-heading accents |
| `.text-stroke` | Sans | varies | — | — | Outline text, `color: transparent`, `-webkit-text-stroke: 1.5px rgba(245,242,236,0.38)` |
| `.text-stroke-accent` | Sans | varies | — | — | Same but stroke uses `var(--color-accent)` |
| `.text-gradient` | Sans | varies | — | — | 135° gradient: accent → ink at 0.9 |

### Fluid headline sizes

| Context | Value |
|---|---|
| Hero main headline | `clamp(52px, 9.5vw, 140px)` |
| Section `h2` | `clamp(40px, 7vw, 96px)` |
| Mid-size headings | `clamp(28px, 4–5vw, 56–68px)` |

- Letter-spacing on display: `-0.035em` to `-0.045em`
- Line-height on display: `0.88–0.90`

---

## Spacing & Layout

### Container

- Max-width: `1400px`
- Horizontal padding: `px-6` (mobile) → `md:px-10` (desktop)

### Sections

- Vertical padding: `py-32 md:py-40` (128px / 160px) — consistent across all sections
- Inter-section gap driven by section padding stacking

### Grids

| Section | Columns | Gap |
|---|---|---|
| Portfolio (websites, prototypes) | `grid-cols-1 md:grid-cols-2` | `gap-5 md:gap-8` |
| Portfolio (graphics) | `grid-cols-2 md:grid-cols-3` | `gap-5 md:gap-8` |
| Services | `grid-cols-1 md:grid-cols-[120px_1fr_1fr]` | — |
| Process | `grid-cols-1 md:grid-cols-[96px_1fr_1fr]` | — |
| Footer links | `grid-cols-2 md:grid-cols-4` | `gap-10 md:gap-16` |

### Border radius

- Cards: `rounded-2xl` (1rem)
- Pills, buttons, tags: `rounded-full`
- Small chips: `rounded-full` or `rounded-lg`

---

## Motion & Animation

### Easing (`src/lib/easings.ts`)

| Name | Cubic bezier | Use |
|---|---|---|
| `easeStudio` | `[0.22, 1, 0.36, 1]` | **Default** — all Framer Motion transitions |
| `easeOutExpo` | `[0.16, 1, 0.3, 1]` | Fast exits |
| `easeOutQuart` | `[0.25, 1, 0.5, 1]` | General out |
| `easeInOutQuart` | `[0.76, 0, 0.24, 1]` | Mask-wipe clip-path transitions |
| `lenisEase` | `1.001 - 2^(-10t)` | Lenis smooth scroll |

### Durations

| Context | Duration |
|---|---|
| State changes, dropdowns | 0.20–0.22s |
| Standard reveals, tab transitions | 0.50–0.70s |
| Section heading, SplitText | 0.90–1.05s |
| Mask-wipe utility | 1.10s |
| Hero entrance sequence | 1.4–4.4s (staggered) |
| Marquee | 35–40s (configurable) |
| Scroll-tick hint loop | 1.80s |

### Stagger delays

- Card grids: `delay: i * 0.06`
- Headings: `delay: i * 0.07–0.08`
- Tool category items: `delay: i * 0.08`

### Spring config (MagneticButton)

```
stiffness: 220
damping:   20
mass:      0.4
```

### Standard whileInView pattern

```tsx
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-40px" }}
transition={{ duration: 0.6, delay: i * 0.06, ease: easeStudio }}
```

### Hero entrance sequence (with preloader skip via sessionStorage)

| Time | Element |
|---|---|
| 0s | Preloader visible |
| 2.6s | Navbar slides in (y: -60 → 0) |
| 2.8s | Eyebrow + first glass pill |
| 2.9s | SplitText headline begins (stagger 0.07, duration 1.05) |
| 3.0s | Second glass pill |
| 3.1s | Geo ring, work badge, available badge |
| 3.2s | Italic "people" word |
| 3.38s | SplitText "remember" |
| 3.5s | Stats card progress bar |
| 3.65s | Body text + CTA buttons |
| 4.4s | Scroll hint tick |

### Tab transitions (Portfolio AnimatePresence)

```tsx
mode="wait"
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: 20 }}
transition={{ duration: 0.5, delay: i * 0.06, ease: easeStudio }}
```

---

## Smooth Scroll (Lenis)

Configured in `src/App.tsx`. **Disabled on touch devices and mobile (<768px).**

```
duration:        1.4s
easing:          lenisEase
orientation:     vertical
smoothWheel:     true
wheelMultiplier: 0.9
```

Do not add `scroll-behavior: smooth` to CSS — Lenis owns scrolling.

---

## Cursor System

Custom cursor globally replaces the native cursor (`body { cursor: none }`). Re-enabled on mobile (`md:` breakpoint). Components in `src/components/Cursor.tsx`.

| Variant | Ring size | Fill | Trigger |
|---|---|---|---|
| default | 32px | transparent border | — |
| link | 48px | transparent border | `data-cursor="link"` |
| view | 84px | filled + label | `data-cursor="view"` |
| drag | 84px | filled + label | `data-cursor="drag"` |

- Dot: 6px, instant follow (lerp 1.0)
- Ring: lerp 0.15 — lags behind for fluid feel

---

## Glass & Depth Effects

### Glassmorphism recipe (hero pills, stats card, dropdown)

```css
background:  rgba(17, 17, 20, 0.88–0.97)
border:      1–2px solid rgba(180,180,255,0.12–0.18)
box-shadow:  0 8px 32px rgba(0,0,0,0.40),
             inset 0 1px 0 rgba(255,255,255,0.08)
```

### Blur orbs (ambient background glows)

- Size: 400–900px circles
- Blur: `blur-[100px]` to `blur-[200px]`
- Opacity: 0.04–0.11
- Color: `var(--color-accent)` tints

### Grid texture

```css
background-image: linear-gradient(rgba(245,242,236,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(245,242,236,0.03) 1px, transparent 1px);
background-size: 88px 88px;  /* Hero */
background-size: 32px 32px;  /* Cards */
```

### Card hover overlay

```css
background: var(--color-accent)
opacity: 0 → 0.06
transition: 500ms
```

### Screenshot card scrim

```css
background: linear-gradient(to top, rgba(11,11,13,0.55), transparent)
```

---

## Z-Index Layers

| Layer | z-index | Element |
|---|---|---|
| Cursor dot | 9999 | `Cursor` dot |
| Cursor ring | 9998 | `Cursor` ring |
| Navbar | 80 | Fixed `<nav>` |
| Nav dropdown | 90 | Work submenu |
| Mobile menu | 75 | Full-screen nav overlay |
| Floating badges | 30 | Hero stats card, available badge |
| Glass pills | 3 | ElegantShape elements |
| Geo shapes | 3–4 | 3D ring / cube / diamond |
| Background | 0 | Grid, gradients, orbs |

---

## Utility Patterns

### Mask-wipe reveal

```css
.mask-wipe {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.1s cubic-bezier(0.76, 0, 0.24, 1);
}
.mask-wipe.in-view {
  clip-path: inset(0 0% 0 0);
}
```

### Eyebrow label anatomy

```tsx
<span className="text-eyebrow">
  <span className="text-[color:var(--color-accent)]">01</span> — Label
</span>
```

### Section skeleton

```
1. useRef + useScroll / useSpring / useTransform  →  parallax bg orb
2. Eyebrow label
3. <SplitText> h2
4. Content grid with staggered whileInView cards
5. section id for anchor nav
```

---

## Primitive Components

### SplitText (`src/components/primitives/SplitText.tsx`)

Splits text word-by-word, each word wrapped in `overflow-hidden` span.

```
initial:    y 110%, opacity 0
animate:    y 0%, opacity 1
stagger:    0.06 (default), configurable
duration:   0.9s (default)
easing:     easeStudio
trigger:    whileInView, margin "-10% 0px -10% 0px"
```

### ScrambleText (`src/components/primitives/ScrambleText.tsx`)

Random character substitution reveal.

```
charset:   A–Z, 0–9
duration:  500ms (default)
triggers:  "hover" | "mount" | "view"
```

### MagneticButton (`src/components/primitives/MagneticButton.tsx`)

Cursor-attracted wrapper with spring physics.

```
strength:  0.35 (default)
radius:    140px
spring:    stiffness 220, damping 20, mass 0.4
as:        "a" | "button" | "div"
```

### Marquee (`src/components/primitives/Marquee.tsx`)

Infinite horizontal scroll strip.

```
speed:        40s (default, via --marquee-duration CSS var)
gap:          gap-16, pr-16 between items
pauseOnHover: optional
```

Duplicates content group twice for seamless loop.

---

## Breakpoints

| Prefix | Threshold | Use |
|---|---|---|
| (none) | 0px | Mobile-first base |
| `md:` | 768px | Primary layout shift (1-col → 2-col) |
| `lg:` | 1024px | Secondary adjustments |
| `xl:` | 1280px | Show floating hero badges |

---

## Performance

- `content-visibility: auto` on `main > section:not(:first-child)` with `contain-intrinsic-size: auto 800px`
- `will-change: transform` on marquee tracks and cursor elements
- Lenis disabled on `window.matchMedia("(pointer: coarse)")` and `< 768px`
- `prefers-reduced-motion`: all durations collapse to `0.01ms`
- Images: `loading="lazy"` on all portfolio preview cards
- No iframes for project previews — static screenshots served from `public/screensohts/`

---

## Tailwind Notes

Tailwind v4 (`@tailwindcss/vite`). Config lives in the `@theme {}` block inside `src/index.css` — there is no `tailwind.config.js`.

Referencing CSS variables in JSX:

```tsx
className="text-[color:var(--color-accent)]"      // color
className="bg-[rgba(11,11,13,0.6)]"               // arbitrary rgba
className="border-[color:var(--color-line)]"       // border color
```

Path alias: `@` resolves to the project root.
