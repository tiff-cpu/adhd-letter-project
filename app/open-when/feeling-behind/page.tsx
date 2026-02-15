import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open When You Feel Behind — The ADHD Diary Project",
  description: "You are not behind. You are on a nonlinear path. And nonlinear does not mean wrong.",
};

export default function OpenWhenFeelingBehind() {
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
          Open When You Feel Behind
        </h1>

        <div className="font-hand-nothing-you-could-do text-xl md:text-2xl leading-relaxed text-espresso space-y-6">
          <p>There&apos;s a specific ache to this one.</p>

          <p>
            You see someone your age who seems further.<br />
            More stable.<br />
            More certain.
          </p>

          <p>And the thought creeps in:</p>

          <p>&ldquo;I should be further by now.&rdquo;</p>

          <p>ADHD time is not linear.</p>

          <p>
            We sprint.<br />
            We stall.<br />
            We rebuild.<br />
            We pivot.
          </p>

          <p>From the outside it looks inconsistent.</p>

          <p>From the inside it feels like constantly catching up.</p>

          <p>Comparison hides the effort.</p>

          <p>
            It hides the mental load.<br />
            It hides the resilience.<br />
            It hides how much energy it takes you to function in systems not built for your brain.
          </p>

          <p>You are not behind.</p>

          <p>You are on a nonlinear path.</p>

          <p>And nonlinear does not mean wrong.</p>

          <p>I see the effort that doesn&apos;t show up on paper.</p>

          <p>It counts.</p>
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
