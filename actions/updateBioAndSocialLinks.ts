"use server";

import prisma from "@/lib/db";

interface UpdateBioAndSocialLinksParams {
  userId: string;
  bio?: string;
  socialLinks?: string;
  name?: string;
  familyName?: string;
  email?: string;
}

export async function updateBioAndSocialLinks({
  userId,
  bio,
  socialLinks,
  name,
  familyName,
  email,
}: UpdateBioAndSocialLinksParams) {
  try {
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: { bio, socialLinks },
      create: {
        id: userId,
        name: name || "Unknown",
        email: email || "unknown@example.com",
        familyName: familyName || "Unknown",
        bio: bio || null,
        socialLinks: socialLinks || null,
      },
    });

    return user;
  } catch (error) {
    console.error("Failed to update bio and social links:", error);
    throw new Error("Could not update bio and social links.");
  }
}
