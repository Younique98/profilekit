import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://profilekit.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ProfileKit",
    template: "%s | ProfileKit",
  },
  description:
    "ProfileKit is a full-stack profile view and edit app with form validation, an API route, and a simple relational schema, built with Next.js and Drizzle ORM.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "ProfileKit",
    title: "ProfileKit",
    description:
      "A full-stack profile view and edit app with form validation, an API route, and a simple relational schema, built with Next.js and Drizzle ORM.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "ProfileKit",
    description:
      "A full-stack profile view and edit app with form validation, an API route, and a simple relational schema, built with Next.js and Drizzle ORM.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
