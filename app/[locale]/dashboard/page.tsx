import UserProfileForm from "@/components/UserProfileForm";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SocialLoginButton from "@/components/Auth/SocialLoginButton";
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
    github: isGithubLinked,
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
          <div className="flex flex-col gap-2  px-4 sm:px-6 lg:px-8">
            {!isGoogleLinked && (
              <SocialLoginButton
                provider="google"
                label="Connect Google"
                iconClass="icon-[tabler--brand-google]"
                styles="border-[#DB4437] bg-[#DB4437] text-white shadow-[#DB4437]/30 hover:bg-[#DB4437]/90"
              />
            )}
            {!isFacebookLinked && (
              <SocialLoginButton
                provider="facebook"
                label="Connect Facebook"
                iconClass="icon-[tabler--brand-facebook]"
                styles="border-[#1877f2] bg-[#1877f2] text-white shadow-[#1877f2]/30 hover:bg-[#1877f2]/90"
              />
            )}
            {!isDiscordLinked && (
              <SocialLoginButton
                provider="discord"
                label="Connect Discord"
                iconClass="icon-[tabler--brand-discord]"
                styles="border-[#5865F2] bg-[#5865F2] text-white shadow-[#5865F2]/30 hover:bg-[#5865F2]/90"
              />
            )}
            {!isGithubLinked && (
              <SocialLoginButton
                provider="github"
                label="Connect Github"
                iconClass="icon-[tabler--brand-github]"
                styles="border-[#2b3137] bg-[#2b3137] text-white shadow-[#2b3137]/30 hover:border-[#2b3137] hover:bg-[#2b3137]/90"
              />
            )}
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
