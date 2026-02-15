import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json(
      { error: "email is required." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("emails")
    .insert({ email });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
