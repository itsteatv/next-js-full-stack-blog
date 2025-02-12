import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import Navbar from "@/components/Navbar";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { siteConfig } from "@/lib/siteConfig";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import FlyonuiScript from "@/components/FlyonuiScript";

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

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html
      className="touch-pan-x touch-pan-y"
      lang={locale}
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <NextTopLoader showSpinner={false} color="#fff" />
          <Toaster />
          <Navbar locale={locale} />
          {children}
          <CookieConsentBanner />
          <FlyonuiScript />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
