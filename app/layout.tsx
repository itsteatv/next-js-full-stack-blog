import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { Providers } from "@/providers/MaterialTailwindProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full stack blog",
  description: "Next.js 14 full stack blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
    >
      <Providers>
        <body className={inter.className}>
          <NextTopLoader showSpinner={false} color="#fff" />
          <Toaster />
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
