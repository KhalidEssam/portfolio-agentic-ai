# Portfolio Redesign — Design Spec
**Date:** 2026-05-10  
**Author:** Khaled Esam (via brainstorming session)  
**Status:** Approved — ready for implementation

---

## 1. Overview

Complete visual and animation overhaul of the existing single-page portfolio at `khaled-developer.vercel.app`. The site remains a Next.js 14 SPA — no routing changes. The redesign targets a premium 2026 dark developer aesthetic combining **Obsidian + Neon Green + Cosmic Violet** inspired by the approved animation demo.

All existing data (`profileData.json`), the AI chat widget (`ChatWidget.tsx`), the chat API route (`/api/chat/route.ts`), and `profileLoader.ts` are **unchanged**.

---

## 2. Color System

| Token | Value | Usage |
|---|---|---|
| `obsidian` | `#080808` | Page background |
| `dark-card` | `#0d0d12` | Card backgrounds |
| `dark-border` | `rgba(255,255,255,0.07)` | Default borders |
| `green` | `#00ff88` | Primary accent — CTAs, active states, Backend category, numbered project labels, timeline active dot |
| `green-dim` | `rgba(0,255,136,0.08)` | Green tinted backgrounds |
| `green-border` | `rgba(0,255,136,0.22)` | Green borders |
| `violet` | `#7c3aed` | Secondary accent — gradient fills, aurora orb base |
| `violet-light` | `#a78bfa` | Violet text, Rawaq accents, Frontend category |
| `violet-dim` | `rgba(139,92,246,0.10)` | Violet tinted backgrounds |
| `violet-border` | `rgba(139,92,246,0.22)` | Violet borders |
| `muted` | `#475569` | Secondary body text |
| `subtle` | `#64748b` | Tertiary text, placeholders |

**Dark mode only** — no light mode toggle. The `dark:` class variants in Tailwind are replaced with direct obsidian values. The existing `isDark` / `toggleTheme` logic in Navbar is removed.

Tailwind config gains the above tokens under `colors.brand.*` and updates `dark.bg` to `#080808`, `dark.card` to `#0d0d12`.

---

## 3. Typography

Font stays **Inter** (already configured). No font changes. Heading weights bump to `font-black` (900) for hero and section titles.

---

## 4. Architecture — Approach A

### New files

```
src/
  components/
    ui/
      AnimatedSection.tsx      — IntersectionObserver scroll-reveal wrapper (Framer Motion)
      GlowCard.tsx             — Card with configurable green/violet border glow on hover
      SectionHeader.tsx        — Numbered label (e.g. "01 — About") + h2 + green underline
      ScrollProgressPill.tsx   — Fixed floating glass pill scroll indicator (right edge)
  hooks/
    useActiveSection.ts     — IntersectionObserver → returns currently visible section id
  lib/
    animations.ts           — Framer Motion variant library (fadeUp, slideLeft, stagger, etc.)
```

### Refactored files (in-place, same filenames)

```
src/components/Navbar.tsx
src/components/Hero.tsx
src/components/About.tsx
src/components/Skills.tsx
src/components/Projects.tsx
src/components/Experience.tsx
src/components/Contact.tsx
src/components/Footer.tsx
src/app/globals.css
src/app/layout.tsx          — adds "Rawaq" nav link only
tailwind.config.ts          — new color tokens + remove unused animations
```

### Unchanged files

```
src/components/ChatWidget.tsx
src/app/page.tsx
src/app/api/chat/route.ts
src/lib/profileLoader.ts
src/data/profileData.json
```

The **section order in `page.tsx` gains two new imports**: `Founder` (the Rawaq section, inserted between `About` and `Skills`) and `ScrollProgressPill` (rendered outside `<main>`, alongside `Navbar`, `Footer`, and `ChatWidget`). `page.tsx` gets two new import lines — no structural changes beyond that.

---

## 5. New Shared Primitives

