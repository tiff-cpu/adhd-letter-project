"use client";

import { useState } from "react";
import DownloadGate from "@/components/DownloadGate";
import ResourceList from "@/components/ResourceList";

type Props = {
  initialUnlocked: boolean;
};

export default function DownloadsPageClient({ initialUnlocked }: Props) {
  const [unlocked, setUnlocked] = useState(initialUnlocked);

  if (unlocked) {
    return <ResourceList />;
  }

  return <DownloadGate onUnlocked={() => setUnlocked(true)} />;
}
