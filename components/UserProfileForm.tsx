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
import { userDeleteAccount } from "@/actions/userDeleteAccount";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateBioAndSocialLinks } from "@/actions/updateBioAndSocialLinks";
import { downloadUserData } from "@/actions/downloadUserData";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Modal from "./Modal";
import Loading from "@/app/[locale]/blog/loading";
import { useTranslations } from "next-intl";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [userRole, setUserRole] = useState<string>("guest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const t = useTranslations("dashboard");

  const { getPermission } = useKindeBrowserClient();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (user) {
      const basicUserPermission = getPermission("basic::permissions");
      const adminUserPermission = getPermission("all::permissions");

      console.log(adminUserPermission?.isGranted);

      if (basicUserPermission?.isGranted) {
        setUserRole("user");
      } else if (adminUserPermission?.isGranted) {
        setUserRole("admin");
      } else {
        setUserRole("guest");
      }
    }
  }, [user, getPermission]);

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

  const handleDeleteAccount = async () => {
    let deletionSuccessful = false;

    try {
      setIsDeleting(true);

      await userDeleteAccount({ provided_id: formData.provided_id });

      toast.success("Your account has been successfully deleted.");
      deletionSuccessful = true;

      router.replace("/");

      if (deletionSuccessful) {
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to delete your account. Please try again.");
      console.error("Error deleting account:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex mx-auto max-w-2xl gap-x-8 gap-y-10 px-4 sm:px-6 flex-col lg:px-8">
        <div className="p-6 rounded-xl bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700 shadow-xl flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-white text-indigo-600">
              <UserGroupIcon className="h-8 w-8" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">
                {t("role.title")}
              </h3>
              <p className="text-sm text-gray-200">{t("role.description")}</p>
            </div>
          </div>

          <div
            className={`px-4 py-2 rounded-full text-sm font-medium inline-flex items-center ${
              userRole === "admin"
                ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                : userRole === "user"
                ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                : "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
            }`}
          >
            <span className="font-bold">
              {userRole === "admin" ? "Admin" : "User"}
            </span>
          </div>
        </div>
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
              className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold dark:text-white shadow-sm hover:bg-white/20"
              aria-label={t("avatar.title")}
            >
              {t("avatar.title")}
            </button>
            <p className="mt-2 text-xs leading-5 dark:text-gray-400">
              {t("avatar.description")}
            </p>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor={t("inputs.firstName.label")}
            className="block text-sm font-medium leading-6 dark:text-white"
          >
            {t("inputs.firstName.label")}{" "}
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
            placeholder={t("inputs.firstName.placeholder")}
            className="block w-full rounded-md border-0 py-1.5 pl-10 dark:text-white bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor={t("inputs.lastName.label")}
            className="block text-sm font-medium leading-6 dark:text-white"
          >
            {t("inputs.lastName.label")}
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
              placeholder={t("inputs.lastName.placeholder")}
              className="block w-full rounded-md border-0 py-1.5 pl-10 dark:text-white bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor={t("inputs.email.label")}
            className="block text-sm font-medium leading-6 dark:text-white"
          >
            {t("inputs.email.label")}{" "}
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
              placeholder={t("inputs.email.label")}
              className="block w-full rounded-md border-0 py-1.5 pl-10 dark:text-white bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                value={user?.username || ""}
                onChange={handleChange}
                placeholder={t("inputs.username.placeholder")}
                className="flex-1 focus:ring-0 cursor-not-allowed block w-full rounded-md border-0 py-1.5 pl-10 dark:text-white bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6
                "
                disabled
              />
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor={t("inputs.bio.label")}
            className="block text-sm font-medium leading-6 dark:text-white"
          >
            {t("inputs.bio.label")}
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder={t("inputs.bio.placeholder")}
            className="block w-full rounded-md border-0 py-1.5 pl-3 dark:text-white shadow-sm bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
            rows={3}
          />
        </div>
        <div className="col-span-full">
          <label
            htmlFor={t("inputs.socialLinks.label")}
            className="block text-sm font-medium leading-6 dark:text-white"
          >
            {t("inputs.socialLinks.label")}{" "}
          </label>
          <textarea
            id="socialLinks"
            name="socialLinks"
            value={formData.socialLinks}
            onChange={handleChange}
            placeholder={t("inputs.socialLinks.placeholder")}
            className="block w-full rounded-md border-0  py-1.5 pl-3 bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
            rows={2}
          />
        </div>
      </div>

      <div className="mt-10 sm:px-6 lg:px-8 px-4 flex flex-col items-start gap-y-5">
        <Button
          className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-opacity-75 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={handleSubmit}
          label={t("SaveInfo.saveButton")}
          disabled={isSaving}
          isLoading={isSaving}
          pendingContent={t("SaveInfo.saveLoading")}
          loadingComponent={
            <div className="relative w-6 h-6">
              <Loading color="white" />
            </div>
          }
        />
      </div>
      <div
        className="flex flex-col items-start mx-auto max-w-2xl gap-8 px-4 sm:px-6 py-20 lg:px-8"
        role="region"
        aria-labelledby="export-data-heading"
      >
        <div>
          <h2
            id="export-data-heading"
            className="text-2xl font-semibold dark:text-white leading-tight"
          >
            {t("exportData.title")}{" "}
          </h2>
          <p className="mt-4 text-base dark:text-gray-300 leading-relaxed">
            {t("exportData.description")}{" "}
          </p>
          <p className="mt-2 text-sm dark:text-gray-400">
            {t("exportData.details")}{" "}
          </p>
        </div>

        <Button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white shadow-lg transition duration-300 ease-in-out transform hover:bg-green-500 hover:scale-105 focus:outline-none focus-visible:ring focus-visible:ring-green-400 focus-visible:ring-opacity-75 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={handleDownloadData}
          disabled={isDownloading}
          isLoading={isDownloading}
          label={t("exportData.button")}
          pendingContent={t("exportData.downloadLoading")}
          loadingComponent={
            <div className="relative w-6 h-6">
              <Loading color="white" />
            </div>
          }
          aria-label={
            isDownloading
              ? "Downloading your account data"
              : "Download your account data"
          }
        />
      </div>

      <div
        className="flex flex-col items-start mx-auto max-w-2xl gap-8 px-4 sm:px-6 lg:px-8"
        role="region"
        aria-labelledby="delete-account-heading"
      >
        <div>
          <h2
            id="delete-account-heading"
            className="text-2xl font-semibold dark:text-white leading-tight"
          >
            {t("deleteAccount.title")}
          </h2>
          <p className="mt-4 text-base dark:text-gray-300 leading-relaxed">
            {t("deleteAccount.description")}
          </p>
          <p className="mt-2 text-sm dark:text-gray-400">
            {t("deleteAccount.warning")}
          </p>
        </div>

        <Button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-lg transition duration-300 ease-in-out transform hover:bg-red-500 hover:scale-105 focus:outline-none focus-visible:ring focus-visible:ring-red-400 focus-visible:ring-opacity-75 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={openModal}
          disabled={isDeleting}
          isLoading={isDeleting}
          label={t("deleteAccount.button")}
          pendingContent={t("deleteAccount.deleteLoading")}
          loadingComponent={
            <div className="relative w-6 h-6">
              <Loading color="white" />
            </div>
          }
          aria-label={
            isDeleting ? "Deleting your account" : "Delete your account"
          }
        />

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="text-center">
              <h3 className="text-lg font-semibold dark:text-white">
                {t("modal.title")}
              </h3>
              <p className="mt-2 text-sm dark:text-white">
                {t("modal.description")}
              </p>
              <div className="mt-4 flex justify-center space-x-4">
                <Button
                  className="rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400"
                  onClick={closeModal}
                  label={t("modal.cancel")}
                />
                <Button
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
                  onClick={async () => {
                    await handleDeleteAccount();
                    closeModal();
                  }}
                  label={
                    isDeleting ? t("modal.deleteLoading") : t("modal.delete")
                  }
                  disabled={isDeleting}
                  isLoading={isDeleting}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </form>
  );
};

export default UserProfileForm;
