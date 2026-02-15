import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open When You Missed a Deadline — The ADHD Diary Project",
  description: "Missing a deadline is an event. It is not a personality.",
};

export default function OpenWhenMissedDeadline() {
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
          Open When You Missed a Deadline
        </h1>

        <div className="font-hand-reenie-beanie text-xl md:text-2xl leading-relaxed text-espresso space-y-6">
          <p>Take one breath before you read the rest of this.</p>

          <p>You missed it.</p>

          <p>
            The email wasn&apos;t sent.<br />
            The form wasn&apos;t submitted.<br />
            The assignment wasn&apos;t finished.<br />
            The thing slipped.
          </p>

          <p>And now your brain is saying:</p>

          <p>
            &ldquo;This is it.&rdquo;<br />
            &ldquo;They&apos;re done with me.&rdquo;<br />
            &ldquo;I always mess things up.&rdquo;<br />
            &ldquo;I&apos;m so irresponsible.&rdquo;
          </p>

          <p>Slow down.</p>

          <p>Missing a deadline is an event.</p>

          <p>It is not a personality.</p>

          <p>
            ADHD brains are time-blind.<br />
            We underestimate.<br />
            We avoid.<br />
            We miscalculate.
          </p>

          <p>This is not moral failure.</p>

          <p>It&apos;s executive dysfunction colliding with a clock.</p>

          <p>Yes, there may be consequences.</p>

          <p>But consequences are not character verdicts.</p>

          <p>You miscalculated.</p>

          <p>And miscalculations can be repaired.</p>

          <p>
            Even late.<br />
            Even embarrassed.
          </p>

          <p>You are not the mistake.</p>
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
