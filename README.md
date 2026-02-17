# The ADHD Diary Project

**Live site:** [adhddiaryproject.com](https://adhddiaryproject.com)
**Repo:** github.com/tiff-cpu/adhd-letter-project
**Hosted on:** Vercel (auto-deploys from main branch)
**Database:** Supabase

## What This Is

An anonymous diary for ADHD brains. People can read and write diary entries without creating an account. No advice, no therapy, no toxic positivity — just real words from people whose brains work the same way.

Built by Tiffany Paiva (@tifftheadhddentist).

## Tech Stack

- **Framework:** Next.js 14.2.5 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom config
- **Database:** Supabase (PostgreSQL)
- **Auth:** None yet (Phase 3)
- **Payments:** None yet (Phase 3)
- **Hosting:** Vercel (Hobby plan)
- **Analytics:** Vercel Web Analytics
- **Domain:** adhddiaryproject.com

## Brand & Design

- **Aesthetic:** White, minimal, emotionally quiet
- **Body font:** Lora (serif)
- **Nav font:** Outfit (sans-serif)
- **Handwriting fonts (entries):** Permanent Marker, Reenie Beanie, Nothing You Could Do, Covered By Your Grace, Allura, Courier New
- **Colors defined in Tailwind config:**
  - espresso (dark brown, primary text)
  - coffee (medium brown, secondary text)
  - softbrown (light brown, muted text)
  - blush (light pink/beige, borders)
  - amber (accent, links)

## Project Structure

```
app/
  page.tsx              — Homepage (random entry card, thumbs up/down, back/forward arrows, email signup, coming soon section)
  layout.tsx            — Root layout (nav, footer, Google Fonts, Vercel Analytics)
  globals.css           — Global styles including note-card class
  write/
    page.tsx            — Write an entry (textarea, mood picker, vibe/font dropdown, crisis popup)
  about/
    page.tsx            — About Tiff (photo, bio, clarity call link, email list link)
  resources/
    page.tsx            — ADHD resources + crisis links + clarity call link
  privacy/
    page.tsx            — Privacy policy
  admin/
    page.tsx            — Admin panel (approve/reject pending entries, manage entries)
  open-when/
    page.tsx            — Index page (5 clickable links with arrows)
    spiraling/
      page.tsx          — "Open When Your Brain Won't Stop Spiraling" (RSD/rejection)
    feeling-behind/
      page.tsx          — "Open When You Feel Behind"
    ashamed/
      page.tsx          — "Open When the Shame Won't Let Go"
    missed-a-deadline/
      page.tsx          — "Open When You Missed a Deadline"
    ghosted-someone/
      page.tsx          — "Open When You Ghosted Someone"
  api/
    notes/
      random/route.ts   — GET: returns random approved entry with font_family
      submit/route.ts   — POST: submits entry (moderation + crisis detection + auto-approve)
      react/route.ts    — POST: records helped/not_for_me reaction
      report/route.ts   — POST: flags entry for review
      stats/route.ts    — GET: returns read count + helped percentage
    emails/
      route.ts          — POST: stores email signup

components/
  Nav.tsx               — Top nav (desktop + mobile hamburger menu)
  CrisisPopup.tsx       — Modal shown when crisis content detected (988 link, rewrite option)

lib/
  supabase-admin.ts     — Supabase admin client (uses service role key)
  modes.ts              — Entry mood/mode options
  fonts.ts              — Font mapping utilities

public/
  tiff.jpg              — Tiff's headshot for about page
```

## Database Schema (Supabase)

### notes
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| body | text | Entry content (sanitized) |
| mode | text | Mood category (all, burnout, shame, etc.) |
| font_family | text | Stored font (permanent-marker, reenie-beanie, nothing-you-could-do, covered-by-your-grace, allura, courier-new) |
| status | text | "approved" or "pending" |
| created_at | timestamptz | Auto-generated |

### feedback
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| note_id | uuid | References notes.id |
| reaction | text | "helped" or "not_for_me" |
| created_at | timestamptz | Auto-generated |

### reports
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| note_id | uuid | References notes.id |
| reason | text | Optional report reason |
| created_at | timestamptz | Auto-generated |

### emails
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| email | text | Subscriber email |
| created_at | timestamptz | Auto-generated |

## Key Features

### Entry Display (Homepage)
- Random approved entry shown in its stored handwriting font
- Back/forward arrows to navigate entry history (client-side)
- Thumbs up/down reactions (selected one highlights, other fades)
- Report button opens modal
- Stats bar (entries read + helped percentage)
- Coming Soon section with icon cards (Replies, Saved Entries, Open When, Tools)

### Write Page (/write)
- Textarea with live font preview based on selected vibe
- Custom dropdown ("Choose a vibe") with font-rendered labels: Surprise me, Bold, Messy, Reflective, Soft, Tender, Matter-of-fact
- Mood picker (optional): "A little bit of everything" default
- On submit: "surprise" resolves to random font server-side, stored permanently

### Moderation System
- **Auto-approve:** Entries that pass all checks go live immediately (status: "approved")
- **Crisis detection (Category A):** Imminent self-harm/suicide intent → blocks publish, returns 451, shows CrisisPopup modal with 988 resources
- **Graphic content (Category B):** Instructional self-harm → same as Category A
- **Non-imminent ideation (Category C):** Past-tense struggles → allowed through
- **Content blocks:** URLs, phone numbers, email addresses, medication names, dosages, diagnostic language → returns 422, shows redirect to resources
- **No content is stored when blocked**

### Open When Pages
- 5 pages with full emotional content written by Tiff
- Each uses a different handwriting font
- Back button to index, bottom CTAs to read/write entries
- Indexed by Google (good for SEO)

### Footer (all pages)
- Disclaimer: "This is not therapy. This is not medical advice. This is not crisis support."
- Links: About, Resources, Privacy Policy
- Subtle: "Need immediate help? 988 (U.S.)"

## Environment Variables (Vercel + .env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon key]
SUPABASE_SERVICE_ROLE_KEY=[service role key]
```

## Development

```bash
cd ~/GITHUB/adhd-letter-project
npm run dev        # localhost:3000
npm run build      # check for TypeScript errors before pushing
```

## Deploy

Push to main → Vercel auto-deploys. Check vercel.com dashboard for build status.

```bash
git add -A && git commit -m "message" && git push origin main
```

## Build Plan (Phases)

### Phase 1 — DONE
- Individual entry URLs (/entry/[id]) with noindex
- Open Graph meta tags
- Share button (copy link + mobile share)

### Phase 2 — DONE
- Open When pages (5 pages, full copy)
- Font selection system (user picks vibe, stored permanently)
- Crisis safety popup + moderation
- Auto-approve on pass
- Vercel Analytics

### Phase 3 — NOT STARTED
- Authentication (Supabase Auth)
- Profile pages
- Saved entries (bookmarks)
- AI moderation (full, replaces keyword filter)
- Replies (3 free/month, unlimited paid)
- Admin moderation tools upgrade
- Stripe payments ($5/mo community membership)
- Community guidelines page

## Important Links

- **Clarity call:** https://calendly.com/tiff-tiffadhddentist/30min
- **Tiff's IG:** @tifftheadhddentist
- **Supabase dashboard:** supabase.com (login to access project)
- **Vercel dashboard:** vercel.com (login to check deploys/analytics)
- **GitHub repo:** github.com/tiff-cpu/adhd-letter-project

## Obsidian Vault Files

Project documentation lives in Tiff's Obsidian vault at:
`/Users/tiffanypaiva/Library/Mobile Documents/iCloud~md~obsidian/Documents/Tiff's Vault/Active/ADHD-Letter-Project/`

Files:
- `_Decisions-Log.md` — All design/tech decisions
- `_Build-Plan.md` — 14-step phased build plan
- `_Growth-and-Monetization-Strategy.md` — Revenue model + flywheel
- `_Research-ADHD-Resource-Landscape.md` — Market analysis
