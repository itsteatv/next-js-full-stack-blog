import UserProfileForm from "@/components/UserProfileForm";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import GoogleLogin from "@/components/Auth/GoogleLogin";
import FacebookLogin from "@/components/Auth/FacebookLogin";
import DiscordLogin from "@/components/Auth/DiscordLogin";
import { getLinkedStatus } from "@/utils/getLinkedStatus";

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

  const user = data?.user;

  const {
    google: isGoogleLinked,
    facebook: isFacebookLinked,
    discord: isDiscordLinked,
  } = getLinkedStatus(data.user.identities);

  return (
    <div className="divide-y divide-white/5">
      <div className="flex mx-auto max-w-2xl gap-x-8 gap-y-10 py-16 px-4 sm:px-6 flex-col lg:px-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-primary leading-tight">
            Welcome @{user?.user_metadata?.username || "User"}
          </h2>

          {user?.new_email && (
            <div className="bg-primary-content text-primary p-4 rounded mt-7">
              {`Please confirm your new email address: ${user.new_email}. Check your inbox to complete the update.`}
            </div>
          )}
        </div>

        {(!isGoogleLinked || !isFacebookLinked || !isDiscordLinked) && (
          <div className="mt-4 flex flex-col gap-2  px-4 sm:px-6 lg:px-8">
            {!isGoogleLinked && <GoogleLogin />}
            {!isFacebookLinked && <FacebookLogin />}
            {!isDiscordLinked && <DiscordLogin />}
          </div>
        )}

        <div className="md:col-span-2">
          <UserProfileForm user={data?.user} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
