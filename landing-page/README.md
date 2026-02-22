# CryoSeat — Landing Page

Demand-test landing page for CryoSeat, a retrofit heated + cooled office chair pad system.
Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file and fill in values (all optional for local dev)
cp .env.local.example .env.local

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
landing-page/
├── app/
│   ├── layout.tsx          # Root layout with metadata, OG tags, analytics
│   ├── page.tsx            # Home page — assembles all sections
│   ├── globals.css         # Tailwind base + design system utilities
│   ├── privacy/page.tsx    # Privacy policy
│   ├── terms/page.tsx      # Terms of service
│   └── api/
│       └── lead/route.ts   # Optional API route (local JSON → Supabase)
├── components/
│   ├── Analytics.tsx       # Plausible + GA4 script injection
│   ├── Nav.tsx             # Fixed top nav with scroll effect
│   ├── Hero.tsx            # Hero section with A/B variant support (?v=1|2|3)
│   ├── SocialProof.tsx     # Benefit strip
│   ├── Problem.tsx         # Problem statement with stats
│   ├── Solution.tsx        # Solution overview with feature grid
│   ├── HowItWorks.tsx      # 3-step alternating layout
│   ├── Features.tsx        # 6-feature card grid
│   ├── PricingInterest.tsx # Price band radio selection (tracks analytics)
│   ├── EmailForm.tsx       # Email capture with Formspree/API route/dev fallback
│   ├── FinalCTA.tsx        # Final CTA wrapping EmailForm
│   └── Footer.tsx          # Footer with nav and disclaimer
└── lib/
    └── analytics.ts        # Event tracking wrapper (Plausible + GA4)
```

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Your Plausible domain (e.g. `cryoseat.com`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | GA4 Measurement ID (e.g. `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_FORMSPREE_ID` | No | Formspree form ID (backendless email backend) |
| `NEXT_PUBLIC_USE_API_ROUTE` | No | Set `true` to use `/api/lead` instead of Formspree |
| `SUPABASE_URL` | No | Supabase project URL (for production API route) |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Supabase service role key (server-side only) |
| `NEXT_PUBLIC_SITE_URL` | No | Full URL for OG tags (e.g. `https://cryoseat.com`) |

**The page works without any of these set.** In dev mode without Formspree, form submissions log to the console.

---

## Email Backend Options

### Option A: Formspree (recommended for launch)

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form, copy the Form ID
3. Set `NEXT_PUBLIC_FORMSPREE_ID=your_form_id` in `.env.local`
4. Leave `NEXT_PUBLIC_USE_API_ROUTE` unset or `false`

### Option B: API Route (local dev → Supabase)

1. Set `NEXT_PUBLIC_USE_API_ROUTE=true` in `.env.local`
2. In dev: submissions save to `./data/leads.json` automatically
3. In production: set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

**Supabase setup** (when ready to go production):
```sql
-- Run in Supabase SQL editor
create table leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  price_band text,
  created_at timestamptz default now(),
  referrer text
);

-- Row Level Security
alter table leads enable row level security;
-- Only service role can insert/read (no client access needed)
```

---

## A/B Testing

The hero headline supports 3 variants via query parameter:

- `/?v=1` — "Your chair. Your temperature. Always." (default)
- `/?v=2` — "Eight Sleep for your workday."
- `/?v=3` — "Stop adjusting the thermostat."

Use these URLs in your ad campaigns to measure which headline converts best. Analytics events include the variant number automatically.

---

## Analytics Events

All events fire to Plausible and/or GA4 when configured:

| Event | Trigger |
|---|---|
| `hero_cta_click` | Hero "Join Waitlist" button |
| `nav_cta_click` | Nav "Join Waitlist" button |
| `reserve_click` | Form "Reserve My Spot" button |
| `email_form_submit` | Form submission attempt |
| `email_form_success` | Successful submission |
| `email_form_error` | Failed submission |
| `price_band_select` | User selects a price band |
| `faq_expand` | User opens an FAQ item |
| `referral_share` | User copies referral link |

---

## Images

Place images in `public/images/`. The components expect these files:

| File | Size | Usage |
|---|---|---|
| `hero.png` | 1600×900 | Hero product render |
| `lifestyle-office.png` | 1600×1067 | Solution section |
| `texture-detail.png` | 1200×1200 | How It Works step 1 |
| `app-screen.png` | 390×844 | How It Works step 2 |
| `thermal-diagram.png` | 1200×900 | How It Works step 3 |
| `og-card.png` | 1200×630 | Open Graph card |

See `IMAGE_PROMPTS.md` (in repo root) for Midjourney/DALL·E generation prompts.

**Until images are ready**, the components show styled placeholder boxes — the page is fully functional without them.

---

## Deploy to Vercel

```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel

# Option 2: GitHub integration
# 1. Push this directory to a GitHub repo
# 2. Go to vercel.com → New Project → Import repo
# 3. Set root directory to `landing-page/`
# 4. Add environment variables in Vercel dashboard
# 5. Deploy
```

**Vercel settings:**
- Framework Preset: Next.js (auto-detected)
- Root Directory: `landing-page`
- Node.js Version: 20.x
- No build command override needed

---

## Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript check without emitting
```

---

## Performance Notes

- All images use `next/image` for automatic optimization and lazy loading
- Analytics scripts load with `strategy="afterInteractive"` to not block LCP
- No JavaScript dependencies beyond React/Next.js core
- Target Lighthouse score: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO

---

## Customization Checklist

Before going live, update:

- [ ] `app/layout.tsx` — update `siteUrl`, title, description, OG image
- [ ] `components/Footer.tsx` — update company name, contact email
- [ ] `components/EmailForm.tsx` — update fallback email address
- [ ] `.env.local` — set Formspree ID or API route preference
- [ ] `public/images/` — add generated product images
- [ ] `public/favicon.ico` — replace with your favicon
- [ ] `public/manifest.json` — create PWA manifest if needed
- [ ] `/privacy` and `/terms` pages — review and update legal text
