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
];

// Category A: Imminent self-harm / suicide intent
const CRISIS_IMMINENT_PATTERNS = [
  /\bi('m| am) going to kill myself\b/i,
  /\bi('m| am) going to end (it|my life|things)\b/i,
  /\bi have a plan\b/i,
  /\btonight i('m| am| will)\b.*\b(die|end|kill)\b/i,
  /\bi('m| am) going to (hurt|harm|cut) myself\b/i,
  /\bi('ve| have) decided to (die|end it|kill myself)\b/i,
  /\bthis is my (last|final|goodbye)\b/i,
  /\bby the time (you|anyone) read(s)? this\b/i,
  /\bi won'?t be (here|alive|around) (much longer|tomorrow|after)\b/i,
  /\bgoing to (jump|hang|shoot|overdose|take all)\b/i,
];

// Category B: Graphic / instructional self-harm
const CRISIS_GRAPHIC_PATTERNS = [
  /\bhow to (kill yourself|end your life|commit suicide)\b/i,
  /\bbest (way|method) to (die|kill|end)\b/i,
  /\b(pills|medication|tablets) to (overdose|kill|end)\b/i,
  /\b(cut|cutting|blade|razor)\b.*\b(wrist|arm|vein|deep)\b/i,
  /\b(vein|artery|blood)\b.*\b(cut|slit|open)\b/i,
  /\bhow (many|much) .*(to die|to overdose|lethal)\b/i,
];

// Category C: Non-imminent ideation / past struggle (ALLOWED)
// These patterns are checked to ensure we DON'T block past-tense/non-imminent content
const SAFE_IDEATION_PATTERNS = [
  /\bi('ve| have) (had|struggled with|dealt with) (thoughts|ideation|suicidal)\b/i,
  /\bsometimes i wish i could disappear\b/i,
  /\bi('m| am) struggling but i('m| am) (safe|okay|ok)\b/i,
  /\bin the past\b.*\b(suicid|self.?harm|hurt myself)\b/i,
  /\bi used to\b.*\b(want to die|hurt myself|self.?harm)\b/i,
  /\bi('ve| have) been (through|to) (dark|hard|difficult)\b/i,
];

// General self-harm terms that need context classification
const GENERAL_CRISIS_TERMS = [
  /\bsuicid/i,
  /\bkill myself\b/i,
  /\bwant to die\b/i,
  /\bself.?harm\b/i,
  /\bend it all\b/i,
  /\bhow to (hurt|cut|harm)\b/i,
  /\bdon'?t want to (be here|be alive|live|exist|wake up)\b/i,
];

type ModerationResult = {
  category: "pass" | "crisis_imminent" | "crisis_graphic" | "soft_block" | "content_block";
  code?: string;
};

function moderateContent(text: string): ModerationResult {
  // Check Category A first (highest priority)
  for (const pattern of CRISIS_IMMINENT_PATTERNS) {
    if (pattern.test(text)) {
      return { category: "crisis_imminent", code: "RISK_SELF_HARM_IMMINENT" };
    }
  }

  // Check Category B
  for (const pattern of CRISIS_GRAPHIC_PATTERNS) {
    if (pattern.test(text)) {
      return { category: "crisis_graphic", code: "RISK_SELF_HARM_GRAPHIC" };
    }
  }

  // Check general crisis terms
  for (const pattern of GENERAL_CRISIS_TERMS) {
    if (pattern.test(text)) {
      // Check if it matches safe/past-tense patterns (Category C — allow)
      for (const safePattern of SAFE_IDEATION_PATTERNS) {
        if (safePattern.test(text)) {
          // Past struggle / non-imminent — allow through
          break;
        }
      }
      // If no safe pattern matched, it's ambiguous (Category D)
      let isSafe = false;
      for (const safePattern of SAFE_IDEATION_PATTERNS) {
        if (safePattern.test(text)) {
          isSafe = true;
          break;
        }
      }
      if (!isSafe) {
        return { category: "crisis_imminent", code: "RISK_SELF_HARM_IMMINENT" };
      }
    }
  }

  // Check standard content blocks (meds, URLs, etc)
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return { category: "content_block" };
    }
  }

  return { category: "pass" };
}

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

  // Run moderation
  const modResult = moderateContent(text);

  // Category A or B: Crisis — do NOT store, return crisis code
  if (modResult.category === "crisis_imminent" || modResult.category === "crisis_graphic") {
    return NextResponse.json(
      { error: "crisis", code: modResult.code },
      { status: 451 }
    );
  }

  // Standard content block (meds, URLs, etc)
  if (modResult.category === "content_block") {
    return NextResponse.json(
      { error: "blocked", message: "This entry contains content we can't publish. Please see our content guidelines." },
      { status: 422 }
    );
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
