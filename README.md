# Prathmesh Waghmare — Portfolio

A production-ready personal portfolio built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Dark, premium, motion-driven design with a signature "object-detection bounding box" hover motif — a nod to the YOLO/computer-vision work the site showcases.

---


## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve the production build locally
```

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no config file needed) |
| Animation | Framer Motion (scroll reveals, layout transitions, hover/tap states throughout), GSAP (word-stagger text reveal on the hero headline), [Lenis](https://github.com/darkroomengineering/lenis) for smooth scroll |
| UI primitives | Hand-built, shadcn-style components (`class-variance-authority`, Radix-free) |
| Icons | `lucide-react` + two hand-authored brand icons (GitHub/LinkedIn) |
| Forms | `react-hook-form` + `zod` |
| Command palette | `cmdk` (⌘K / Ctrl+K) |
| Theme | `next-themes` (dark default, light mode toggle) |
| Fonts | Self-hosted via `@fontsource` (Space Grotesk, Inter, JetBrains Mono) — no external font requests at runtime |

**A note on scope:** the original brief also mentioned Three.js for the background. I used a lightweight canvas particle system + CSS gradients instead of a full Three.js scene — it gives the same "premium animated background" feel with a fraction of the JS payload and zero risk of WebGL context issues on low-end devices. Swapping in a Three.js scene later is straightforward if you want a literal 3D layer.

---

## Editing content

**You should never need to touch component code to update your information.** Everything lives in `src/content/*.json`:

| File | Controls |
|---|---|
| `profile.json` | Name, title, tagline, bio, education, stats, resume/photo paths |
| `experience.json` | Work/research experience timeline |
| `projects.json` | Project cards (filters by `category`) |
| `research.json` | Publications list |
| `skills.json` | Skill categories + proficiency bars |
| `certifications.json` | Certification grid |
| `achievements.json` | Achievements/leadership grid |
| `gallery.json` | Masonry gallery (filters by `category`) |
| `testimonials.json` | Testimonial carousel — empty by default, shows a graceful "add testimonials" state until populated |
| `blog.json` | Blog post list — empty by default; the `/blog` page and homepage teaser both read from here |
| `socials.json` | GitHub / LinkedIn / Scholar / email / phone |

Each file is plain JSON — edit, save, and the site picks it up on next build/reload. TypeScript types for every shape live in `src/lib/content.ts`.

### Regenerating the resume PDF

`public/resume.pdf` is generated from `scripts/generate_resume_pdf.py` (Python + `reportlab`). Edit the script's content to match `profile.json`/`experience.json`/etc., then:

```bash
pip install reportlab
python3 scripts/generate_resume_pdf.py
```

### Regenerating placeholder images

`scripts/generate_placeholder_images.py` generates every placeholder SVG in `public/images/`. Re-run it if you add new project/gallery entries before you have real photos.

---

## Connecting a CMS later

Content is intentionally decoupled from components — every section component calls a `get*()` function from `src/lib/content.ts` and renders whatever it returns. To move to Sanity, Notion, or Contentful:

1. Replace the body of each `get*()` function in `src/lib/content.ts` with a fetch call to your CMS.
2. Keep the return types identical (or update the `interface`s to match your schema).
3. No component code needs to change.

---

## SEO

- Full metadata, Open Graph, and Twitter Card tags in `src/app/layout.tsx`
- JSON-LD `Person` structured data (auto-generated from `profile.json`)
- `sitemap.ts` / `robots.ts` (dynamic, App Router native)
- `public/manifest.json` for PWA installability + `public/sw.js` for basic offline app-shell caching

---

## Deployment

### Vercel (recommended)
1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Next.js** (auto-detected). No environment variables required.
4. Deploy. Add your custom domain under Project → Settings → Domains.

### Netlify
1. Push to GitHub.
2. [app.netlify.com/start](https://app.netlify.com/start) → import repo.
3. Build command: `npm run build` · Publish directory: `.next`
4. Install the **Next Runtime** plugin (Netlify auto-suggests it for Next.js repos) so App Router features (image optimization, `sitemap.ts`, etc.) work correctly.

### GitHub Pages
GitHub Pages only serves static files, so you'll need a static export:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // required for static export
  // ...keep the rest of the existing config
};
```

```bash
npm run build   # outputs to /out
```

Then push the contents of `/out` to a `gh-pages` branch (e.g. via the `gh-pages` npm package or a GitHub Action). Note: the contact form's `mailto:` fallback, theme toggle, and all client-side interactivity still work under static export — only server-only features (none are used here) would need this step.

---

## Project structure

```
src/
  app/                 # Routes (App Router): /, /blog, sitemap, robots, 404
  components/
    layout/             # Navbar, Footer, BackgroundFX, ThemeProvider, CommandPalette, smooth scroll
    sections/           # One component per portfolio section
    ui/                 # Button, Card, Badge, SectionHeading — shared primitives
    icons/               # Hand-authored brand icons
  content/              # ← Edit these JSON files to update the site
  lib/                  # content.ts (typed loader), utils.ts (cn helper)
scripts/                # Python scripts to regenerate resume.pdf and placeholder images
public/
  images/               # Profile, project, and gallery images (placeholders until you add real ones)
  resume.pdf, manifest.json, sw.js, favicon.svg
```

---

## Performance & accessibility notes

- All animations respect `prefers-reduced-motion`
- Focus-visible states on every interactive element
- Skip-to-content link for keyboard/screen-reader users
- Images use `next/image` with responsive `sizes`
- Fonts are self-hosted (no external requests, no layout shift from a slow font CDN)
