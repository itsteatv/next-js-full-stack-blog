import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import UserProfileForm from "@/components/UserProfileForm";

const Dashboard = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const localUser = await prisma.user.findUnique({
    where: { id: user?.id },
    select: { bio: true, socialLinks: true },
  });

  return (
    <div className="divide-y divide-white/5">
      <div className="flex mx-auto max-w-2xl gap-x-8 gap-y-10 py-16 px-4 sm:px-6 flex-col lg:px-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold dark:text-white leading-tight">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 dark:text-gray-400">
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <div className="md:col-span-2">
          <UserProfileForm
            user={user}
            bio={localUser?.bio || ""}
            socialLinks={localUser?.socialLinks || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
