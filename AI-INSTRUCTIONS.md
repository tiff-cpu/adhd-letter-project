# Working With Tiff — AI Instructions

## How This Codebase Works

**Local development:** Tiff works on a MacBook. Code lives at `~/GITHUB/adhd-letter-project/`.
**Deploy process:** Push to `main` on GitHub → Vercel auto-deploys to adhddiaryproject.com.
**Tiff does NOT use an IDE.** She doesn't open VS Code or edit files manually. The AI writes/edits all code files directly, then gives her a ready-to-paste Terminal command to commit and push.

## Terminal Commands

**Always give Tiff a single copy-paste block.** She pastes it into Terminal and hits enter. That's it.

Standard push command format:
```
cd ~/GITHUB/adhd-letter-project && git add -A && git commit -m "short description" && git push origin main
```

If she needs to install something:
```
cd ~/GITHUB/adhd-letter-project && npm install [package]
```

If she needs to run dev server:
```
cd ~/GITHUB/adhd-letter-project && npm run dev
```

If builds are failing, check locally first:
```
cd ~/GITHUB/adhd-letter-project && npm run build
```

**Never assume she knows terminal commands.** Always provide the full command ready to paste. Never say "run git push" without giving the exact line.

## How Tiff Communicates

- She has ADHD. Walls of text = shutdown.
- Be concise. One action at a time.
- She'll say "do it" or "yes" and expect you to just handle it.
- She gives feedback visually — screenshots from her phone or desktop.
- If something's broken, she'll paste the error or screenshot the Vercel build log.
- She sometimes types fast and rough. Read intent, not typos.
- Don't over-explain what you did. Just do it, show the push command, and briefly say what changed.

## How To Edit Code

- Write files or edit files directly using file system tools.
- The AI has access to the project files at `/Users/tiffanypaiva/GITHUB/adhd-letter-project/`.
- After making changes, always provide the git push command.
- **Always check for TypeScript errors before telling her to push.** If unsure, read the file back and verify types/imports are correct. Bad pushes break the Vercel deploy and waste time.

## Common Gotchas

- **Vercel build errors:** If a push fails to deploy, check the Vercel dashboard → Deployments → click the red error → Build Logs. Ask Tiff to screenshot or paste the error.
- **TypeScript strictness:** This project uses strict TypeScript. Don't use `any`, don't leave untyped variables, don't use `useState` when you mean `useRef`.
- **Supabase:** Database is on Supabase. Admin client is in `lib/supabase-admin.ts`. Uses service role key (env var). Never expose this client-side.
- **"use client" directive:** Any component using useState, useEffect, onClick, etc. needs `"use client"` at the top.
- **Google Fonts:** Loaded in `layout.tsx`. If adding a new font, add it to the Google Fonts import AND to `tailwind.config.ts`.
- **Next.js App Router:** This uses the app directory routing (not pages). Routes = folders with `page.tsx` files.

## Design Rules

- White, minimal, emotionally quiet aesthetic.
- No emojis on the site.
- No bright colors. Stick to the espresso/coffee/softbrown/blush palette in tailwind.config.ts.
- Handwriting fonts for entries. Serif (Lora) for headers. Sans (Outfit) for nav/UI.
- No stock photography. No decorative elements. Space and text do the work.
- Mobile-first. Always check that font sizes and padding work on small screens.

## Project Context

Read `README.md` in the repo root for full project documentation including database schema, file structure, features, moderation system, and build plan phases.

## Tiff's Other Tools

- **Obsidian:** She tracks project strategy in an Obsidian vault. The AI may or may not have access depending on the session.
- **Supabase dashboard:** For checking entries, database changes, auth (future).
- **Vercel dashboard:** For checking deploys, analytics, domain settings.
- **Calendly:** Clarity calls at https://calendly.com/tiff-tiffadhddentist/30min
- **Instagram/TikTok:** @tifftheadhddentist — content drives traffic to the site.

## When Starting a New Chat

1. Read `README.md` first for full project context.
2. Read this file for how to work with Tiff.
3. Ask what she wants to work on. Don't suggest a roadmap unless she asks.
4. Get to work. She doesn't need a plan — she needs the thing built.
