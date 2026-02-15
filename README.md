# The ADHD Letter Project

A random note from someone who gets your ADHD brain — so you never have to feel like the only one again.

## Setup

1. Clone this repo
2. Run `npm install`
3. Copy `.env.local.example` to `.env.local` and fill in your values:
   - `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase publishable/anon key
   - `SUPABASE_SERVICE_ROLE_KEY` — your Supabase secret/service role key
   - `ADMIN_PASSWORD` — password for the /admin page
   - `NEXT_PUBLIC_CLARITY_CALL_URL` — your clarity call booking link
4. Run the SQL in `supabase-migration.sql` in your Supabase SQL Editor
5. Run `npm run dev`
6. Open http://localhost:3000

## Database Tables

- `notes` — id, body, mode, status, created_at
- `feedback` — id, note_id, reaction, created_at
- `reports` — id, note_id, reason, created_at
- `emails` — id, email, created_at

## Pages

- `/` — Homepage (read random notes, react, report, coaching CTA, email signup)
- `/write` — Write a Note (submit form, server-side validation)
- `/about` — Tiff's story + coaching link
- `/resources` — Support links + emergency disclaimer
- `/privacy` — Privacy policy
- `/admin` — Approve/reject pending notes, view reported notes, delete (password protected)