### `AnimatedSection.tsx`
- Props: `children`, `delay?: number`, `direction?: 'up' | 'left' | 'right' | 'scale'`
- Wraps children in a Framer Motion `motion.div` with `useInView` (threshold 0.12, margin `-40px`)
- On enter: `opacity 0→1`, `translateY(36px)→0` with `cubic-bezier(0.22,1,0.36,1)` spring
- Delay is applied via Framer Motion `transition.delay`

### `GlowCard.tsx`
- Props: `children`, `variant?: 'green' | 'violet' | 'neutral'`, `className?`
- Renders a `div` with `background: dark-card`, border color per variant
- Hover: `whileHover={{ y: -4 }}` + box-shadow glow matching variant color
- `green` variant adds `animation: glow-border 3s ease-in-out infinite` when `active` prop is true

### `SectionHeader.tsx`
- Props: `index: string` (e.g. `"01"`), `label: string` (e.g. `"About"`), `title: string`
- Renders: numbered label in green uppercase → h2 in white → 32px green underline bar
- Wraps in `AnimatedSection direction="up"`

### `useActiveSection.ts`
- Observes all section elements by id (`about`, `rawaq`, `skills`, `projects`, `experience`, `contact`)
- Returns the id of the topmost visible section
- Used exclusively by `Navbar` to drive the active link indicator

### `ScrollProgressPill.tsx`
- Fixed position: `right: 20px`, vertically centered (`top: 50%`, `transform: translateY(-50%)`)
- Hidden on `< lg` screens (too narrow on mobile/tablet)
- **Structure** (top to bottom inside the pill):
  1. **Scroll %** — integer percentage of page scrolled, animates with `useMotionValue` + `useTransform`. Updates on `window.scroll` via Framer Motion `useScroll`.
  2. `done` label — 7px uppercase muted text
  3. Thin horizontal divider
  4. **Section dots** — 6 dots, one per section (`about`, `rawaq`, `skills`, `projects`, `experience`, `contact`). Active dot morphs from `4×4px circle` → `4×14px rounded bar` via Framer Motion `layout` animation. Past dots: dim green (`rgba(0,255,136,0.35)`). Upcoming: muted gray.
  5. Thin horizontal divider
  6. **Current section name** — rotated 180° vertical text, green, uppercase, 8px, letter-spacing. Animates between section names with Framer Motion `AnimatePresence` (fade + slide).
- **Pill container**: `background: rgba(8,8,8,0.90)`, `border: 1px solid rgba(0,255,136,0.22)`, `border-radius: 40px`, `backdrop-filter: blur(12px)`, `box-shadow: 0 0 24px rgba(0,255,136,0.08)`
- Pill entrance: fades in after 1.5s delay (waits for hero animation to complete)
- Driven by `useActiveSection` hook (shared with Navbar) and Framer Motion `useScroll`

### `animations.ts`
- Exports Framer Motion `Variants` objects:
  - `fadeUp` — `{ hidden: { opacity:0, y:36 }, visible: { opacity:1, y:0 } }`
  - `fadeLeft` / `fadeRight` — same with x offset
  - `scaleIn` — `{ hidden: { opacity:0, scale:0.93 }, visible: { opacity:1, scale:1 } }`
  - `staggerContainer` — `{ visible: { transition: { staggerChildren: 0.08 } } }`
  - `pillPop` — `{ hidden: { opacity:0, scale:0.75 }, visible: { opacity:1, scale:1 } }` with spring
  - `slideInLeft` — used for project cards
- All use `transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }` (custom cubic bezier)

---

## 6. Section Designs

### 6.1 Navbar
- Sticky, `position: fixed top-0`
- Background: `rgba(8,8,8,0.60)` → `rgba(8,8,8,0.92)` on scroll (threshold: `scrollY > 40`)
- `backdrop-filter: blur(16px)`
- Logo: `Khaled` + `.` in green, font-weight 800
- Links: `About · Rawaq · Skills · Projects · Experience · Contact`
- Active link: white text + animated green underline (width 0→100% via Framer Motion `layoutId` or CSS transition)
- Right: green `Hire Me` button (links to `#contact`)
- **No dark mode toggle** (dark-only design)
- Mobile: hamburger → slide-down menu with Framer Motion height animation
- Active section driven by `useActiveSection` hook

