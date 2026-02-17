import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import ShareButton from "@/components/ShareButton";

const FONT_MAP: Record<string, string> = {
  "permanent-marker": "font-hand-permanent-marker",
  "reenie-beanie": "font-hand-reenie-beanie",
  "nothing-you-could-do": "font-hand-nothing-you-could-do",
  "covered-by-your-grace": "font-hand-covered-by-your-grace",
  "allura": "font-hand-allura",
  "courier-new": "font-hand-courier-new",
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { data } = await supabaseAdmin
    .from("notes")
    .select("body")
    .eq("id", params.id)
    .eq("status", "approved")
    .single();

  const snippet = data
    ? data.body.length > 140
      ? data.body.slice(0, 140) + "…"
      : data.body
    : "A random diary entry from someone whose brain works like yours.";

  return {
    robots: { index: false, follow: false },
    openGraph: {
      title: "The ADHD Diary Project",
      description: snippet,
      siteName: "The ADHD Diary Project",
      type: "article",
      images: [
        {
          url: "https://adhddiaryproject.com/og-default.png",
          width: 1200,
          height: 630,
          alt: "the adhd diary project",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "The ADHD Diary Project",
      description: snippet,
      images: ["https://adhddiaryproject.com/og-default.png"],
    },
  };
}

export default async function EntryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { data, error } = await supabaseAdmin
    .from("notes")
    .select("id, body, font_family")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (error || !data) {
    notFound();
  }

  const fontClass =
    data.font_family
      ? FONT_MAP[data.font_family] || "font-hand-permanent-marker"
      : "font-hand-permanent-marker";

  return (
    <div className="flex flex-col items-center px-6 py-8 md:py-16">
      <p className="font-body text-sm md:text-base text-coffee italic text-center max-w-md mb-10 md:mb-14">
        This was written by someone whose brain works like yours.
      </p>

      <div className="w-full max-w-2xl mx-auto">
        <div className="note-card relative rounded-sm p-6 md:p-14 min-h-[200px] md:min-h-[280px]">
          <p
            className={`${fontClass} text-lg md:text-3xl leading-relaxed text-espresso`}
          >
            {data.body}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <ShareButton entryId={data.id} />
      </div>

      <Link
        href="/"
        className="mt-10 font-nav text-sm px-5 py-2 rounded-full border border-espresso text-espresso hover:bg-gray-100 transition-colors"
      >
        Read another
      </Link>
    </div>
  );
}
