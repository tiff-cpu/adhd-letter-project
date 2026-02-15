"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

type Note = {
  id: string;
  body: string;
  mode: string;
  created_at: string;
};

const HAND_FONTS = [
  "font-hand-1",
  "font-hand-2",
  "font-hand-3",
  "font-hand-4",
  "font-hand-5",
];

export default function Home() {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reacted, setReacted] = useState(false);
  const [stats, setStats] = useState({ notesRead: 0, helpedRate: 0 });
  const [fontIndex, setFontIndex] = useState(0);

  // Report modal
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  // Email signup
  const [signupEmail, setSignupEmail] = useState("");
  const [emailConsent, setEmailConsent] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sent" | "error">("idle");

  const currentFont = useMemo(() => HAND_FONTS[fontIndex % HAND_FONTS.length], [fontIndex]);

  const fetchNote = useCallback(async () => {
    setLoading(true);
    setError(null);
    setReacted(false);
    setFontIndex(Math.floor(Math.random() * HAND_FONTS.length));
    try {
      const res = await fetch(`/api/notes/random`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        setNote(null);
      } else {
        const data = await res.json();
        setNote(data);
      }
    } catch {
      setError("Couldn't load a note right now. Try again in a moment.");
    }
    setLoading(false);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/notes/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // Non-critical
    }
  };

  useEffect(() => {
    fetchNote();
    fetchStats();
  }, [fetchNote]);

  const handleReaction = async (reaction: "helped" | "not_for_me") => {
    if (!note) return;
    setReacted(true);
    try {
      await fetch("/api/notes/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note_id: note.id, reaction }),
      });
    } catch {
      // Non-critical
    }
  };

  const handleReport = async () => {
    if (!note) return;
    try {
      await fetch("/api/notes/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note_id: note.id, reason: reportReason }),
      });
    } catch {
      // Non-critical
    }
    setShowReportModal(false);
    setReportReason("");
    fetchNote();
  };

  const handleEmailSignup = async () => {
    if (!signupEmail || !emailConsent) return;
    try {
      const res = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupEmail }),
      });
      if (res.ok) {
        setEmailStatus("sent");
        setSignupEmail("");
        setEmailConsent(false);
      } else {
        setEmailStatus("error");
      }
    } catch {
      setEmailStatus("error");
    }
  };

  return (
    <div className="flex flex-col items-center px-6 py-8 md:py-16">
      {/* Subheader */}
      <p className="font-body text-sm md:text-base text-coffee italic text-center max-w-md mb-10 md:mb-14">
        This was written by someone whose brain works like yours.
      </p>

      {/* Note Card — wider */}
      <div className="w-full max-w-2xl mx-auto">
        {loading ? (
          <div className="note-card relative rounded-sm p-10 md:p-14 min-h-[280px] flex items-center justify-center">
            <p className="font-nav text-sm text-softbrown">Finding a note for you...</p>
          </div>
        ) : error ? (
          <div className="note-card relative rounded-sm p-10 md:p-14 min-h-[280px] flex items-center justify-center">
            <p className="font-nav text-sm text-softbrown text-center">{error}</p>
          </div>
        ) : note ? (
          <div className="note-card relative rounded-sm p-10 md:p-14 min-h-[280px]">
            <p className={`${currentFont} text-2xl md:text-3xl leading-relaxed text-espresso`}>
              {note.body}
            </p>
          </div>
        ) : null}
      </div>

      {/* Buttons */}
      {note && !loading && (
        <div className="mt-8 flex flex-col items-center gap-4">
          {!reacted ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleReaction("helped")}
                className="font-nav text-sm px-5 py-2.5 rounded-full border border-espresso text-espresso hover:bg-gray-100 transition-colors"
              >
                This helped
              </button>
              <button
                onClick={() => handleReaction("not_for_me")}
                className="font-nav text-sm px-5 py-2.5 rounded-full border border-blush text-softbrown hover:bg-gray-50 transition-colors"
              >
                Not for me
              </button>
            </div>
          ) : (
            <button
              onClick={fetchNote}
              className="font-nav text-sm px-5 py-2.5 rounded-full border border-espresso text-espresso hover:bg-gray-100 transition-colors"
            >
              Read another
            </button>
          )}

          <button
            onClick={() => setShowReportModal(true)}
            className="font-nav text-xs text-softbrown hover:text-espresso transition-colors"
          >
            Report this note
          </button>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-sm p-6 w-full max-w-sm border border-blush">
            <p className="font-nav text-sm text-espresso mb-3">
              Why are you reporting this note?
            </p>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Optional — tell us what's wrong"
              className="w-full min-h-[80px] p-3 font-nav text-sm text-espresso bg-white border border-blush rounded-sm resize-none focus:outline-none focus:border-espresso placeholder:text-softbrown"
            />
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleReport}
                className="font-nav text-xs px-4 py-1.5 rounded-full bg-espresso text-white hover:bg-coffee transition-colors"
              >
                Submit report
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportReason("");
                }}
                className="font-nav text-xs text-softbrown hover:text-espresso transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      {stats.notesRead > 0 && (
        <p className="mt-10 font-nav text-xs text-softbrown">
          {stats.notesRead.toLocaleString()} notes read
          {stats.helpedRate > 0 && (
            <span> &middot; {stats.helpedRate}% said this helped</span>
          )}
        </p>
      )}

      {/* Resources link */}
      <div className="mt-12 text-center">
        <a
          href="/resources"
          className="font-nav text-sm text-coffee hover:text-espresso underline transition-colors"
        >
          ADHD support & resources
        </a>
      </div>

      {/* Email Signup */}
      <div className="mt-10 w-full max-w-lg">
        {emailStatus === "sent" ? (
          <p className="font-nav text-sm text-coffee text-center">
            You&apos;re on the list. No spam, ever.
          </p>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <input
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="your email"
              className="w-full max-w-xs p-3 font-nav text-sm text-espresso bg-white border border-blush rounded-sm focus:outline-none focus:border-espresso placeholder:text-softbrown text-center"
            />
            <label className="flex items-start gap-2 cursor-pointer max-w-xs">
              <input
                type="checkbox"
                checked={emailConsent}
                onChange={(e) => setEmailConsent(e.target.checked)}
                className="mt-1"
              />
              <span className="font-nav text-xs text-coffee">
                I agree to receive occasional emails. No spam, unsubscribe anytime.
              </span>
            </label>
            <button
              onClick={handleEmailSignup}
              disabled={!signupEmail || !emailConsent}
              className="font-nav text-sm px-5 py-2 rounded-full border border-espresso text-espresso hover:bg-gray-100 transition-colors disabled:opacity-40"
            >
              Join the list
            </button>
            {emailStatus === "error" && (
              <p className="font-nav text-xs text-red-600">Something went wrong. Try again.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
