"use client";

import { useState } from "react";

type Props = {
  onUnlocked: () => void;
};

export default function DownloadGate({ onUnlocked }: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isValidEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

  const handleSubmit = async () => {
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("That doesn\u2019t look like a valid email.");
      return;
    }

    if (!consent) {
      setError("Please check the consent box to continue.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/downloads/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Try again.");
        setLoading(false);
        return;
      }

      onUnlocked();
    } catch {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <p className="font-lab text-sm font-normal text-coffee mb-8 leading-relaxed">
        Enter your email to unlock all downloads. No account needed.
      </p>

      <div className="flex flex-col items-center gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
          className="w-full max-w-xs p-3 font-lab text-sm font-normal text-espresso bg-white border border-blush rounded-lg focus:outline-none focus:border-espresso placeholder:text-softbrown text-center"
        />

        <label className="flex items-start gap-2 cursor-pointer max-w-xs text-left">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          <span className="font-lab text-xs font-normal text-coffee leading-relaxed">
            I agree to receive occasional emails about the ADHD Diary Project.
            No spam, unsubscribe anytime.
          </span>
        </label>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="font-lab text-sm font-semibold px-5 py-2 rounded-full border border-espresso text-espresso hover:opacity-70 transition-opacity disabled:opacity-40"
        >
          {loading ? "Unlocking..." : "Unlock Downloads"}
        </button>

        {error && (
          <p className="font-lab text-xs font-normal text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
