import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Server-side validation patterns
const BLOCKED_PATTERNS = [
  // URLs
  /https?:\/\//i,
  /www\./i,
  /\.com\b/i,
  /\.org\b/i,
  /\.net\b/i,

  // Phone numbers
  /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/,
  /\(\d{3}\)\s?\d{3}[-.\s]?\d{4}/,

  // @handles
  /@\w{2,}/,

  // Medication references
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

  // Diagnostic claims
  /\byou (probably|might|definitely) have\b/i,
  /\byou should (get |be )?(tested|diagnosed|evaluated)\b/i,

  // Self-harm instructions
  /\bsuicid/i,
  /\bkill myself\b/i,
  /\bwant to die\b/i,
  /\bself.?harm\b/i,
  /\bend it all\b/i,
  /\bhow to (hurt|cut|harm)\b/i,
];

function sanitize(text: string): string {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { text, mode } = body;

  if (!text || !mode) {
    return NextResponse.json(
      { error: "text and mode are required." },
      { status: 400 }
    );
  }

  if (text.length < 50) {
    return NextResponse.json(
      { error: "Note must be at least 50 characters." },
      { status: 400 }
    );
  }

  // Server-side content validation
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return NextResponse.json(
        { error: "blocked", message: "This note contains content we can't publish. Please see our content guidelines." },
        { status: 422 }
      );
    }
  }

  const sanitized = sanitize(text);

  const { error } = await supabaseAdmin
    .from("notes")
    .insert({ body: sanitized, mode, status: "pending" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
