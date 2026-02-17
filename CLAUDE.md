# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Federico Marini — built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, and Three.js.

## Commands

- `npm run dev` — Start dev server with Turbopack
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run lint` — ESLint (next/core-web-vitals + next/typescript)
- No test suite is configured

## Architecture

**Routing:** Next.js App Router. The homepage (`src/app/page.tsx`) composes section components into a single-page layout with anchor navigation. Blog posts are MDX files at `src/app/blog/[slug]/page.mdx`.

**Sections** (`src/components/sections/`): Hero, About, Skills, Projects, Experience, Contact — each a self-contained component with its own data hardcoded inline.

**3D Scenes** (`src/components/hero/`): Three.js scenes (NeonScene, VonKarmanScene, LorenzScene) rendered via React Three Fiber in the hero section. Easter eggs: Konami code and triple-tap toggle "hyper mode".

**Motion** (`src/components/motion/`): Reusable Framer Motion wrappers — `Reveal` for scroll-triggered animations, `Parallax` for scroll offset, `Tilt` for hover effects.

**UI Components** (`src/components/ui/`): Variant-based components using `class-variance-authority`. Button supports `asChild` for polymorphic rendering.

**Theming:** Tailwind CSS 4 with inline `@theme` in `src/app/globals.css` — no separate tailwind.config. CSS custom properties define color tokens for light/dark modes. Neon aesthetic with glow utilities (`neon-shadow`, `neon-border`). Dark mode via `next-themes` with class-based `.dark` switching.

**Forms:** Contact form uses react-hook-form + Zod validation. API route at `src/app/api/contact/route.ts` sends email via Resend.

**Blog:** Toggled by `NEXT_PUBLIC_BLOG_ENABLED` (on in dev, off in production). Posts listed manually in `src/app/blog/page.tsx`. MDX components mapped in `src/mdx-components.tsx`.

## Key Config

- **Path alias:** `@/*` maps to `./src/*`
- **TypeScript:** Strict mode
- **MDX:** Configured in `next.config.ts` with rehype-pretty-code and remark-gfm
- **Deployment:** GitHub Actions → GitHub Pages (static export to `/out`)

## Environment Variables

- `NEXT_PUBLIC_SITE_URL` — Base URL for sitemap/metadata
- `NEXT_PUBLIC_BLOG_ENABLED` — Toggle blog visibility
- `RESEND_API_KEY` — Contact form email delivery
- `RESEND_FROM` — Email sender address
