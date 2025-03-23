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
import { createClient } from "@/utils/supabase/client";
import { Spinner } from "./Spinner";

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
  const supabase = createClient();

  const t = useTranslations("dashboard");
  const [userData, setUserData] = useState({
    email: user.email || "",
    username: user?.user_metadata?.username || "",
    first_name: user?.user_metadata?.first_name,
    last_name: user?.user_metadata?.last_name,
  });
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
    setLoading(true);
    try {
      const { data, error: profileError } = await supabase
        .from("user_profiles")
        .upsert({
          email: userData.email,
          username: userData.username,
          first_name: userData.first_name,
          last_name: userData.last_name,
        });

      if (profileError) {
        toast.error("Error updating profile: " + profileError.message);
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          username: userData.username,
          first_name: userData.first_name,
          last_name: userData.last_name,
        },
      });

      if (updateError) {
        toast.error("Error updating user metadata: " + updateError.message);
        return;
      }

      toast.success("Profile updated successfully!");
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
        <UserProfileInputs userData={userData} setUserData={setUserData} />
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
