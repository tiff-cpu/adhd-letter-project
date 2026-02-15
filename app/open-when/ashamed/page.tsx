import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open When the Shame Won't Let Go — The ADHD Diary Project",
  description: "Broken things don't try this hard. You are not broken.",
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
          Open When the Shame Won&apos;t Let Go
        </h1>

        <div className="font-hand-allura text-xl md:text-2xl leading-relaxed text-espresso space-y-6">
          <p>If there&apos;s one thing ADHD knows, it&apos;s shame.</p>

          <p>Not the small kind.</p>

          <p>The deep kind.</p>

          <p>
            &ldquo;I&apos;m broken.&rdquo;<br />
            &ldquo;I&apos;ll never be enough.&rdquo;<br />
            &ldquo;Everyone else can do this. Why can&apos;t I?&rdquo;
          </p>

          <p>Shame builds slowly.</p>

          <p>
            Too loud.<br />
            Too distracted.<br />
            Too emotional.<br />
            Too much.
          </p>

          <p>
            Eventually the brain stops saying,<br />
            &ldquo;I made a mistake.&rdquo;
          </p>

          <p>
            It starts saying,<br />
            &ldquo;I am the mistake.&rdquo;
          </p>

          <p>Shame talks in absolutes.</p>

          <p>
            Always.<br />
            Never.<br />
            What&apos;s wrong with you.
          </p>

          <p>
            But shame ignores wiring.<br />
            It ignores effort.<br />
            It ignores how hard you&apos;ve been trying.
          </p>

          <p>Broken things don&apos;t try this hard.</p>

          <p>You are not broken.</p>

          <p>You are someone navigating a world that never adjusted for your brain.</p>

          <p>Of course that leaves marks.</p>

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
