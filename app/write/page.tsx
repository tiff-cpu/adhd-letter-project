"use client";

import { useState } from "react";
import Link from "next/link";
import { MODES } from "@/lib/modes";

type FormState = "writing" | "redirect" | "submitting" | "thankyou";

export default function WritePage() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [formState, setFormState] = useState<FormState>("writing");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setFormError(null);

    if (!text || text.length < 50) {
      setFormError("Your note needs to be at least 50 characters.");
      return;
    }
    if (!mode) {
      setFormError("Please pick what kind of day this note is for.");
      return;
    }
    if (!agreed) {
      setFormError("Please check the box to confirm you understand.");
      return;
    }

    setFormState("submitting");
    try {
      const res = await fetch("/api/notes/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode }),
      });
      if (res.ok) {
        setFormState("thankyou");
      } else if (res.status === 422) {
        setFormState("redirect");
      } else {
        const data = await res.json();
        setFormError(data.error || "Something went wrong. Please try again.");
        setFormState("writing");
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
      setFormState("writing");
    }
  };

  const resetForm = () => {
    setText("");
    setMode("");
    setAgreed(false);
    setFormState("writing");
    setFormError(null);
  };

  if (formState === "thankyou") {
    return (
      <div className="flex flex-col items-center px-6 py-16 md:py-24 text-center">
        <p className="font-hand text-3xl md:text-4xl text-espresso mb-6">
          You just made someone&apos;s hard day a little lighter.
        </p>
        <p className="font-hand text-2xl md:text-3xl text-coffee mb-10">
          That matters.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={resetForm}
            className="font-nav text-sm px-5 py-2.5 rounded-full border border-amber text-espresso hover:bg-blush transition-colors"
          >
            Write another
          </button>
          <Link
            href="/"
            className="font-nav text-sm px-5 py-2.5 rounded-full border border-blush text-softbrown hover:bg-parchment transition-colors"
          >
            Read notes
          </Link>
        </div>
      </div>
    );
  }

  if (formState === "redirect") {
    return (
      <div className="flex flex-col items-center px-6 py-16 md:py-24 max-w-lg mx-auto text-center">
        <p className="font-body text-base text-espresso leading-relaxed mb-4">
          Thank you for sharing something so real.
        </p>
        <p className="font-body text-sm text-coffee leading-relaxed mb-6">
          This sounds like it might need more support than a note can hold.
          We&apos;re not able to publish this note, but here are some places that
          can actually help:
        </p>
        <div className="flex flex-col gap-2 mb-8">
          <a href="https://chadd.org" target="_blank" rel="noopener noreferrer" className="font-nav text-sm text-amber hover:text-espresso underline">
            CHADD — Children and Adults with ADHD
          </a>
          <a href="https://add.org" target="_blank" rel="noopener noreferrer" className="font-nav text-sm text-amber hover:text-espresso underline">
            ADDA — Attention Deficit Disorder Association
          </a>
          <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer" className="font-nav text-sm text-amber hover:text-espresso underline">
            988 Suicide &amp; Crisis Lifeline
          </a>
        </div>
        <p className="font-body text-sm text-coffee leading-relaxed mb-8">
          Your experience matters — if you&apos;d like to write a different note,
          we&apos;d love to read it.
        </p>
        <button
          onClick={resetForm}
          className="font-nav text-sm px-5 py-2.5 rounded-full border border-amber text-espresso hover:bg-blush transition-colors"
        >
          Write a different note
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 py-8 md:py-16">
      <div className="w-full max-w-lg">
        <p className="font-body text-sm md:text-base text-coffee italic text-center mb-10">
          Write something you wish someone had said to you on a hard ADHD day.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start writing..."
          className="w-full min-h-[180px] p-5 font-hand text-xl text-espresso bg-warmwhite border border-blush rounded-sm resize-none focus:outline-none focus:border-amber placeholder:text-softbrown"
        />
        <p className="font-nav text-xs text-softbrown mt-1.5 text-right">
          {text.length} / 50 minimum
        </p>

        <div className="mt-6">
          <label className="font-nav text-sm text-coffee block mb-2">
            What kind of day is this note for?
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full p-3 font-nav text-sm text-espresso bg-warmwhite border border-blush rounded-sm focus:outline-none focus:border-amber"
          >
            <option value="">Choose one...</option>
            {MODES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label} — {m.description}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-start gap-3 mt-6 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 accent-amber"
          />
          <span className="font-nav text-xs text-coffee">
            I understand my note will be reviewed before going live.
          </span>
        </label>

        {formError && (
          <p className="font-nav text-xs text-red-600 mt-4">{formError}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={formState === "submitting"}
          className="mt-8 w-full font-nav text-sm px-5 py-3 rounded-full bg-espresso text-cream hover:bg-coffee transition-colors disabled:opacity-50"
        >
          {formState === "submitting" ? "Sending..." : "Send your note"}
        </button>
      </div>
    </div>
  );
}
