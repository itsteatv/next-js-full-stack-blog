import UserProfileForm from "@/components/UserProfileForm";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

const Dashboard = async () => {
  
  const t = await getTranslations("dashboard");

  return (
    <div className="divide-y divide-white/5">
      <div className="flex mx-auto max-w-2xl gap-x-8 gap-y-10 py-16 px-4 sm:px-6 flex-col lg:px-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold dark:text-white leading-tight">
            {t("personalInfo.title")}
          </h2>
          <p className="mt-1 text-sm leading-6 dark:text-gray-400">
            {t("personalInfo.description")}
          </p>
        </div>

        <div className="md:col-span-2">
          <UserProfileForm
            user="test"
            bio="test"
            socialLinks="test"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
