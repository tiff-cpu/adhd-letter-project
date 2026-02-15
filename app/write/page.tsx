"use client";

import { useState } from "react";
import Link from "next/link";
import { MODES } from "@/lib/modes";
import CrisisPopup from "@/components/CrisisPopup";

type FormState = "writing" | "redirect" | "submitting" | "thankyou" | "crisis";

const VIBE_OPTIONS = [
  { value: "surprise", label: "Surprise me", fontClass: "font-nav" },
  { value: "permanent-marker", label: "Bold", fontClass: "font-hand-permanent-marker" },
  { value: "reenie-beanie", label: "Messy", fontClass: "font-hand-reenie-beanie" },
  { value: "nothing-you-could-do", label: "Reflective", fontClass: "font-hand-nothing-you-could-do" },
  { value: "covered-by-your-grace", label: "Soft", fontClass: "font-hand-covered-by-your-grace" },
  { value: "allura", label: "Tender", fontClass: "font-hand-allura" },
  { value: "courier-new", label: "Matter-of-fact", fontClass: "font-hand-courier-new" },
];

function VibeDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useState<HTMLDivElement | null>(null);

  const selected = VIBE_OPTIONS.find((v) => v.value === value) || VIBE_OPTIONS[0];

  return (
    <div className="relative" ref={(el) => { ref[1] = null; }} onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
    }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full p-3 text-left bg-white border border-blush rounded-sm focus:outline-none focus:border-espresso flex items-center justify-between"
      >
        <span className={`${selected.fontClass} text-lg text-espresso`}>
          {selected.label}
        </span>
        <svg
          className={`w-4 h-4 text-coffee transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-blush rounded-sm shadow-md max-h-72 overflow-y-auto">
          {VIBE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                option.value === value ? "bg-gray-50" : ""
              }`}
            >
              <span className={`${option.fontClass} text-lg text-espresso`}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WritePage() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("all");
  const [fontFamily, setFontFamily] = useState("surprise");
  const [agreed, setAgreed] = useState(false);
  const [formState, setFormState] = useState<FormState>("writing");
  const [formError, setFormError] = useState<string | null>(null);

  const selectedVibe = VIBE_OPTIONS.find((v) => v.value === fontFamily) || VIBE_OPTIONS[0];
  const textareaFontClass = fontFamily === "surprise" ? "font-hand" : selectedVibe.fontClass;

  const handleSubmit = async () => {
    setFormError(null);

    if (!text || text.length < 50) {
      setFormError("Your entry needs to be at least 50 characters.");
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
        body: JSON.stringify({ text, mode, font_family: fontFamily }),
      });

      if (res.ok) {
        setFormState("thankyou");
      } else if (res.status === 451) {
        // Crisis content — show crisis popup, preserve draft
        setFormState("crisis");
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
    setMode("all");
    setFontFamily("surprise");
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
            className="font-nav text-sm px-5 py-2.5 rounded-full border border-espresso text-espresso hover:bg-gray-100 transition-colors"
          >
            Write another
          </button>
          <Link
            href="/"
            className="font-nav text-sm px-5 py-2.5 rounded-full border border-blush text-softbrown hover:bg-gray-50 transition-colors"
          >
            Read entries
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
          This sounds like it might need more support than an entry can hold.
          We&apos;re not able to publish this, but here are some places that
          can actually help:
        </p>
        <div className="flex flex-col gap-2 mb-8">
          <a href="https://chadd.org" target="_blank" rel="noopener noreferrer" className="font-nav text-sm text-coffee hover:text-espresso underline">
            CHADD — Children and Adults with ADHD
          </a>
          <a href="https://add.org" target="_blank" rel="noopener noreferrer" className="font-nav text-sm text-coffee hover:text-espresso underline">
            ADDA — Attention Deficit Disorder Association
          </a>
          <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer" className="font-nav text-sm text-coffee hover:text-espresso underline">
            988 Suicide &amp; Crisis Lifeline
          </a>
        </div>
        <p className="font-body text-sm text-coffee leading-relaxed mb-8">
          Your experience matters — if you&apos;d like to write a different entry,
          we&apos;d love to read it.
        </p>
        <button
          onClick={resetForm}
          className="font-nav text-sm px-5 py-2.5 rounded-full border border-espresso text-espresso hover:bg-gray-100 transition-colors"
        >
          Write a different entry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 py-8 md:py-16">
      {/* Crisis Popup — blocks everything, preserves draft */}
      {formState === "crisis" && (
        <CrisisPopup
          onRewrite={() => setFormState("writing")}
          onClose={() => setFormState("writing")}
        />
      )}

      <div className="w-full max-w-lg">
        <p className="font-body text-sm md:text-base text-coffee italic text-center mb-10">
          Write a diary entry.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start writing..."
          className={`w-full min-h-[180px] p-5 ${textareaFontClass} text-xl text-espresso bg-white border border-blush rounded-sm resize-none focus:outline-none focus:border-espresso placeholder:text-softbrown`}
        />
        <p className="font-nav text-xs text-softbrown mt-1.5 text-right">
          {text.length} / 50 minimum
        </p>

        <div className="mt-6">
          <label className="font-nav text-sm text-coffee block mb-2">
            If this fits a mood, pick one (optional)
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full p-3 font-nav text-sm text-espresso bg-white border border-blush rounded-sm focus:outline-none focus:border-espresso"
          >
            <option value="all">A little bit of everything</option>
            {MODES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label} — {m.description}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <label className="font-nav text-sm text-coffee block mb-2">
            Choose a vibe (optional)
          </label>
          <VibeDropdown value={fontFamily} onChange={setFontFamily} />
        </div>

        <label className="flex items-start gap-3 mt-6 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1"
          />
          <span className="font-nav text-xs text-coffee">
            I understand my entry will be reviewed before going live.
          </span>
        </label>

        {formError && (
          <p className="font-nav text-xs text-red-600 mt-4">{formError}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={formState === "submitting"}
          className="mt-8 w-full font-nav text-sm px-5 py-3 rounded-full bg-espresso text-white hover:bg-coffee transition-colors disabled:opacity-50"
        >
          {formState === "submitting" ? "Sending..." : "Send your entry"}
        </button>
      </div>
    </div>
  );
}
