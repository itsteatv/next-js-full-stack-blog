"use client";

import React from "react";
import {
  UserCircleIcon,
  UserGroupIcon,
  AtSymbolIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Input from "@/components/Input";
import { useTranslations } from "next-intl";

interface UserProfileInputsProps {
  formData: {
    given_name: string;
    family_name: string;
    email: string;
    bio: string;
    socialLinks: string;
    username?: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const UserProfileInputs = ({ formData, onChange }: UserProfileInputsProps) => {
  const t = useTranslations("dashboard");

  return (
    <div className="flex flex-col gap-y-6">
      <div className="sm:col-span-3">
        <label
          htmlFor="given_name"
          className="block text-sm font-medium leading-6 dark:text-white"
        >
          {t("inputs.firstName.label")}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
            <UserCircleIcon aria-hidden="true" className="h-5 w-5" />
          </div>
          <Input
            id="given_name"
            name="given_name"
            type="text"
            value={formData?.given_name || ""}
            onChange={onChange}
            placeholder={t("inputs.firstName.placeholder")}
            className="block w-full rounded-md border-0 py-1.5 pl-10 dark:text-white bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label
          htmlFor="family_name"
          className="block text-sm font-medium leading-6 dark:text-white"
        >
          {t("inputs.lastName.label")}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
            <UserGroupIcon aria-hidden="true" className="h-5 w-5" />
          </div>
          <Input
            id="family_name"
            name="family_name"
            type="text"
            value={formData?.family_name || ""}
            onChange={onChange}
            placeholder={t("inputs.lastName.placeholder")}
            className="block w-full rounded-md border-0 py-1.5 pl-10 dark:text-white bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 dark:text-white"
        >
          {t("inputs.email.label")}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm bg-white/5 ring-1 ring-inset ring-white/10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
            <AtSymbolIcon aria-hidden="true" className="h-5 w-5" />
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData?.email || ""}
            onChange={onChange}
            placeholder={t("inputs.email.placeholder")}
            className="block w-full rounded-md border-0 py-1.5 pl-10 dark:text-white bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
            disabled
          />
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor={t("inputs.username.label")}
          className="block text-sm font-medium leading-6 dark:text-white"
        >
          {t("inputs.username.label")}{" "}
        </label>
        <div className="mt-2">
          <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute left-0 flex items-center pl-3">
                <UserIcon aria-hidden="true" className="h-5 w-5" />
              </div>
            </div>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username || ""}
              onChange={onChange}
              placeholder={t("inputs.username.placeholder")}
              className="block w-full rounded-md border-0 py-1.5 pl-10 dark:text-white bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="bio"
          className="block text-sm font-medium leading-6 dark:text-white"
        >
          {t("inputs.bio.label")}
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={onChange}
          placeholder={t("inputs.bio.placeholder")}
          className="block w-full rounded-md border-0 py-1.5 pl-3 dark:text-white shadow-sm bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
          rows={3}
        />
      </div>

      <div className="col-span-full">
        <label
          htmlFor="socialLinks"
          className="block text-sm font-medium leading-6 dark:text-white"
        >
          {t("inputs.socialLinks.label")}
        </label>
        <textarea
          id="socialLinks"
          name="socialLinks"
          value={formData.socialLinks}
          onChange={onChange}
          placeholder={t("inputs.socialLinks.placeholder")}
          className="block w-full rounded-md border-0 py-1.5 pl-3 bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
          rows={2}
        />
      </div>
    </div>
  );
};

export default UserProfileInputs;
