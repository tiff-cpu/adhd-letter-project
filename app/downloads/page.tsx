import { cookies } from "next/headers";
import type { Metadata } from "next";
import DownloadsPageClient from "./DownloadsPageClient";

export const metadata: Metadata = {
  title: "The ADHD Lab — The ADHD Diary Project",
  description:
    "Experiments for a nonlinear brain. Free ADHD resources — no account needed.",
};

export default function DownloadsPage() {
  const cookieStore = cookies();
  const unlocked = cookieStore.get("downloads_unlocked")?.value === "1";

  return (
    <div className="flex flex-col items-center px-6 pt-16 pb-12 md:pt-[100px] md:pb-20">
      <h1 className="font-lab text-3xl md:text-4xl font-bold text-espresso tracking-tight text-center mb-[60px]">
        The ADHD Lab
      </h1>
      <p className="font-lab text-base md:text-lg font-normal text-coffee text-center max-w-md leading-relaxed mb-10">
        Experiments for a nonlinear brain.
      </p>

      <DownloadsPageClient initialUnlocked={unlocked} />
    </div>
  );
}
