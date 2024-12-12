"use client";

import {
  UserCircleIcon,
  UserGroupIcon,
  AtSymbolIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { updateUserInfo } from "@/actions/updateUserInfo";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { updateBioAndSocialLinks } from "@/actions/updateBioAndSocialLinks";
import { downloadUserData } from "@/actions/downloadUserData";

interface UserProfileFormProps {
  user: KindeUser | null;
  bio?: string;
  socialLinks?: string;
}

const UserProfileForm = ({
  user,
  bio = "",
  socialLinks = "",
}: UserProfileFormProps) => {
  const [formData, setFormData] = useState({
    given_name: user?.given_name || "",
    family_name: user?.family_name || "",
    email: user?.email || "",
    picture: user?.picture || "",
    provided_id: user?.id || "",
    bio: bio || "",
    socialLinks: socialLinks || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  console.log(formData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);

    const { given_name, family_name, picture, bio, socialLinks, email } =
      formData;

    const needsApiUpdate =
      given_name !== user?.given_name ||
      family_name !== user?.family_name ||
      picture !== user?.picture;

    const needsPrismaUpdate = bio !== "" || socialLinks !== "";

    try {
      if (needsApiUpdate) {
        const accessToken = process.env.KINDE_API_ACCESS_TOKEN;
        if (!accessToken) {
          console.warn("Access token is missing. Skipping API update.");
        } else {
          await updateUserInfo({
            given_name,
            family_name,
            picture,
            is_suspended: false,
            is_password_reset_requested: false,
            provided_id: formData.provided_id,
          });
        }
      }

      if (needsPrismaUpdate) {
        const updatedLocalUser = await updateBioAndSocialLinks({
          userId: formData.provided_id,
          bio,
          socialLinks,
          name: given_name,
          familyName: family_name,
          email,
        });

        setFormData((prev) => ({
          ...prev,
          bio: updatedLocalUser.bio || "",
          socialLinks: updatedLocalUser.socialLinks || "",
        }));
      }

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error("Failed to update the profile. Please try again.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadData = async () => {
    setIsDownloading(true);

    try {
      const jsonString = await downloadUserData();

      const blob = new Blob([jsonString], { type: "application/json" });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "user_data.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to download user data:", error);
      alert("Failed to download user data. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex mx-auto max-w-2xl gap-x-8 gap-y-10 px-4 sm:px-6 flex-col lg:px-8">
        <div className="col-span-full flex items-center gap-x-8">
          <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-full w-full text-gray-300"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <div>
            <button
              type="button"
              className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              aria-label="Change avatar"
            >
              Change avatar
            </button>
            <p className="mt-2 text-xs leading-5 text-gray-400">
              JPG, GIF or PNG. 1MB max.
            </p>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-white"
          >
            First name
          </label>

          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mt-[1.2rem]">
              <UserCircleIcon aria-hidden="true" className="h-5 w-5" />
            </div>
          </div>
          <Input
            id="given_name"
            name="given_name"
            type="text"
            value={formData?.given_name || ""}
            onChange={handleChange}
            placeholder="Please enter your first name"
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-white"
          >
            Last name
          </label>
          <div className="mt-2">
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mt-[1.2rem]">
                <UserGroupIcon aria-hidden="true" className="h-5 w-5" />
              </div>
            </div>
            <Input
              id="family_name"
              name="family_name"
              type="text"
              value={formData?.family_name || ""}
              onChange={handleChange}
              placeholder="Please enter your last name"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-white"
          >
            Email address
          </label>
          <div className="mt-2">
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mt-[1.2rem]">
                <AtSymbolIcon aria-hidden="true" className="h-5 w-5" />
              </div>
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData?.email || ""}
              onChange={handleChange}
              placeholder="Please enter your email"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-white"
          >
            Username
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
                value={user?.username || ""}
                onChange={handleChange}
                placeholder="Please enter your username"
                className="flex-1 border-0 bg-transparent py-1.5 pl-10 text-white focus:ring-0 sm:text-sm sm:leading-6
                cursor-not-allowed
                "
                disabled
              />
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="bio"
            className="block text-sm font-medium leading-6 text-white"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us a bit about yourself..."
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            rows={3}
          />
        </div>
        <div className="col-span-full">
          <label
            htmlFor="socialLinks"
            className="block text-sm font-medium leading-6 text-white"
          >
            Social Links
          </label>
          <textarea
            id="socialLinks"
            name="socialLinks"
            value={formData.socialLinks}
            onChange={handleChange}
            placeholder="Provide your social media links (comma-separated)"
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            rows={2}
          />
        </div>
      </div>

      <div className="mt-10 sm:px-6 lg:px-8 px-4 flex flex-col items-start gap-y-5">
        <Button
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          label={isSaving ? "Saving..." : "Save"}
          usePendingStatus={isSaving}
          disabled={isSaving}
        />
      </div>
      <div className="flex items-start mx-auto max-w-2xl gap-x-8 gap-y-10 px-4 py-24 sm:px-6 flex-col lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-white">
            Export account data
          </h2>
        </div>

        <Button
          type="submit"
          className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400"
          onClick={handleDownloadData}
          label={isDownloading ? "Downloading..." : "Download"}
          usePendingStatus={isDownloading}
          disabled={isDownloading}
        />
      </div>
    </form>
  );
};

export default UserProfileForm;
