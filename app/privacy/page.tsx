export default function PrivacyPage() {
  return (
    <div className="flex flex-col items-center px-6 py-8 md:py-16">
      <div className="w-full max-w-lg">
        <h1 className="font-body text-xl text-espresso font-semibold mb-6">
          Privacy Policy
        </h1>
        <div className="font-body text-sm text-coffee leading-relaxed space-y-4">
          <p>
            The ADHD Diary Project collects minimal data to operate this site.
          </p>
          <p>
            <strong>What we collect:</strong> If you submit a note, we store the
            note text and the mood you selected. If you sign up for our email
            list, we store your email address. We also store anonymous reactions
            (helped / not for me) and reports.
          </p>
          <p>
            <strong>What we do not collect:</strong> We do not use cookies for
            tracking. We do not sell your data. We do not share your information
            with third parties.
          </p>
          <p>
            <strong>Note submissions:</strong> All notes are reviewed before
            being published. Submitted notes are anonymous — no personal
            information is attached to them.
          </p>
          <p>
            <strong>Email list:</strong> If you provide your email, it is stored
            securely and used only to send occasional updates. You can
            unsubscribe at any time.
          </p>
          <p>
            <strong>Questions:</strong> If you have questions about your data,
            contact us through the About page.
          </p>
        </div>
      </div>
    </div>
  );
}
