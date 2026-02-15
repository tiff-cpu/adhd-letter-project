import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open When You Ghosted Someone — The ADHD Diary Project",
  description: "You didn't disappear because you don't care. You disappeared because your brain hit capacity.",
};

export default function OpenWhenGhosted() {
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
          Open When You Ghosted Someone
        </h1>

        <div className="font-hand-permanent-marker text-xl md:text-2xl leading-relaxed text-espresso space-y-6">
          <p>First: you&apos;re not a villain.</p>

          <p>
            You didn&apos;t disappear because you don&apos;t care.<br />
            You disappeared because your brain hit capacity and grabbed the nearest exit.
          </p>

          <p>ADHD doesn&apos;t just forget appointments.</p>

          <p>
            It forgets to respond.<br />
            It forgets that time passed.<br />
            It forgets that &ldquo;I&apos;ll answer later&rdquo; turns into three days&hellip; then three weeks&hellip; then a level of shame that makes you want to throw your phone into the ocean.
          </p>

          <p>And then the story starts:</p>

          <p>
            &ldquo;They probably hate me.&rdquo;<br />
            &ldquo;I&apos;m a terrible friend.&rdquo;<br />
            &ldquo;I always do this.&rdquo;<br />
            &ldquo;They&apos;re going to think I don&apos;t care.&rdquo;
          </p>

          <p>So you avoid it more.</p>

          <p>Because the message isn&apos;t just a message anymore.</p>

          <p>
            It&apos;s a confession.<br />
            An apology.<br />
            A character trial.
          </p>

          <p>Avoidance is not the same as indifference.</p>

          <p>
            Sometimes ghosting is overwhelm.<br />
            Sometimes it&apos;s executive dysfunction.<br />
            Sometimes it&apos;s shame piling up until the task feels impossible.
          </p>

          <p>If you&apos;re staring at unread texts like they&apos;re radioactive&mdash;</p>

          <p>I see you.</p>

          <p>You&apos;re not cruel.</p>

          <p>You&apos;re overloaded.</p>

          <p>And you can come back.</p>
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
