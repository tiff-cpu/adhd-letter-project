"use client";

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full py-8 px-6 md:px-12">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="font-body text-xl md:text-2xl tracking-widest uppercase text-espresso hover:text-coffee transition-colors"
        >
          The ADHD Diary Project
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/write"
            className="font-nav text-sm tracking-wide text-coffee hover:text-espresso transition-colors"
          >
            Write an Entry
          </Link>
          <Link
            href="/about"
            className="font-nav text-sm tracking-wide text-coffee hover:text-espresso transition-colors"
          >
            About
          </Link>
          <Link
            href="/resources"
            className="font-nav text-sm tracking-wide text-coffee hover:text-espresso transition-colors"
          >
            Resources
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-coffee"
          aria-label="Menu"
        >
          {open ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 pb-4">
          <Link
            href="/write"
            onClick={() => setOpen(false)}
            className="font-nav text-sm text-coffee hover:text-espresso transition-colors"
          >
            Write an Entry
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="font-nav text-sm text-coffee hover:text-espresso transition-colors"
          >
            About
          </Link>
          <Link
            href="/resources"
            onClick={() => setOpen(false)}
            className="font-nav text-sm text-coffee hover:text-espresso transition-colors"
          >
            Resources
          </Link>
        </div>
      )}
    </nav>
  );
}
