import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode");

  let query = supabaseAdmin
    .from("notes")
    .select("id, body, mode, font_family, created_at")
    .eq("status", "approved");

  if (mode && mode !== "all") {
    query = query.eq("mode", mode);
  }

  // Get total count first
  const { count } = await supabaseAdmin
    .from("notes")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved")
    .then((res) => res);

  if (!count || count === 0) {
    return NextResponse.json(
      { error: "No notes available yet." },
      { status: 404 }
    );
  }

  // Pick a random offset
  const randomOffset = Math.floor(Math.random() * count);

  const { data, error } = await query
    .range(randomOffset, randomOffset)
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "No notes found for this mode." },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
