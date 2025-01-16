"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";

import Link from "next/link";
import Loading from "@/app/[locale]/blog/loading";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname, useRouter } from "next/navigation";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Button from "./Button";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("navbar");
  const navigation = [
    { name: t("home"), href: `/${locale}/`, current: false },
    { name: t("blog"), href: `/${locale}/blog`, current: false },
    { name: t("about"), href: `/${locale}/about`, current: false },
    { name: t("contact"), href: `/${locale}/contact`, current: false },
  ];

  const userNavigation = [
    { name: "Your Profile", href: `/${locale}/dashboard` },
  ];

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

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: pathname === item.href,
  }));

  return (
    <Disclosure as="nav" className="font-Archivo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              {updatedNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "font-extrabold dark:text-white dark:bg-gray-800 bg-gray-900 text-white duration-300"
                      : "dark:text-gray-300 hover:bg-gray-700 hover:text-white duration-300",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <Link href="/create-post">
                  <div className="flex flex-row">
                    <Button
                      type="button"
                      className="relative duration-300 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      label={t("createPost")}
                      icon={
                        <PlusIcon
                          aria-hidden="true"
                          className="-ml-0.5 h-5 w-5"
                        />
                      }
                    />
                  </div>
                </Link>
                <div className="hidden md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {userProfile.imageUrl ? (
                          <Image
                            alt=""
                            src={userProfile.imageUrl}
                            className="rounded-full"
                            width={32}
                            height={32}
                          />
                        ) : (
                          <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-700">
                            <svg
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              className="h-full w-full text-gray-300"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                        )}
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md dark:bg-[#121212] bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <Link
                            href={item.href}
                            className="block px-3 py-2 text-sm duration-300
                            dark:text-white text-black hover:text-white data-[focus]:bg-gray-700 rounded-md"
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ))}
                      <LogoutLink className="block rounded-md px-3 py-2 text-base font-medium duration-300 text-red-600 hover:bg-red-700 hover:text-white ">
                        Logout
                      </LogoutLink>
                      <div className="px-3 py-2">
                        <label
                          htmlFor="language"
                          className="block text-sm font-medium dark:text-gray-400 mb-2"
                        >
                          Language
                        </label>
                        <select
                          id="language"
                          value={locale}
                          onChange={handleLanguageChange}
                          className="block w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:text-gray-300 px-3 py-2 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm duration-300"
                        >
                          <option value="en">English</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="ru">Русский</option>
                          <option value="zh">中文</option>
                        </select>
                      </div>
                      <div className="px-3 py-2 ">
                        <ThemeSwitcher />
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4 flex-row-reverse">
                <span className="isolate inline-flex rounded-md shadow-sm">
                  <LoginLink>
                    <Button
                      label="Login"
                      className="relative inline-flex items-center duration-300 rounded-l-md rounded-r-md px-3 py-2 text-sm font-semibold dark:text-white hover:bg-white dark:hover:text-black focus:z-10"
                      type="button"
                    />
                  </LoginLink>

                  <RegisterLink>
                    <Button
                      label="Register"
                      className="relative inline-flex items-center duration-300 rounded-l-md rounded-r-md px-3 py-2 text-sm font-semibold dark:text-white hover:bg-gray-100 dark:hover:text-black focus:z-10"
                      type="button"
                    />
                  </RegisterLink>
                </span>
                <ThemeSwitcher />
              </div>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {updatedNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 dark:text-white text-white duration-300"
                  : "dark:text-white hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium duration-300"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {isAuthenticated && (
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5 sm:px-6">
              <div className="flex-shrink-0">
                {userProfile.imageUrl ? (
                  <Image
                    alt=""
                    src={userProfile.imageUrl}
                    className="rounded-full"
                    width={32}
                    height={32}
                  />
                ) : (
                  <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-700">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-full w-full text-gray-300"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                )}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium dark:text-white">
                  {userProfile.name}
                </div>
                <div className="text-sm font-medium dark:text-gray-400">
                  {userProfile.email}
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-3 px-2 sm:px-3">
              {userNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-md duration-300 px-3 py-2 text-base font-medium dark:text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
              <LogoutLink className="block rounded-md px-3 py-2 text-base font-medium text-red-600 hover:bg-red-700 hover:text-white">
                Logout
              </LogoutLink>
              <div className="relative">
                <label htmlFor="language" className="sr-only">
                  Select Language
                </label>
                <select
                  id="language"
                  value={locale}
                  onChange={handleLanguageChange}
                  className="block w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:text-gray-300 px-3 py-2 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm duration-300"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ru">Русский</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </div>
            <div className="px-4 py-2 mt-4">
              <ThemeSwitcher />
            </div>
          </div>
        )}
      </DisclosurePanel>
    </Disclosure>
  );
}
