import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open When Shame Won't Let Go — The ADHD Diary Project",
  description: "Shame is loud. But it's not telling you the truth.",
};

export default function OpenWhenAshamed() {
  return (
    <div className="flex flex-col items-center px-6 py-12 md:py-20">
      <div className="w-full max-w-2xl">
        <Link
          href="/open-when"
          className="font-nav text-sm text-coffee hover:text-espresso transition-colors mb-8 inline-block"
        >
          &larr; Back to Open When&hellip;
        </Link>

        <h1 className="font-body text-2xl md:text-3xl text-espresso tracking-wide mb-12">
          Open When Shame Won&apos;t Let Go
        </h1>

        <div className="font-hand-allura text-xl md:text-2xl leading-relaxed text-espresso space-y-6">
          <p>This page is coming soon.</p>
          <p>In the meantime &mdash; shame is loud, but it&apos;s not telling you the truth.</p>
        </div>

        <hr className="my-12 border-t border-gray-200" />

        <div className="flex items-center justify-center gap-6">
          <Link href="/" className="font-nav text-sm text-coffee hover:text-espresso transition-colors">
            Read a diary entry
          </Link>
          <span className="text-gray-300">&middot;</span>
          <Link href="/write" className="font-nav text-sm text-coffee hover:text-espresso transition-colors">
            Write your own
          </Link>
        </div>
      </div>
    </div>
  );
}
