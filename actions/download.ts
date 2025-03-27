"use server";

import { maskEmail } from "@/lib/maskEmail";
import { createClient } from "@/utils/supabase/server";
import { downloadUserData as download } from "@/schemas/downloadUserData";

export async function downloadUserData() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("An error occurred. Please try again later.");
  }

  const { data, error } = await supabase
    .from("user_profiles")
    .select("id, email, username, first_name, last_name, created_at")
    .eq("id", user.id);

  if (data?.length) {
    data[0].email = maskEmail(data[0].email);
  }

  if (error) {
    throw new Error("An error occurred. Please try again later.");
  }

  if (!data || data.length === 0) {
    throw new Error("User data not found.");
  }

  try {
    const validatedUser = download.parse(data[0]);
    validatedUser.email = maskEmail(validatedUser.email);
    return JSON.stringify(validatedUser, null, 2);
  } catch (validationError) {
    throw new Error("Invalid user data format.");
  }
}
