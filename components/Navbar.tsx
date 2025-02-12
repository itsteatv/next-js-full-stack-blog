"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChangeEvent, useEffect, useState } from "react";
import { themeChange } from "theme-change";

function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("navbar");
  themeChange();

  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<string>(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("theme") || "light"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <>
      {/* Navbar Section */}
      <nav className="navbar rounded-box justify-between gap-4 shadow">
        <div className="navbar-start">
          {/* Drawer (Sidebar) Toggle Button */}
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

        <div className="flex gap-4 items-center">
          <div className="dropdown relative inline-flex rtl:[--placement:bottom-end]">
            <button
              id="dropdown-menu-icon"
              type="button"
              className="dropdown-toggle btn btn-text btn-primary"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <span className="icon-[solar--planet-bold-duotone] size-6"></span>
            </button>
            <div
              className="dropdown-menu dropdown-open:opacity-100 hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-transportation"
            >
              {/* Language Selection Dropdown */}
              <div className="dropdown-item gap-4">
                <input
                  id="dropdown-radio-en"
                  name="language-radio"
                  type="radio"
                  className="radio radio-primary"
                  value="en"
                  checked={locale === "en"}
                  onChange={handleLanguageChange}
                />
                <label
                  htmlFor="dropdown-radio-en"
                  className="text-base-content block text-sm font-semibold"
                >
                  English
                </label>
              </div>
              <div className="dropdown-item gap-4">
                <input
                  id="dropdown-radio-fr"
                  name="language-radio"
                  type="radio"
                  className="radio radio-primary"
                  value="fr"
                  checked={locale === "fr"}
                  onChange={handleLanguageChange}
                />
                <label
                  htmlFor="dropdown-radio-fr"
                  className="text-base-content text-sm font-semibold"
                >
                  Français
                </label>
              </div>
              <div className="dropdown-item gap-4">
                <input
                  id="dropdown-radio-de"
                  name="language-radio"
                  type="radio"
                  className="radio radio-primary"
                  value="de"
                  checked={locale === "de"}
                  onChange={handleLanguageChange}
                />
                <label
                  htmlFor="dropdown-radio-de"
                  className="text-base-content text-sm font-semibold"
                >
                  Deutsch
                </label>
              </div>
              <div className="dropdown-item gap-4">
                <input
                  id="dropdown-radio-zh"
                  name="language-radio"
                  type="radio"
                  className="radio radio-primary"
                  value="zh"
                  checked={locale === "zh"}
                  onChange={handleLanguageChange}
                />
                <label
                  htmlFor="dropdown-radio-zh"
                  className="text-base-content text-sm font-semibold"
                >
                  中文
                </label>
              </div>
              <div className="dropdown-item gap-4">
                <input
                  id="dropdown-radio-ru"
                  name="language-radio"
                  type="radio"
                  className="radio radio-primary"
                  value="ru"
                  checked={locale === "ru"}
                  onChange={handleLanguageChange}
                />
                <label
                  htmlFor="dropdown-radio-ru"
                  className="text-base-content text-sm font-semibold"
                >
                  Русский
                </label>
              </div>
            </div>
          </div>

          {/* Authentication Buttons (Sign In & Register) */}
          <div className="join">
            <button className="btn btn-outline btn-primary join-item waves waves-primary btn-sm">
              {t("signIn")}
            </button>
            <button className="btn btn-gradient btn-primary join-item waves waves-primary btn-sm">
              {t("register")}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar (Drawer Navigation) */}
      <aside
        id="overlay-navigation-example"
        className="overlay overlay-open:translate-x-0 drawer drawer-start hidden max-w-72"
        tabIndex="-1"
      >
        {/* Sidebar Header */}
        <div className="drawer-header">
          <h3 className="drawer-title">itsteatv</h3>
          {/* Close Button for Sidebar */}
          <button
            type="button"
            className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
            aria-label="Close"
            data-overlay="#overlay-navigation-example"
          >
            <span className="icon-[solar--close-circle-bold-duotone] size-[1.375rem]"></span>
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="drawer-body justify-start pb-6">
          <ul className="menu space-y-0.5 p-0 [&_.nested-collapse-wrapper]:space-y-0.5 [&_ul]:space-y-0.5">
            {/* Home Link */}
            <li>
              <Link href={`/${locale}/`} className="flex items-center gap-2">
                <span className="icon-[solar--home-bold-duotone] size-5"></span>
                {t("home")}
              </Link>
            </li>
            {/* About Link */}
            <li>
              <Link
                href={`/${locale}/about`}
                className="flex items-center gap-2"
              >
                <span className="icon-[solar--user-hand-up-bold-duotone] size-5"></span>
                {t("about")}
              </Link>
            </li>
            {/* Contact Link */}
            <li>
              <Link
                href={`/${locale}/contact`}
                className="flex items-center gap-2"
              >
                <span className="icon-[solar--letter-bold-duotone] size-5"></span>
                {t("contact")}
              </Link>
            </li>

            {/* Account Section Divider */}
            <div className="divider text-base-content/50 py-6 after:border-0">
              {t("account")}
            </div>

            {/* Sign In & Register Links */}
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

            {/* Miscellaneous Section Divider */}
            <div className="divider text-base-content/50 py-6 after:border-0">
              {t("miscellaneous")}
            </div>

            {/* Privacy Policy & Terms of Use Links */}
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

            {/* Theme Selection Dropdown */}
            <div className="dropdown relative inline-flex rtl:[--placement:bottom-end] mx-5 pt-3">
              <button
                id="dropdown-default"
                type="button"
                className="dropdown-toggle btn btn-primary btn-outline max-sm:btn-square"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                <span className="max-sm:hidden">Theme</span>
                <span className="icon-[tabler--aperture] block size-6 sm:hidden"></span>
                <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-5 max-sm:hidden"></span>
              </button>
              {/* Theme Options */}
              <ul
                className="dropdown-menu dropdown-open:opacity-100 hidden min-w-40"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="dropdown-default"
              >
                {[
                  "light",
                  "dark",
                  "gourmet",
                  "corporate",
                  "luxury",
                  "soft",
                ].map((themeOption) => (
                  <li key={themeOption}>
                    <input
                      type="radio"
                      name="theme-dropdown"
                      className="theme-controller btn btn-text w-full justify-start"
                      aria-label={themeOption}
                      value={themeOption}
                      checked={theme === themeOption}
                      onChange={() => handleThemeChange(themeOption)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </ul>

          {/* Support Section */}
          <div className="bg-base-200/30 border-base-content/10 mt-4 rounded-md border p-3">
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
