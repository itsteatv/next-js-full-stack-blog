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
import { User } from "@supabase/supabase-js";

interface UserProfileFormProps {
  user: User;
  bio?: string;
  socialLinks?: string;
}

const UserProfileForm = ({
  user,
  bio = "",
  socialLinks = "",
}: UserProfileFormProps) => {
  const t = useTranslations("dashboard");
  const userRole = "user";

  const handleSubmit = async () => {
    console.log("Saving user profile...");
  };

  console.log(user);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div className="flex mx-auto max-w-2xl gap-x-8 gap-y-10 px-4 sm:px-6 flex-col lg:px-8">
        <RoleCard
          title={t("role.title")}
          description={t("role.description")}
          role={userRole}
        />
        <AvatarUpload
          title={t("avatar.title")}
          description={t("avatar.description")}
        />
        <UserProfileInputs user={user} bio={bio} socialLinks={socialLinks} />
      </div>

      <div className="mt-10 sm:px-6 lg:px-8 px-4 flex flex-col items-start gap-y-5">
        <Button
          className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleSubmit}
          label={t("SaveInfo.saveButton")}
          disabled={false}
          isLoading={false}
          pendingContent={t("SaveInfo.saveLoading")}
          loadingComponent={<Loading color="white" />}
        />
      </div>

      <DownloadDataSection />
      <DeleteAccountSection userId={user.id} />
    </form>
  );
};

export default UserProfileForm;
