# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (defaults to port 3000, auto-increments if busy)
npm run build    # production build (output: dist/)
npm run preview  # serve the production build locally
npx tsc --noEmit # type-check without emitting (note: one pre-existing error in src/lib/useScrollReveal.ts is benign)
```

There are no tests. There is no linter configured.

## Architecture

Single-page React + Vite + TypeScript app. No routing — one scrolling page composed of section components.

### Page order (`src/App.tsx`)
```
Preloader → Navbar → Hero → Clients → Portfolio → Graphics → Corporates → Prototypes
→ Services → Tools → Process → FAQ → Contact → Footer
```
Each section is a self-contained component in `src/components/`. New sections go there and are imported/rendered in `App.tsx`.

### Animation system
All motion uses `motion/react` (Framer Motion v6+). The standard scroll-parallax pattern used in every section:
```ts
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20, mass: 0.4 });
const bgY = useTransform(smooth, [0, 1], ["-8%", "8%"]);
```
Card entrances always use `initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}` with `delay: i * 0.08` stagger. Use `easeStudio` from `src/lib/easings.ts` for all transitions.

Smooth scrolling is provided by Lenis (configured in `App.tsx`) — do not add `scroll-behavior: smooth` to CSS.

### Design tokens (`src/index.css`)
All colors are CSS custom properties — **never use hardcoded hex values in components**:
- `--color-bg` (#0B0B0D), `--color-bg-raised`
- `--color-ink`, `--color-ink-dim`, `--color-ink-faint`
- `--color-line`, `--color-line-strong`
- `--color-accent` (#B4B4FF lilac), `--color-accent-dim`, `--color-accent-soft`

Tailwind v4 (`@tailwindcss/vite`) is used with the `@theme` block in `index.css` rather than `tailwind.config.js`. Color references in JSX use `text-[color:var(--color-accent)]` syntax.

### Typography utilities (defined in `src/index.css`)
- `.text-eyebrow` — mono, 11px, uppercase, spaced (section labels)
- `.text-meta` — mono, 11px, faint (timestamps, counts, captions)
- `.text-editorial` — serif italic (sub-headings)
- `.text-stroke` / `.text-stroke-accent` — outlined text

### Reusable primitives (`src/components/primitives/`)
- `SplitText` — animated word-by-word heading reveal; use for all `h2` section headings
- `ScrambleText` — character scramble on hover/mount/view
- `MagneticButton` — cursor-attracted button/link wrapper
- `Marquee` — infinite scrolling strip (used in Clients)
- `LocalTime` — live IST clock (used in Navbar)

### Section anatomy convention
Every section follows this structure:
1. `useRef` + `useScroll/useSpring/useTransform` for parallax background orb
2. Eyebrow label: `<span className="text-eyebrow"><span className="text-[color:var(--color-accent)]">0N</span> — Label</span>`
3. `<SplitText>` heading
4. Content grid with staggered `whileInView` card animations
5. Section `id` for anchor navigation

### Cursor system
`body { cursor: none }` globally; the custom `Cursor` component (`src/components/Cursor.tsx`) renders a software cursor. Elements that should trigger cursor variants use `data-cursor="link"` or `data-cursor="view"` attributes.

### Environment
Requires `GEMINI_API_KEY` in `.env.local` (only needed if using the AI/Gemini features — not required for the marketing site itself).

### Path alias
`@` resolves to the project root (e.g. `@/src/lib/easings`).