### 6.2 Hero
- Full-viewport split layout: **left text column** / **right code card**
- **Background**: 3 radial orb glows (violet top-right, green bottom-left, small violet center) + subtle particle canvas (55 green particles drifting)
- **Left column** (staggered entrance, 100ms between each):
  1. Status chip: pulsing green dot + "Open to opportunities"
  2. Role line: uppercase muted text — "Full-Stack Developer · AI Enthusiast · Founder"
  3. Headline: `Hi, I'm` + `Khaled Esam` with green→violet gradient fill, font-size 46px, font-weight 900
  4. Tagline: 2-line description mentioning Rawaq.app in violet
  5. CTA row: green `Get in Touch` button + ghost `View Projects →`
  6. Social links: GitHub · LinkedIn · Twitter with green underline on hover
- **Right column** — `engineer.ts` code card:
  - Green border glow, `glow-border` pulsing animation
  - Continuous float animation (translateY 0→-12px, 5s ease-in-out loop)
  - Typewriter effect: lines appear one by one after mount (260ms per line)
  - Content: `stack`, `ai`, `founder: 'Rawaq.app'`, `available: true`, `remote: true`, `yoe: 4`
  - Blinking cursor on last line

### 6.3 About (`id="about"`)
- **Section number**: 01 — About
- 2-column grid: bio + meta left, 4 stat cards right
- Bio paragraph references BMC, EXOLN, and Rawaq.app
- Meta rows with green icon tiles: Location · Availability · Education · Languages
- "Looking For" pills: `Mid-Senior Full-Stack` (green) · `AI/ML Engineer` (violet) · `Full-time · Contract · Consulting` (neutral)
- Stat cards (2×2 grid):
  - `4+` Years Experience
  - `2` Current Roles
  - `1` Startup Founded (violet border)
  - `AWS ✓` Certified (green border)
- Left column: `AnimatedSection direction="left"`, right column: `direction="right"`
- Stat cards: staggered scale-in on scroll

### 6.4 Rawaq / Founder (`id="rawaq"`) — **New section**
- **Section number**: 02 — Founder
- Background: subtle violet tint + violet orb top-right + green orb bottom-center
- Single large `GlowCard variant="violet"` spanning full width
- **Card top** (grid: text left, status badge right):
  - Badge: "🚀 Founder & Solo Developer" (violet pill)
  - Name: `Rawaq` + `.app` with violet→green gradient on `.app`
  - Tagline: describes social community platform + B2B event marketplace
  - Platform badges: "🌐 Next.js Platform" · "📱 React Native App" · "⚡ Serverless Backend"
  - Status: pulsing green dot + "In Development"
- **Card middle** (2-column):
  - Left: "🎟️ Event Marketplace" — organizer tools, real-time sales, QR check-in
  - Right: "👥 Community Layer" — social discovery, Supabase Realtime feeds, presence
- **Card footer** (tags + link):
  - Tags (staggered pop-in): `Next.js` · `React Native` · `Supabase PostgreSQL` · `Realtime + RLS` · `Redis / Upstash` · `Serverless` · `OTA Updates` · `TypeScript`
  - `rawaq.app ↗` link button (violet border)
- Card entrance: `scaleIn` animation on scroll

### 6.5 Skills (`id="skills"`)
- **Section number**: 03 — Skills
- 3-column CSS grid, 5 cards total:
  - **Backend** (green, spans 2 columns) — "Core Expertise" label top-right
  - **Frontend** (violet, 1 column)
  - **AI/ML** (neutral)
  - **DevOps** (neutral)
  - **Tools** (neutral)
- Cards stagger in with 100ms delay between each on scroll enter
- Each card: `GlowCard` with hover lift + colored box-shadow
- Pills inside each card use `pillPop` stagger variant

