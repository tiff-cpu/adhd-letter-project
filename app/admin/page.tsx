"use client";

import { useState } from "react";
import { MODES } from "@/lib/modes";

type PendingNote = {
  id: string;
  body: string;
  mode: string;
  created_at: string;
};

type ReportedNote = {
  id: string;
  note_id: string;
  reason: string | null;
  created_at: string;
  note: { id: string; body: string; mode: string } | null;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "reported">("pending");
  const [pendingNotes, setPendingNotes] = useState<PendingNote[]>([]);
  const [reportedNotes, setReportedNotes] = useState<ReportedNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPending = async (pw: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin?password=${encodeURIComponent(pw)}&view=pending`);
      if (res.status === 401) {
        setError("Wrong password.");
        setAuthenticated(false);
      } else if (res.ok) {
        const data = await res.json();
        setPendingNotes(data);
        setAuthenticated(true);
      }
    } catch {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  const fetchReported = async (pw: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin?password=${encodeURIComponent(pw)}&view=reported`);
      if (res.ok) {
        const data = await res.json();
        setReportedNotes(data);
      }
    } catch {
      // Non-critical
    }
    setLoading(false);
  };

  const handleLogin = () => {
    fetchPending(password);
  };

  const handleTabChange = (tab: "pending" | "reported") => {
    setActiveTab(tab);
    if (tab === "reported") fetchReported(password);
    else fetchPending(password);
  };

  const handleAction = async (noteId: string, status: "approved" | "rejected") => {
    try {
      await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, note_id: noteId, status }),
      });
      setPendingNotes((prev) => prev.filter((n) => n.id !== noteId));
    } catch {
      // Fail silently
    }
  };

  const handleDelete = async (noteId: string) => {
    try {
      await fetch("/api/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, note_id: noteId }),
      });
      setPendingNotes((prev) => prev.filter((n) => n.id !== noteId));
      setReportedNotes((prev) => prev.filter((r) => r.note_id !== noteId));
    } catch {
      // Fail silently
    }
  };

  const getModeLabel = (value: string) => {
    const found = MODES.find((m) => m.value === value);
    return found ? found.label : value;
  };

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center px-6 py-16">
        <div className="w-full max-w-sm">
          <p className="font-nav text-sm text-coffee mb-4">Admin password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full p-3 font-nav text-sm text-espresso bg-warmwhite border border-blush rounded-sm focus:outline-none focus:border-amber"
          />
          {error && (
            <p className="font-nav text-xs text-red-600 mt-2">{error}</p>
          )}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-4 w-full font-nav text-sm px-5 py-3 rounded-full bg-espresso text-cream hover:bg-coffee transition-colors disabled:opacity-50"
          >
            {loading ? "Checking..." : "Log in"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 md:py-16 max-w-2xl mx-auto">
      {/* Tabs */}
      <div className="flex items-center gap-6 mb-8">
        <button
          onClick={() => handleTabChange("pending")}
          className={`font-nav text-sm ${activeTab === "pending" ? "text-espresso font-medium" : "text-softbrown"}`}
        >
          Pending ({pendingNotes.length})
        </button>
        <button
          onClick={() => handleTabChange("reported")}
          className={`font-nav text-sm ${activeTab === "reported" ? "text-espresso font-medium" : "text-softbrown"}`}
        >
          Reported
        </button>
      </div>

      {/* Pending Notes */}
      {activeTab === "pending" && (
        <>
          {pendingNotes.length === 0 ? (
            <p className="font-nav text-sm text-softbrown">No pending notes.</p>
          ) : (
            <div className="space-y-6">
              {pendingNotes.map((note) => (
                <div key={note.id} className="note-card relative rounded-sm p-6">
                  <p className="font-hand text-xl text-espresso leading-relaxed mb-3">
                    {note.body}
                  </p>
                  <div className="flex items-center gap-3 font-nav text-xs text-softbrown mb-4">
                    <span>{getModeLabel(note.mode)}</span>
                    <span>&middot;</span>
                    <span>{new Date(note.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleAction(note.id, "approved")}
                      className="font-nav text-xs px-4 py-1.5 rounded-full bg-espresso text-cream hover:bg-coffee transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(note.id, "rejected")}
                      className="font-nav text-xs px-4 py-1.5 rounded-full border border-blush text-softbrown hover:bg-parchment transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="font-nav text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Reported Notes */}
      {activeTab === "reported" && (
        <>
          {reportedNotes.length === 0 ? (
            <p className="font-nav text-sm text-softbrown">No reported notes.</p>
          ) : (
            <div className="space-y-6">
              {reportedNotes.map((report) => (
                <div key={report.id} className="note-card relative rounded-sm p-6">
                  {report.note ? (
                    <p className="font-hand text-xl text-espresso leading-relaxed mb-3">
                      {report.note.body}
                    </p>
                  ) : (
                    <p className="font-nav text-sm text-softbrown mb-3">
                      Note has been deleted.
                    </p>
                  )}
                  {report.reason && (
                    <p className="font-nav text-xs text-coffee mb-3">
                      Reason: {report.reason}
                    </p>
                  )}
                  <div className="flex items-center gap-3 font-nav text-xs text-softbrown mb-4">
                    {report.note && <span>{getModeLabel(report.note.mode)}</span>}
                    <span>&middot;</span>
                    <span>Reported {new Date(report.created_at).toLocaleDateString()}</span>
                  </div>
                  {report.note && (
                    <button
                      onClick={() => handleDelete(report.note_id)}
                      className="font-nav text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete this note
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
