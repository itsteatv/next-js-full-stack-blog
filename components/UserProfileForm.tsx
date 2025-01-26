"use client";

import Button from "@/components/Button";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { updateUserInfo } from "@/actions/updateUserInfo";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateBioAndSocialLinks } from "@/actions/updateBioAndSocialLinks";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Loading from "@/app/[locale]/blog/loading";
import { useTranslations } from "next-intl";

import RoleCard from "./RoleCard";
import AvatarUpload from "./AvatarUpload";
import DownloadDataSection from "./DownloadDataSection";
import DeleteAccountSection from "./DeleteAccountSection";
import UserProfileInputs from "./UserProfileInputs";

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

  const [userRole, setUserRole] = useState<string>("guest");

  const t = useTranslations("dashboard");

  const { getPermission } = useKindeBrowserClient();

  useEffect(() => {
    if (!user) return;

    const basicUserPermission = getPermission("basic::permissions");
    const adminUserPermission = getPermission("all::permissions");

    const role = basicUserPermission?.isGranted
      ? "user"
      : adminUserPermission?.isGranted
      ? "admin"
      : "guest";

    setUserRole(role);
  }, [user, getPermission]);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex mx-auto max-w-2xl gap-x-8 gap-y-10 px-4 sm:px-6 flex-col lg:px-8">
        <RoleCard
          title={t("role.title")}
          description={t("role.description")}
          role={userRole as "admin" | "user" | "guest"}
        />
        <AvatarUpload
          title={t("avatar.title")}
          description={t("avatar.description")}
          // onClick={handleAvatarClick}
          // avatarUrl="https://via.placeholder.com/150"
        />
        <UserProfileInputs formData={formData} onChange={handleInputChange} />
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

      <DownloadDataSection />
      <DeleteAccountSection userId={formData.provided_id} />
    </form>
  );
};

export default UserProfileForm;
