# Crescent Universal — Website

Full multi-page website for Crescent Universal, a Chennai web design & digital marketing
studio. Built with React 19 + TypeScript + Vite, React Router, Framer Motion, GSAP, and a
3D globe (Three.js / React Three Fiber / drei) in the hero.

## Running it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To produce a production build:

```bash
npm run build
npm run preview
```

## Tech stack

- **React 19 + TypeScript + Vite** — core
- **Tailwind CSS v4** — styling, theme in `src/index.css`
- **React Router 7** — real pages for Home / Profile / Services / Products / Contact,
  not scroll-to-anchor
- **Framer Motion** — page transitions, scroll reveals, hover/tap micro-interactions,
  the 3D-tilt Services cards, the chat widget and cookie banner animations
- **GSAP + ScrollTrigger** — the staggered stats-band reveal on Home
- **Three.js / React Three Fiber / drei** — the 3D globe in the Home hero (lazy-loaded,
  so it only downloads for visitors who land on Home)
- **EmailJS** — sends the Contact form with no backend required
- **lucide-react** — icons (plus two hand-built brand icons for Instagram/WhatsApp,
  since lucide no longer ships brand marks)

## Setting up the contact form (EmailJS)

1. Copy `.env.example` to `.env`
2. Go to [emailjs.com](https://www.emailjs.com), create a free account
3. **Email Services** → add a service (e.g. connect your Gmail) → copy the **Service ID**
4. **Email Templates** → create a template using the variables `{{from_name}}`,
   `{{from_email}}`, `{{phone}}`, `{{message}}` → copy the **Template ID**
5. **Account → General** → copy your **Public Key**
6. Paste all three into `.env`, restart `npm run dev`

Until `.env` is filled in, the form shows a clear "not connected yet" message instead of
silently failing.

## What's built

- **Design system** — navy/bronze/sky-blue palette pulled from your logo, Space Grotesk +
  Inter + JetBrains Mono type system, all in `src/index.css`
- **Navbar + Footer** — real React Router links, animated mobile menu, active-page indicator
- **Home** — 3D globe hero (Chennai as the hub, arcs to Dubai/London/New York/Singapore/
  Tokyo/Sydney), GSAP-animated stats band, services grid, product cards, testimonials,
  closing CTA
- **Profile** — company story, "Go Global" mission band, 4 differentiators, a 5-step
  "how a project runs" timeline
- **Services** — all 6 services as detailed, mouse-tilt 3D cards
- **Products** — package comparison with a "best for" line each, plus a popular add-ons
  section; every package ends in "Get a Custom Quote" rather than a fixed price (see the
  comment in `src/data/site.ts` if you'd rather show fixed numbers)
- **Contact** — working form (name/email/phone/message), your chosen simple styled
  "I'm not a robot" checkbox, a hidden honeypot field for basic spam filtering, EmailJS
  wiring, an embedded map, and direct email/phone/address details
- **Cookie/privacy banner** — bottom-of-page, Accept/Decline, remembers the choice
  (`localStorage`), reappears only if never answered
- **Floating buttons** — Instagram + WhatsApp + a chat trigger, stacked bottom-right,
  shifting up out of the way while the cookie banner is showing
- **AI chat widget** — slide-in panel with a placeholder assistant (keyword-based replies
  about services/pricing/contact) — the UI is real and complete; swap the logic in
  `src/lib/chatbot.ts` for a real AI backend call whenever that's ready
- Reduced-motion respected (the globe's rotation and the base stylesheet both check
  `prefers-reduced-motion`)

## Things to confirm or fill in

Open `src/data/site.ts`:

- `whatsappNumber` and `instagramHandle` — still blank (`// TODO` comments mark them).
  The footer and floating icons render either way, but won't link anywhere until these
  are set.
- `address` — I found "No. A-11, Mogappair Industrial Estate, Chennai, Tamil Nadu 600037"
  via a public business directory listing, **not confirmed by you** — please check it's
  still correct, since the Contact page map depends on it.
- The three Home page testimonials are placeholder copy, marked with a comment — swap
  them for real client quotes before this goes live.

## Before this goes live

- Fill in the three items above
- Set up the EmailJS keys (or swap in your own backend)
- Get a real domain-verified favicon/social preview image if you want one beyond the
  cropped logo mark currently in `public/`
- Consider a real privacy policy page if you want the cookie banner to link to one —
  that's a legal document specific to your actual data practices, so it's intentionally
  left out rather than guessed at here
