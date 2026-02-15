export default function ResourcesPage() {
  return (
    <div className="flex flex-col items-center px-6 py-8 md:py-16">
      <div className="w-full max-w-lg">
        <p className="font-body text-base text-espresso leading-relaxed mb-4">
          This site is not therapy, medical advice, or crisis support. If you
          need more than a note right now, here are some places that can help.
        </p>

        <p className="font-body text-sm text-coffee font-medium mb-2">
          This site cannot provide emergency support.
        </p>

        <p className="font-body text-sm text-coffee italic mb-8">
          If something you read on this site brings up hard feelings, please
          talk to someone you trust.
        </p>

        <div className="space-y-5">
          <a href="https://chadd.org" target="_blank" rel="noopener noreferrer" className="block">
            <p className="font-nav text-sm text-espresso font-medium">CHADD</p>
            <p className="font-nav text-xs text-coffee">Children and Adults with ADHD — education, advocacy, and support</p>
          </a>

          <a href="https://add.org" target="_blank" rel="noopener noreferrer" className="block">
            <p className="font-nav text-sm text-espresso font-medium">ADDA</p>
            <p className="font-nav text-xs text-coffee">Attention Deficit Disorder Association — resources and community</p>
          </a>

          <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" className="block">
            <p className="font-nav text-sm text-espresso font-medium">Psychology Today — Find a Therapist</p>
            <p className="font-nav text-xs text-coffee">Search by location, specialty, and insurance</p>
          </a>

          <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer" className="block">
            <p className="font-nav text-sm text-espresso font-medium">988 Suicide &amp; Crisis Lifeline</p>
            <p className="font-nav text-xs text-coffee">Call or text 988 — free, confidential, 24/7</p>
          </a>
          <div className="pt-4 mt-4 border-t border-blush">
            <a href="https://calendly.com/tiff-tiffadhddentist/30min" target="_blank" rel="noopener noreferrer" className="block">
              <p className="font-nav text-sm text-espresso font-medium">Talk to Someone Who Gets It</p>
              <p className="font-nav text-xs text-coffee">Book a clarity call with Tiff — not therapy, just a real conversation</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
