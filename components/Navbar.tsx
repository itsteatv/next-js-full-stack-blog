"use client";

import Loading from "@/app/[locale]/blog/loading";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";

function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("navbar");

  const { user, isAuthenticated, isLoading, getPermission } =
    useKindeBrowserClient();

  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  const requiredPermission = getPermission("all::permissions");
  const isAdmin = requiredPermission?.isGranted;

  const userProfile = {
    name: user?.given_name,
    email: user?.email,
    imageUrl: user?.picture,
  };

  return (
    <>
      <nav className="navbar rounded-box justify-between gap-4 shadow bg-[#272332]">
        <div className="navbar-start">
          {/* Drawer Button */}
          <button
            type="button"
            className="btn btn-sm btn-text btn-circle swap swap-rotate"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="overlay-navigation-example"
            data-overlay="#overlay-navigation-example"
          >
            <input aria-label="checkbox" type="checkbox" />
            <span className="icon-[solar--menu-dots-bold-duotone] swap-off size-6"></span>
            <span className="icon-[solar--x] swap-on"></span>
          </button>
        </div>

        {/* Auth */}
        <div className="join">
          <button className="btn btn-outline btn-primary join-item waves waves-primary btn-sm">
            {t("signIn")}
          </button>
          <button className="btn btn-gradient btn-primary join-item waves waves-primary btn-sm">
            {t("register")}
          </button>
        </div>
      </nav>

      {/* Drawer Sidebar */}
      <aside
        id="overlay-navigation-example"
        className="overlay overlay-open:translate-x-0 drawer drawer-start hidden max-w-72"
        tabIndex="-1"
      >
        <div className="drawer-header">
          <h3 className="drawer-title">itsteatv</h3>
          <button
            type="button"
            className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
            aria-label="Close"
            data-overlay="#overlay-navigation-example"
          >
            <span className="icon-[solar--close-circle-bold-duotone] size-[1.375rem]"></span>
          </button>
        </div>
        <div className="drawer-body justify-start pb-6">
          <ul className="menu space-y-0.5 p-0 [&_.nested-collapse-wrapper]:space-y-0.5 [&_ul]:space-y-0.5">
            <li>
              <Link href={`/${locale}/`} className="flex items-center gap-2">
                <span className="icon-[solar--home-bold-duotone] size-5"></span>
                {t("home")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/about`}
                className="flex items-center gap-2"
              >
                <span className="icon-[solar--user-hand-up-bold-duotone] size-5"></span>
                {t("about")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/contact`}
                className="flex items-center gap-2"
              >
                <span className="icon-[solar--letter-bold-duotone] size-5"></span>
                {t("contact")}
              </Link>
            </li>
            <div className="divider text-base-content/50 py-6 after:border-0">
              {t("account")}
            </div>
            <li>
              <Link
                href={`/${locale}/sign-in`}
                className="flex items-center gap-2"
              >
                <span className="icon-[solar--user-check-bold-duotone] size-5"></span>
                {t("signIn")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/register`}
                className="flex items-center gap-2"
              >
                <span className="icon-[solar--user-plus-bold-duotone] size-5"></span>
                {t("register")}
              </Link>
            </li>
            <div className="divider text-base-content/50 py-6 after:border-0">
              {t("miscellaneous")}
            </div>
            <li>
              <Link
                href={`/${locale}/privacy-policy`}
                className="flex items-center gap-2"
              >
                <span className="icon-[solar--key-minimalistic-bold-duotone] size-5"></span>
                {t("privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/terms-of-use`}
                className="flex items-center gap-2"
              >
                <span className="icon-[solar--lightbulb-minimalistic-bold-duotone] size-5"></span>
                {t("termsOfUse")}
              </Link>
            </li>
          </ul>
          <div className="bg-base-200/30 border-base-content/10 mt-4 rounded-md border p-3">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-10 rounded-full">
                <span className="icon-[solar--star-angle-bold-duotone] size-7 shrink-0"></span>
              </div>
            </div>
            <h5 className="text-base-content mt-4 text-lg font-semibold">
              {t("supportOurWork")}
            </h5>
            <p className="text-base-content/80 text-xs">
              {t("supportDescription")}
            </p>
            <button className="btn btn-primary btn-block mt-2">
              {t("supportNow")}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
