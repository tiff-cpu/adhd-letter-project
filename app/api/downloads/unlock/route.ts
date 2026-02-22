import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email is required." },
      { status: 400 }
    );
  }

  const trimmed = email.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Upsert into emails table — dedupe on email, update consent_at on conflict
  const { error } = await supabaseAdmin
    .from("emails")
    .upsert(
      { email: trimmed, consent_at: new Date().toISOString() },
      { onConflict: "email" }
    );

  if (error) {
    console.error("Download unlock error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Set HttpOnly cookie — 7 day expiry
  const isProduction = process.env.NODE_ENV === "production";

  const response = NextResponse.json({ success: true });
  response.cookies.set("downloads_unlocked", "1", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
}
