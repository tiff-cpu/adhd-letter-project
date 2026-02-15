import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open When… — The ADHD Diary Project",
  description:
    "Start with the one that feels closest to your chest right now.",
};

const pages = [
  { slug: "spiraling", title: "Open when your brain won't stop spiraling" },
  { slug: "feeling-behind", title: "Open when you feel behind" },
  { slug: "ashamed", title: "Open when shame won't let go" },
  { slug: "missed-a-deadline", title: "Open when you missed a deadline" },
  { slug: "ghosted-someone", title: "Open when you ghosted someone" },
];

export default function OpenWhenIndex() {
  return (
    <div className="flex flex-col items-center px-6 py-12 md:py-20">
      <h1 className="font-body text-2xl md:text-3xl text-espresso tracking-wide">
        Open When&hellip;
      </h1>
      <p className="font-body text-sm text-coffee italic mt-4 text-center max-w-md">
        Start with the one that feels closest to your chest right now.
      </p>

      <div className="mt-12 flex flex-col gap-3 w-full max-w-md">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/open-when/${page.slug}`}
            className="group flex items-center justify-between w-full px-5 py-4 rounded-sm border border-gray-200 hover:border-espresso hover:bg-gray-50 transition-all"
          >
            <span className="font-body text-base text-espresso">
              {page.title}
            </span>
            <span className="text-coffee group-hover:text-espresso group-hover:translate-x-1 transition-all">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
