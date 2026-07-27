import type { Metadata } from "next";
import "./globals.css";
import FloatingDownload from "./floating-download";

export const metadata: Metadata = {
  metadataBase: new URL("https://slushiq.com"),
  title: { default: "SlushIQ | Slush Machine Calculator & Frozen Drink App", template: "%s | SlushIQ" },
  description: "Calculate, balance, scale, and rescue frozen drinks for Ninja SLUSHi, Iceman, and other home slush machines with the SlushIQ app.",
  keywords: ["slush machine calculator", "frozen drink calculator", "Ninja SLUSHi calculator", "Iceman Slush Ease calculator", "Brix calculator", "frozen cocktail app", "slush recipe calculator"],
  openGraph: { title: "Better slush. Zero guesswork.", description: "The frozen drink intelligence app for home slush machines.", url: "https://slushiq.com", siteName: "SlushIQ", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "SlushIQ — Better slush. Zero guesswork." }] },
  twitter: { card: "summary_large_image", title: "Better slush. Zero guesswork.", description: "Build, balance, and rescue frozen drinks with SlushIQ.", images: [{ url: "/og.png", width: 1200, height: 630, alt: "SlushIQ — Better slush. Zero guesswork." }] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<FloatingDownload /></body></html>;
}
