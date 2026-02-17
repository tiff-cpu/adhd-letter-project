"use client";

import { useState } from "react";

export default function ShareButton({ entryId }: { entryId: string }) {
  const [copied, setCopied] = useState(false);

  const url = `https://adhddiaryproject.com/entry/${entryId}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "The ADHD Diary Project",
          text: "Someone wrote this and I think you need to read it.",
          url,
        });
        return;
      } catch {
        // User cancelled or share failed — fall through to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard failed silently
    }
  };

  return (
    <button
      onClick={handleShare}
      className="font-nav text-xs text-softbrown hover:text-espresso transition-colors"
    >
      {copied ? "Copied!" : "Send this to someone"}
    </button>
  );
}
