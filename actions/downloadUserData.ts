"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";

export async function downloadUserData(): Promise<string> {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    throw new Error("Unauthorized");
  }

  const user = await getUser();
  const localUser = await prisma.user.findUnique({
    where: { id: user?.id },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      socialLinks: true,
    },
  });

  const data = {
    id: localUser?.id || user?.id,
    name: localUser?.name || `${user?.given_name} ${user?.family_name}`,
    email: localUser?.email || user?.email,
    bio: localUser?.bio || "",
    socialLinks: localUser?.socialLinks || "",
    picture: user?.picture || "",
  };

  return JSON.stringify(data, null, 2);
}
