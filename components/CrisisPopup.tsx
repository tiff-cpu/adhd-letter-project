"use client";

export default function CrisisPopup({ onRewrite, onClose }: { onRewrite: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6">
      <div className="bg-white rounded-sm p-8 w-full max-w-md border border-gray-200">
        <h2 className="font-body text-xl text-espresso mb-4">Before you post</h2>

        <div className="font-nav text-sm text-coffee leading-relaxed space-y-4">
          <p>We can&apos;t publish this here.</p>

          <p>
            If you&apos;re feeling unsafe or thinking about harming yourself,
            this space isn&apos;t equipped to provide immediate help &mdash; but
            you deserve real-time support.
          </p>

          <p>
            If you&apos;re in the U.S., call or text <strong>988</strong>.<br />
            If you&apos;re outside the U.S., please contact your local crisis line.<br />
            If you are in immediate danger, call emergency services.
          </p>

          <p className="font-body italic">You are not alone in this moment.</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href="tel:988"
            className="w-full text-center font-nav text-sm px-5 py-3 rounded-full bg-espresso text-white hover:bg-coffee transition-colors"
          >
            Call / Text 988 (U.S.)
          </a>
          <a
            href="https://findahelpline.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center font-nav text-sm px-5 py-3 rounded-full border border-espresso text-espresso hover:bg-gray-100 transition-colors"
          >
            Find your local crisis line
          </a>
          <button
            onClick={onRewrite}
            className="w-full text-center font-nav text-xs text-coffee hover:text-espresso transition-colors mt-2"
          >
            Rewrite and try again
          </button>
        </div>
      </div>
    </div>
  );
}
