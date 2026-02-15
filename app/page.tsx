"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Note = {
  id: string;
  body: string;
  mode: string;
  font_family: string;
  created_at: string;
};

const FONT_MAP: Record<string, string> = {
  "permanent-marker": "font-hand-permanent-marker",
  "reenie-beanie": "font-hand-reenie-beanie",
  "nothing-you-could-do": "font-hand-nothing-you-could-do",
  "covered-by-your-grace": "font-hand-covered-by-your-grace",
  "allura": "font-hand-allura",
  "courier-new": "font-hand-courier-new",
};

export default function Home() {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reacted, setReacted] = useState<false | "helped" | "not_for_me">(false);
  const [stats, setStats] = useState({ notesRead: 0, helpedRate: 0 });

  // History for back/forward navigation
  const historyRef = useRef<Note[]>([]);
  const indexRef = useRef(-1);

  // Report modal
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  // Email signup
  const [signupEmail, setSignupEmail] = useState("");
  const [emailConsent, setEmailConsent] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sent" | "error">("idle");

  const fetchNote = useCallback(async () => {
    setLoading(true);
    setError(null);
    setReacted(false);
    try {
      const res = await fetch(`/api/notes/random`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        setNote(null);
      } else {
        const data = await res.json();
        setNote(data);
        // Add to history
        historyRef.current = historyRef.current.slice(0, indexRef.current + 1);
        historyRef.current.push(data);
        indexRef.current = historyRef.current.length - 1;
      }
    } catch {
      setError("Couldn't load a note right now. Try again in a moment.");
    }
    setLoading(false);
  }, []);

  const goBack = () => {
    if (indexRef.current > 0) {
      indexRef.current -= 1;
      setNote(historyRef.current[indexRef.current]);
      setReacted(false);
    }
  };

  const goForward = () => {
    if (indexRef.current < historyRef.current.length - 1) {
      indexRef.current += 1;
      setNote(historyRef.current[indexRef.current]);
      setReacted(false);
    } else {
      fetchNote();
    }
  };

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
    setReacted(reaction);
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

  const fontClass = note?.font_family ? (FONT_MAP[note.font_family] || "font-hand-permanent-marker") : "font-hand-permanent-marker";
  const canGoBack = indexRef.current > 0;

  return (
    <div className="flex flex-col items-center px-6 py-8 md:py-16">
      {/* Subheader */}
      <p className="font-body text-sm md:text-base text-coffee italic text-center max-w-md mb-10 md:mb-14">
        This was written by someone whose brain works like yours.
      </p>

      {/* Note Card with Nav Arrows */}
      <div className="w-full max-w-2xl mx-auto flex items-center gap-4">
        {/* Back arrow */}
        <button
          onClick={goBack}
          disabled={!canGoBack || loading}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-coffee hover:text-espresso hover:bg-gray-100 transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
          aria-label="Previous entry"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Card */}
        <div className="flex-1">
          {loading ? (
            <div className="note-card relative rounded-sm p-10 md:p-14 min-h-[280px] flex items-center justify-center">
              <p className="font-nav text-sm text-softbrown">Finding a note for you...</p>
            </div>
          ) : error ? (
            <div className="note-card relative rounded-sm p-10 md:p-14 min-h-[280px] flex items-center justify-center">
              <p className="font-nav text-sm text-softbrown text-center">{error}</p>
            </div>
          ) : note ? (
            <div className="note-card relative rounded-sm p-6 md:p-14 min-h-[200px] md:min-h-[280px]">
              <p className={`${fontClass} text-lg md:text-3xl leading-relaxed text-espresso`}>
                {note.body}
              </p>
            </div>
          ) : null}
        </div>

        {/* Forward arrow */}
        <button
          onClick={goForward}
          disabled={loading}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-coffee hover:text-espresso hover:bg-gray-100 transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
          aria-label="Next entry"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Reaction + Report */}
      {note && !loading && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-6">
            {/* Thumbs up */}
            <button
              onClick={() => handleReaction("helped")}
              disabled={!!reacted}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                reacted === "helped"
                  ? "text-espresso"
                  : reacted === "not_for_me"
                  ? "opacity-20"
                  : "text-coffee hover:text-espresso hover:bg-gray-100"
              }`}
              aria-label="This helped"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11v10M4 11H2v10h2M7 11l3-7a2 2 0 012-2h.5a2 2 0 012 2v4h4.5a2 2 0 012 2.1l-1.2 7a2 2 0 01-2 1.9H7" />
              </svg>
            </button>

            {/* Thumbs down */}
            <button
              onClick={() => handleReaction("not_for_me")}
              disabled={!!reacted}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                reacted === "not_for_me"
                  ? "text-espresso"
                  : reacted === "helped"
                  ? "opacity-20"
                  : "text-coffee hover:text-espresso hover:bg-gray-100"
              }`}
              aria-label="Not for me"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 13V3m3 10h2V3h-2m-3 10l-3 7a2 2 0 01-2 2h-.5a2 2 0 01-2-2v-4H5a2 2 0 01-2-2.1l1.2-7a2 2 0 012-1.9H17" />
              </svg>
            </button>
          </div>

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
          ADHD support &amp; resources
        </a>
      </div>

      {/* Email Signup */}
      <div id="signup" className="mt-10 w-full max-w-lg">
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

      {/* Coming Soon */}
      <div className="mt-16 w-full max-w-2xl mx-auto">
        <p className="font-nav text-xs uppercase tracking-widest text-softbrown mb-8 text-center">
          Coming Soon
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-sm p-5 text-center">
            <svg className="w-6 h-6 text-coffee mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            <p className="font-nav text-sm text-espresso font-medium">Replies</p>
            <p className="font-nav text-xs text-coffee mt-1">Respond to entries that move you</p>
          </div>
          <div className="border border-gray-200 rounded-sm p-5 text-center">
            <svg className="w-6 h-6 text-coffee mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
            <p className="font-nav text-sm text-espresso font-medium">Saved Entries</p>
            <p className="font-nav text-xs text-coffee mt-1">Keep the ones that resonate</p>
          </div>
          <div className="border border-gray-200 rounded-sm p-5 text-center">
            <svg className="w-6 h-6 text-coffee mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <p className="font-nav text-sm text-espresso font-medium">Open When</p>
            <p className="font-nav text-xs text-coffee mt-1">More pages for hard moments</p>
          </div>
          <div className="border border-gray-200 rounded-sm p-5 text-center">
            <svg className="w-6 h-6 text-coffee mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L12 4.37m-5.68 5.7h15.08" />
            </svg>
            <p className="font-nav text-sm text-espresso font-medium">Tools</p>
            <p className="font-nav text-xs text-coffee mt-1">A small library that actually helps</p>
          </div>
        </div>
      </div>
    </div>
  );
}