### 6.6 Projects (`id="projects"`)
- **Section number**: 04 — Projects
- Numbered minimal style: `01`, `02`, `03`
- Project number floats above card border (absolute positioned, `background: #080808` to cut border)
- Project 01 (active state): `glow-border` animation + green border permanently visible
- Projects 02/03: neutral border → green border + `translateX(6px)` on hover
- On hover: project name transitions to green, link icon becomes visible
- Cards slide in from left with stagger (120ms delay) on scroll enter
- Tech tags: primary tech in green, secondary in violet, rest neutral

### 6.7 Experience (`id="experience"`)
- **Section number**: 05 — Experience
- Vertical timeline, left-aligned
- Timeline line: gradient `green→violet→transparent`, draws from top to bottom via `scaleY(0→1)` on scroll enter (1.2s duration)
- Active role (BMC, most recent): green dot with pulse animation + green border card
- Other roles: neutral dot → green border on hover + `translateX(5px)`
- Each card: `AnimatedSection direction="up"` with staggered delays (100ms apart)
- Education entries: shown below experience as compact cards (no timeline)

### 6.8 Contact (`id="contact"`)
- **Section number**: 06 — Contact
- Centered layout, max-width 600px
- Title: "Let's Build Together"
- 4 contact cards (2×2 grid): Email · Phone · Location · Website
  - Each with green icon tile, stagger on scroll (90ms delay)
- Social buttons: GitHub · LinkedIn · Twitter — stagger after cards (350ms offset)
- Hover on cards: `translateY(-3px)` + green border + green box-shadow
- Hover on social buttons: `translateY(-3px)` + green border + green glow

### 6.9 Footer
- Minimal single row: copyright left, "↑ Back to top" right
- Back to top: border button, green on hover, `scrollTo({top:0,behavior:'smooth'})`

---

## 7. Animation System Summary

All Framer Motion animations use `cubic-bezier(0.22, 1, 0.36, 1)` — a fast-out spring feel.

| Animation | Trigger | Duration |
|---|---|---|
| Hero elements stagger | On mount | 0.6s, 100ms between items |
| Code card typewriter | On mount, 900ms delay | 260ms per line |
| Code card float | Continuous | 5s loop |
| Code card glow | Continuous | 3s loop |
| Background orbs breathe | Continuous | 7–11s loop |
| Section scroll reveals | IntersectionObserver (0.12 threshold) | 0.65s |
| Skills card stagger | On section enter | 100ms between cards |
| Skill pill stagger | On card enter | 60ms between pills |
| Project cards slide-left | On section enter | 120ms between cards |
| Timeline line draw | On section enter | 1.2s |
| Contact card stagger | On section enter | 90ms between cards |
| Navbar underline slide | On active section change | 0.25s |
| ScrollProgressPill entrance | 1.5s after mount | 0.5s fade-in |
| Scroll % counter | On scroll (useScroll) | Real-time motion value |
| Active dot morph (circle→bar) | On section change | 0.3s spring layout |
| Section name swap | On section change | 0.25s fade + slide |
| Button hover lift | Hover | 0.2s |
| Card hover lift | Hover | 0.25s |

---

## 8. Responsiveness

- **Mobile-first** Tailwind approach
- Hero: stacks to single column on `< md`, code card moves below text
- Skills grid: `1fr` on mobile, `1fr 1fr` on `sm`, `1fr 1fr 1fr` on `lg`
- Rawaq card: single-column middle section on mobile
- Experience: timeline left-aligned on all screens (no alternating)
- Navbar: hamburger menu on mobile with Framer Motion slide-down animation
- Contact grid: `1fr` on mobile, `1fr 1fr` on `sm`

---

## 9. Performance Constraints

- `"use client"` only on components that use Framer Motion or hooks
- `AnimatedSection` uses `once: true` on `useInView` — no re-triggering on scroll up
- Particle canvas: max 55 particles, only in Hero section
- Background orbs: CSS `radial-gradient` only — no SVG or canvas
- No `layout` animations (too expensive) — use `animate` only
- `framer-motion` tree-shaken — only import used primitives (`motion`, `useInView`, `AnimatePresence`)

---

## 10. Out of Scope

- Light mode
- Multi-page routing
- Contact form with server submission (contact section remains links-only)
- CV/resume download button
- Blog or writing section
- i18n / RTL support
