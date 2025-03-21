import UserProfileForm from "@/components/UserProfileForm";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

const Dashboard = async () => {
  const t = await getTranslations("dashboard");

  const supabase = await createClient();
  const headersList = headers();
  const pathname = headersList.get("next-url") || "/en";
  const locale = pathname.split("/")[1] || "en";

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect(`/${locale}/signIn`);
  }

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
          <UserProfileForm user={data?.user} bio="" socialLinks="" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
