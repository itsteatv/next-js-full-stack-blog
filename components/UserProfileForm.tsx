"use client";

import Button from "@/components/Button";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loading from "@/app/[locale]/blog/loading";
import { useTranslations } from "next-intl";

import RoleCard from "./RoleCard";
import AvatarUpload from "./AvatarUpload";
import DownloadDataSection from "./DownloadDataSection";
import DeleteAccountSection from "./DeleteAccountSection";
import UserProfileInputs from "./UserProfileInputs";

interface UserProfileFormProps {
  user: string | null;
  bio?: string;
  socialLinks?: string;
}

const UserProfileForm = ({
  user,
  bio = "",
  socialLinks = "",
}: UserProfileFormProps) => {
  const [formData, setFormData] = useState({
    given_name: "",
    family_name: "",
    email: "",
    picture: "",
    provided_id: "",
    bio: bio || "",
    socialLinks: socialLinks || "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const [userRole, setUserRole] = useState<string>("guest");

  const t = useTranslations("dashboard");

  const handleSubmit = async () => {
    setIsSaving(true);

    const { given_name, family_name, picture, bio, socialLinks, email } =
      formData;

    const needsPrismaUpdate = bio !== "" || socialLinks !== "";
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
