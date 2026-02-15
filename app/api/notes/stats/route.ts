import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { count: totalReactions } = await supabaseAdmin
    .from("feedback")
    .select("*", { count: "exact", head: true });

  const { count: helpedCount } = await supabaseAdmin
    .from("feedback")
    .select("*", { count: "exact", head: true })
    .eq("reaction", "helped");

  const notesRead = totalReactions || 0;
  const helped = helpedCount || 0;
  const helpedRate = notesRead > 0 ? Math.round((helped / notesRead) * 100) : 0;

  return NextResponse.json({
    notesRead,
    helpedRate,
  });
}
