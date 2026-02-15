import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "The ADHD Letter Project",
  description:
    "A random note from someone who gets your ADHD brain — so you never have to feel like the only one again.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="w-full py-8 px-6 md:px-12 text-center">
          <p className="font-nav text-xs text-softbrown">
            This is not therapy. This is not medical advice. This is not crisis
            support. It&apos;s just people being honest with each other.
          </p>
          <div className="mt-3 flex items-center justify-center gap-6">
            <Link
              href="/about"
              className="font-nav text-xs text-softbrown hover:text-coffee transition-colors"
            >
              About
            </Link>
            <Link
              href="/resources"
              className="font-nav text-xs text-softbrown hover:text-coffee transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/privacy"
              className="font-nav text-xs text-softbrown hover:text-coffee transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
