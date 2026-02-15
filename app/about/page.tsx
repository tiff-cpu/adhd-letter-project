export default function AboutPage() {
  return (
    <div className="flex flex-col items-center px-6 py-8 md:py-16">
      <div className="w-full max-w-lg">
        <div className="font-body text-base text-espresso leading-relaxed space-y-5">
          <p className="text-lg font-semibold">I&apos;m Tiff.</p>

          <p>
            I&apos;m a dentist who owned her own practice for six years and
            burned out so badly I walked away. That was a year ago. I&apos;m
            still figuring out who I am without the title.
          </p>

          <p>
            I have ADHD. I&apos;m in recovery. I&apos;m a mom. I&apos;m an
            artist. And for a long time, I thought I was the only person whose
            brain worked this way and whose life looked this messy.
          </p>

          <p>I wasn&apos;t.</p>

          <p>
            Every time I post something honest about ADHD on social media, the
            same message comes back: &ldquo;Thank you for sharing this. I
            thought I was the only one.&rdquo;
          </p>

          <p>
            That&apos;s why this exists. Not as therapy. Not as advice. Just a
            place where someone with a brain like yours left something real for
            you to find &mdash; so you don&apos;t have to feel like the only one
            anymore.
          </p>

          <p>I built this because I needed it to exist.</p>

          <p>
            If you want to talk to a real human who gets it,{" "}
            <a
              href="https://calendly.com/tiff-tiffadhddentist/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coffee hover:text-espresso underline"
            >
              book a clarity call
            </a>
            . If you want to keep up with what I&apos;m building,{" "}
            <a
              href="/"
              className="text-coffee hover:text-espresso underline"
            >
              join the list
            </a>
            . No pressure, no spam.
          </p>

          <p>&mdash; Tiff</p>

          <p className="text-xs text-softbrown italic mt-8">
            This site is not therapy, medical advice, or crisis support.
            It&apos;s just people being honest with each other.
          </p>
        </div>
      </div>
    </div>
  );
}
