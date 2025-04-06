"use server";

import { createClient } from "@/utils/supabase/server";

export async function updateUserProfile({
  email,
  username,
  first_name,
  last_name,
}: {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated." };

  const updatesNeeded = {
    email: email !== user.email,
    metadata:
      user.user_metadata?.username !== username ||
      user.user_metadata?.first_name !== first_name ||
      user.user_metadata?.last_name !== last_name,
    profile: true,
  };

  if (updatesNeeded.email) {
    const { error: emailError } = await supabase.auth.updateUser({ email });
    if (emailError) return { error: emailError.message };
  }

  if (updatesNeeded.metadata) {
    const { error: metaError } = await supabase.auth.updateUser({
      data: {
        username,
        first_name,
        last_name,
      },
    });
    if (metaError) return { error: metaError.message };
  }

  if (updatesNeeded.profile) {
    const { error: dbError } = await supabase.from("user_profiles").upsert({
      id: user.id,
      email,
      username,
      first_name,
      last_name,
    });

    if (dbError) return { error: dbError.message };
  }

  return { success: true };
}
