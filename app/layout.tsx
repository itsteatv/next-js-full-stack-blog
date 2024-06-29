import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
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
    <html lang="en" className="bg-[#000000]">
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
