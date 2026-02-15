import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");
  const view = searchParams.get("view") || "pending";

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (view === "reported") {
    // Get reported notes with their reports
    const { data: reports, error } = await supabaseAdmin
      .from("reports")
      .select("id, note_id, reason, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get the actual note bodies for each report
    const noteIds = Array.from(new Set(reports?.map((r) => r.note_id) || []));
    const { data: notes } = await supabaseAdmin
      .from("notes")
      .select("id, body, mode")
      .in("id", noteIds);

    const notesMap = new Map(notes?.map((n) => [n.id, n]) || []);
    const enriched = reports?.map((r) => ({
      ...r,
      note: notesMap.get(r.note_id) || null,
    }));

    return NextResponse.json(enriched);
  }

  // Default: pending notes
  const { data, error } = await supabaseAdmin
    .from("notes")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { password, note_id, status } = body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!note_id || !status) {
    return NextResponse.json(
      { error: "note_id and status are required." },
      { status: 400 }
    );
  }

  if (status !== "approved" && status !== "rejected") {
    return NextResponse.json(
      { error: "status must be 'approved' or 'rejected'." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("notes")
    .update({ status })
    .eq("id", note_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { password, note_id } = body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!note_id) {
    return NextResponse.json(
      { error: "note_id is required." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("notes")
    .delete()
    .eq("id", note_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
