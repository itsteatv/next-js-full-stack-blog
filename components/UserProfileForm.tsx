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
import { Spinner } from "./Spinner";
import { updateUserProfile } from "@/actions/updateUserProfile";
import {
  TUserProfileSchema,
  userProfileSchema,
} from "@/schemas/userProfileSchema";

interface UserProfileFormProps {
  user: User;
  // bio?: string;
  // socialLinks?: string;
}

const UserProfileForm = ({
  user,
}: // bio = "",
// socialLinks = "",
UserProfileFormProps) => {
  const t = useTranslations("dashboard");
  const [userData, setUserData] = useState<TUserProfileSchema>({
    email: user.email || "",
    username: user?.user_metadata?.username || "",
    first_name: user?.user_metadata?.first_name || "",
    last_name: user?.user_metadata?.last_name || "",
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof TUserProfileSchema, string>>
  >({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserData({
      email: user.email || "",
      username: user?.user_metadata?.username || "",
      first_name: user?.user_metadata?.first_name,
      last_name: user?.user_metadata?.last_name,
    });
  }, [user]);

  const handleSubmit = async () => {
    const parsed = userProfileSchema.safeParse(userData);

    if (!parsed.success) {
      const flattenedErrors = parsed.error.flatten().fieldErrors;
      const formattedErrors: Partial<Record<keyof typeof userData, string>> =
        {};
      for (const key in flattenedErrors) {
        const firstError = flattenedErrors[key as keyof typeof userData]?.[0];
        if (firstError) {
          formattedErrors[key as keyof typeof userData] = firstError;
        }
      }

      setFormErrors(formattedErrors);
      toast.error(Object.values(formattedErrors)[0] || "Invalid input.");
      return;
    }

    setFormErrors({});

    setLoading(true);
    try {
      const result = await updateUserProfile(parsed.data);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(
          `Confirmation email sent to ${parsed.data.email}. Please check your inbox.`
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div className="flex mx-auto max-w-2xl gap-x-8 gap-y-10 px-4 sm:px-6 flex-col lg:px-8">
        <RoleCard
          title={t("role.title")}
          description={t("role.description")}
          role="user"
        />
        <AvatarUpload
          title={t("avatar.title")}
          description={t("avatar.description")}
        />
        <UserProfileInputs
          userData={userData}
          setUserData={setUserData}
          formErrors={formErrors}
        />
      </div>

      <div className="mt-10 sm:px-6 lg:px-8 px-4 flex flex-col items-start gap-y-5">
        <Button
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-500 hover:scale-105 focus:outline-none focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-opacity-75 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={handleSubmit}
          label={t("SaveInfo.saveButton")}
          disabled={loading}
          isLoading={loading}
          pendingContent={t("SaveInfo.saveLoading")}
          loadingComponent={
            <div className="flex">
              <Spinner width={24} height={24} color="white" />
            </div>
          }
        />
      </div>

      <DownloadDataSection />
      <DeleteAccountSection userId={user.id} />
    </form>
  );
};

export default UserProfileForm;
