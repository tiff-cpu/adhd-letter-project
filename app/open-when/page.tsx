import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open When… — The ADHD Diary Project",
  description:
    "Start with the one that feels closest to your chest right now.",
};

const pages = [
  { slug: "spiraling", title: "Open when your brain won't stop spiraling" },
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

      <div className="mt-12 flex flex-col gap-6 w-full max-w-md">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/open-when/${page.slug}`}
            className="font-body text-base text-espresso hover:text-coffee transition-colors"
          >
            {page.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
