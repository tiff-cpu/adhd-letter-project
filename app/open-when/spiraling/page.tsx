import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open When You're Spiraling After Feeling Rejected — The ADHD Diary Project",
  description:
    "You're not too sensitive. You've just been carrying impact no one else could see.",
};

export default function OpenWhenSpiraling() {
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
          Open When Your Brain Won&apos;t Stop Spiraling
        </h1>

        <div className="font-hand-covered-by-your-grace text-xl md:text-2xl leading-relaxed text-espresso space-y-6">
          <p>Do you remember the first person you called when you learned about RSD?</p>

          <p>For me, it was my mom.</p>

          <p>I&apos;m almost certain the text said:</p>

          <p>&ldquo;IT&apos;S NOT ME. IT&apos;S MY ADHD.&rdquo;</p>

          <p>With a link to a video like I had just uncovered classified information.</p>

          <p>Because my entire childhood soundtrack was:</p>

          <p>&ldquo;You&apos;re sooo sensitive.&rdquo;</p>

          <p>
            Drawn out.<br />
            Exasperated.<br />
            Repeated.
          </p>

          <p>And let me tell you something &mdash;</p>

          <p>
            There is nothing more destabilizing than having your feelings
            hurt&hellip;
          </p>

          <p>and then being told those feelings are wrong.</p>

          <p>Not misunderstood.</p>

          <p>Wrong.</p>

          <p>So you start editing yourself.</p>

          <p>
            You swallow reactions.<br />
            You apologize before you speak.<br />
            You scan every room for signs you&apos;ve already messed up.
          </p>

          <p>
            A neutral tone feels like rejection.<br />
            A small correction feels like proof.<br />
            A delayed reply feels catastrophic.
          </p>

          <p>
            And everyone says,<br />
            &ldquo;Don&apos;t take it so personally.&rdquo;
          </p>

          <p>As if you&apos;re choosing to.</p>

          <p>Learning about RSD didn&apos;t make me dramatic.</p>

          <p>It exposed the pattern.</p>

          <p>It gave language to something I had been blamed for my entire life.</p>

          <p>
            If your body reacts fast&hellip;<br />
            if your chest tightens before your brain catches up&hellip;<br />
            if you replay conversations for hours wondering what you did wrong&mdash;
          </p>

          <p>You&apos;re not broken.</p>

          <p>You&apos;re not weak.</p>

          <p>Your nervous system learned to brace.</p>

          <p>And that makes sense.</p>

          <p>I see you.</p>
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
