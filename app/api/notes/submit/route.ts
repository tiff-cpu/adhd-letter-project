import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const BLOCKED_PATTERNS = [
  /https?:\/\//i,
  /www\./i,
  /\.com\b/i,
  /\.org\b/i,
  /\.net\b/i,
  /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/,
  /\(\d{3}\)\s?\d{3}[-.\s]?\d{4}/,
  /@\w{2,}/,
  /\badderall\b/i,
  /\britalin\b/i,
  /\bvyvanse\b/i,
  /\bconcerta\b/i,
  /\bstrattera\b/i,
  /\bfocalin\b/i,
  /\bdexedrine\b/i,
  /\bmethylphenidate\b/i,
  /\bamphetamine\b/i,
  /\bwellbutrin\b/i,
  /\bmodafinil\b/i,
  /\bdosage\b/i,
  /\b\d+\s*mg\b/i,
  /\byou (probably|might|definitely) have\b/i,
  /\byou should (get |be )?(tested|diagnosed|evaluated)\b/i,
  /\bsuicid/i,
  /\bkill myself\b/i,
  /\bwant to die\b/i,
  /\bself.?harm\b/i,
  /\bend it all\b/i,
  /\bhow to (hurt|cut|harm)\b/i,
];

const FONT_OPTIONS = [
  "permanent-marker",
  "reenie-beanie",
  "nothing-you-could-do",
  "covered-by-your-grace",
  "allura",
  "courier-new",
];

function resolveFontFamily(font: string): string {
  if (!font || font === "surprise") {
    return FONT_OPTIONS[Math.floor(Math.random() * FONT_OPTIONS.length)];
  }
  if (FONT_OPTIONS.includes(font)) {
    return font;
  }
  return FONT_OPTIONS[Math.floor(Math.random() * FONT_OPTIONS.length)];
}

function sanitize(text: string): string {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { text, mode, font_family } = body;

  if (!text || !mode) {
    return NextResponse.json(
      { error: "text and mode are required." },
      { status: 400 }
    );
  }

  if (text.length < 50) {
    return NextResponse.json(
      { error: "Entry must be at least 50 characters." },
      { status: 400 }
    );
  }

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return NextResponse.json(
        { error: "blocked", message: "This entry contains content we can't publish. Please see our content guidelines." },
        { status: 422 }
      );
    }
  }

  const sanitized = sanitize(text);
  const resolvedFont = resolveFontFamily(font_family);

  const { error } = await supabaseAdmin
    .from("notes")
    .insert({ body: sanitized, mode, font_family: resolvedFont, status: "pending" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
