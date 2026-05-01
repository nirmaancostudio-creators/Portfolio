# Nirmaan & Co. — Portfolio Website

A design and web studio portfolio for small businesses. Built with React, Vite, TypeScript, Tailwind CSS v4, and Framer Motion.

## Stack

- **React 19** + **TypeScript**
- **Vite 6** — build tool
- **Tailwind CSS v4** — via `@tailwindcss/vite`, configured with `@theme` in `index.css`
- **Framer Motion** (`motion/react`) — all animations and scroll parallax
- **Lenis** — smooth scrolling (desktop only)
- **React Router DOM v7** — for the `/corporate` deck viewer route

## Project Structure

```
src/
├── components/         # All page sections and UI components
│   ├── primitives/     # Reusable atoms (SplitText, Marquee, MagneticButton, etc.)
│   ├── Portfolio.tsx   # Main work showcase — Websites, Graphics, Corporates, Prototypes, Automation tabs
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Contact.tsx
│   └── ...
├── data/
│   └── decks.ts        # Corporate presentation deck data
├── pages/
│   └── CorporatePage.tsx  # Full-screen slide viewer at /corporate?deck=ppt1|ppt3
├── lib/
│   └── easings.ts      # Custom easing curves
└── App.tsx             # BrowserRouter + routes + Lenis setup

public/
├── works/
│   ├── graphics/       # Social, Marketing, Branding, Print images
│   └── corporate/      # PPT1 (8 slides) and PPT3 (20 slides)
└── screensohts/        # Website preview screenshots
```

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000`

3. Type-check:
   ```bash
   npx tsc --noEmit
   ```

## Build & Deploy

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

Deployed on **Netlify**. The `netlify.toml` at the project root configures:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: all routes → `index.html` (required for React Router)

## Contact

**Email:** nirmaancostudio@gmail.com
