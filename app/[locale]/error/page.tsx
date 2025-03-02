"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ErrorPage() {
  const pathname = usePathname();

  const locale = pathname.split("/")[1] || "en";

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-neutral">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
          Something went wrong
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href={`/${locale}/blog`} className="btn btn-primary transition">
            Go back home
          </Link>
          <Link
            href="https://github.com/itsteatv"
            target="_blank"
            className="text-sm font-semibold text-neutral"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
