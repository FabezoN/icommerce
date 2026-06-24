import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dancingScript = localFont({
  src: "./fonts/DancingScript.woff2",
  variable: "--font-dancing-script",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bazar",
  description: "Tout ce dont vous avez besoin, au meilleur prix.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
