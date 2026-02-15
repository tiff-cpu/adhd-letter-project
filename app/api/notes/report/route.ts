import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { note_id, reason } = body;

  if (!note_id) {
    return NextResponse.json(
      { error: "note_id is required." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("reports")
    .insert({ note_id, reason: reason || null });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
