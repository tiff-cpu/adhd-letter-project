import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { note_id, reaction } = body;

  if (!note_id || !reaction) {
    return NextResponse.json(
      { error: "note_id and reaction are required." },
      { status: 400 }
    );
  }

  if (reaction !== "helped" && reaction !== "not_for_me") {
    return NextResponse.json(
      { error: "reaction must be 'helped' or 'not_for_me'." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("feedback")
    .insert({ note_id, reaction });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
