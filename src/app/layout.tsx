import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PawRomer | Travel Better With Your Dog",
  description:
    "Premium travel essentials for dogs and their owners. Explore carriers, bowls, seat covers and outdoor accessories designed for every adventure.",
  keywords: [
    "dog travel gear",
    "dog carrier",
    "travel dog bowl",
    "car seat cover for dogs",
    "dog outdoor accessories",
    "PawRomer",
  ],
  openGraph: {
    title: "PawRomer | Travel Better With Your Dog",
    description:
      "Premium travel essentials for dogs and their owners. Explore carriers, bowls, seat covers and outdoor accessories designed for every adventure.",
    type: "website",
    locale: "en_US",
    siteName: "PawRomer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
