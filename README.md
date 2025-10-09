## Personal Site — Next.js 15, React 19, Tailwind 4

[![Next.js](https://img.shields.io/badge/Next.js-15-000?logo=nextdotjs)](https://nextjs.org) [![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000)](https://react.dev) [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com) [![License](https://img.shields.io/badge/license-unspecified-lightgrey)](#license)

A modern personal website: smooth motion, dark mode, accessible UI components, a neon‑style 3D hero, and a ready‑to‑use blog.

### Highlights
- **Fluid experience**: Framer Motion animations and polished micro‑interactions.
- **Consistent design**: CSS theme tokens, display typography, gradients, neon glow.
- **Dark mode**: instant, persistent theme toggle.
- **Blog**: simple static routing for quick notes and posts.

## Tech stack
- **Next.js 15 (App Router)** and **React 19**
- **Tailwind CSS 4** with design tokens in `:root`
- **Framer Motion** for reveal/scroll effects
- **Three.js + React Three Fiber + drei** for 3D scenes (`components/hero/NeonScene.tsx`)
- **next-themes** for dark/light
- **Forms** with `react-hook-form`, `zod`, toast notifications with `sonner`
- **MDX** via `@mdx-js/react` and `src/mdx-components.tsx`

## Preview GIF
Embed a short preview of the site to showcase motion and theme switching.

![Preview](./public/preview.gif)

- If the GIF is missing, add one at `public/preview.gif`.
- Tip: record a short `.mp4`, then convert to GIF (e.g. `ffmpeg -i preview.mp4 -vf "fps=30,scale=1280:-1:flags=lanczos" -loop 0 public/preview.gif`).

## Quick start
Requirements:
- Node.js 20+
- npm (or pnpm/yarn if you prefer)

```bash
git clone https://github.com/<your-username>/personal-site.git
cd personal-site
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts
```bash
# Development (Turbopack)
npm run dev

# Production build
npm run build

# Start production server (after build)
npm run start

# Lint
npm run lint
```

## Project structure
```
personal-site/
  public/            # Public assets
  src/
    app/             # App Router (home, blog, layout, providers)
    components/      # UI, motion, sections, 3D scene
    lib/             # Utilities
  eslint.config.mjs
  next.config.ts
  package.json
  postcss.config.mjs
  tsconfig.json
```

Home sections live in `src/components/sections/` (`Hero`, `About`, `Skills`, `Projects`, `Experience`, `Contact`) and are composed in `src/app/page.tsx`.

## Blog: add a post
This implementation is deliberately simple and static (great for notes/drafts):
- Post list: edit the `posts` array in `src/app/blog/page.tsx`.
- Post content: add an entry to the `content` object in `src/app/blog/[slug]/page.tsx` with `title`, `date`, `tags`, `body`.

Minimal example:
```ts
// src/app/blog/page.tsx → add to the list
{ slug: "my-new-post", title: "Title", excerpt: "Preview…", date: "2025-03-01", tags: ["AI", "Web"] }

// src/app/blog/[slug]/page.tsx → add to content
"my-new-post": {
  title: "Title",
  date: "2025-03-01",
  tags: ["AI", "Web"],
  body: "Post body…"
}
```

When you need to scale, consider MDX posts (e.g. Contentlayer and `.mdx` files) while keeping the same components.

### Enable/disable Blog
- Default: **ON in development**, **OFF in production**.
- Override by setting `NEXT_PUBLIC_BLOG_ENABLED` (or `BLOG_ENABLED`) a `"true"`/`"false"`.
- Quando è OFF: le route `/blog/*` rispondono 404 e il link in navbar è nascosto.
- Esempi:
  - Dev forzato OFF:
    ```
    NEXT_PUBLIC_BLOG_ENABLED=false
    ```
  - Prod ON:
    ```
    NEXT_PUBLIC_BLOG_ENABLED=true
    ```
  - Puoi creare un file `.env.local` e incollarci uno dei valori.

## Customize
- **Color & theme**: tweak tokens in `src/app/globals.css` (`--accent`, surfaces, gradients, neon, etc.).
- **Fonts**: set in `src/app/layout.tsx` (Geist + Bricolage Grotesque); adjust Google Fonts imports and variables.
- **SEO/Open Graph**: update `export const metadata` in `src/app/layout.tsx` (title, description, openGraph, twitter card).
- **Navbar/Footer**: components in `src/components/ui/navbar.tsx` and `src/components/layout/Footer.tsx`.

## Deploy
Recommended: **Vercel**
1. Import the repo into Vercel.
2. Framework: Next.js (auto‑detected).
3. Node 20+, no environment variables required.
4. Build and deploy.

Alternatively: local build and start with `npm run build && npm run start` on your own server.

## Contributing
Ideas, bugs, and suggestions are welcome via Issues/PRs. Feedback on design and UX is appreciated.

## License
Not specified yet. If you want to reuse parts of the code or design, please open an issue to discuss.


