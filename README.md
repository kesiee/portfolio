# Shashank Kammanahalli — Portfolio

Personal portfolio website for Shashank Kammanahalli Chandra Sekhara (Kesiee), AI/ML Engineer & Data Scientist.

> Vibe coded with Claude ✦ Built with Next.js & Tailwind

---

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Styling** — Tailwind CSS v4
- **Animations** — Framer Motion
- **Fonts** — DM Serif Display (headings) + DM Sans (body) + JetBrains Mono (code)
- **Contact Form** — Formspree
- **Deploy** — Vercel

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
app/
  layout.tsx          # SEO meta, fonts, ThemeProvider
  page.tsx            # Single-page composition
  globals.css         # CSS variables (dark + light themes)
  resume/
    page.tsx          # Printable HTML resume
components/
  Navbar.tsx          # Sticky nav + dark/light toggle
  Hero.tsx            # Full-viewport hero
  About.tsx           # Bio, stats, education
  Skills.tsx          # Grouped skill pills
  Projects.tsx        # Project cards
  Experience.tsx      # Timeline
  Publications.tsx    # IEEE papers
  Contact.tsx         # Form + social links
  Footer.tsx
  ThemeProvider.tsx   # Dark/light theme context
lib/
  data.ts             # All content (edit this to update the site)
```

---

## Updating Content

All site content lives in **`lib/data.ts`**. Edit that file to update skills, projects, experience, or personal info — no need to touch individual components.

---

## Contact Form Setup

The form uses [Formspree](https://formspree.io) (free tier — 50 submissions/month).

1. Sign up at formspree.io with your email
2. Create a new form → copy the form ID
3. In `components/Contact.tsx`, replace the endpoint:

```ts
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```

---

## Resume

The resume is a live HTML page at `/resume`, generated from the original LaTeX source.

- View at `/resume`
- Click **"Save as PDF"** → browser print dialog → Save as PDF
- To update content, edit `app/resume/page.tsx`

---

## Deployment

```bash
npx vercel --prod
```

Or connect the repo to [vercel.com](https://vercel.com) for automatic deploys on push. The `vercel.json` config is already included.

---

## License

MIT
