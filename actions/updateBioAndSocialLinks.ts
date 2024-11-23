"use server";

import prisma from "@/lib/db";

interface UpdateBioAndSocialLinksParams {
  userId: string;
  bio?: string;
  socialLinks?: string;
}

export async function updateBioAndSocialLinks({
  userId,
  bio,
  socialLinks,
}: UpdateBioAndSocialLinksParams) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        bio,
        socialLinks,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("Failed to update bio and social links:", error);
    throw new Error("Could not update bio and social links.");
  }
}
