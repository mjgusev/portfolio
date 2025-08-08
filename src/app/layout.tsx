import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ProgressBar from "@/components/ProgressBar";
import ThemePanel from "@/components/ThemePanel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Misha Gusev — Portfolio",
  description:
    "Software engineer specializing in backend systems and modern web. Go, Java, Python, Vue.",
  metadataBase: new URL("https://www.mjgusev.dev"),
  openGraph: {
    title: "Misha Gusev — Portfolio",
    description:
      "Software engineer specializing in backend systems and modern web. Go, Java, Python, Vue.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Misha Gusev — Portfolio",
    description:
      "Software engineer specializing in backend systems and modern web. Go, Java, Python, Vue.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a href="#education" className="skip-link">Skip to content</a>
        <div className="grain-overlay" />
        <ProgressBar />
        <div className="nav-blur-veil" />
        <Nav />
        {children}
        {/* ThemePanel button removed per request; panel remains available via code if needed */}
      </body>
    </html>
  );
}
