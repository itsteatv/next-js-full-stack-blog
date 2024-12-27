import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { siteConfig } from "@/lib/siteConfig";
import { AuthProvider } from "@/app/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Server Actions",
    "Tailwind CSS",
    "Javascript",
    "Typescript",
    "Blog",
    "Zod",
    "Sqlite",
    "Prisma",
  ],
  authors: [
    {
      name: "itsteatv",
      url: "https://github.com/itsteatv",
    },
  ],
  creator: "isteatv",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.og,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Open Graph Image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.og],
    creator: "itsteatv",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html
        className="touch-pan-x touch-pan-y"
        lang="en"
        suppressHydrationWarning
      >
        <body className={inter.className}>
          <ThemeProvider>
            <NextTopLoader showSpinner={false} color="#fff" />
            <Toaster />
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
