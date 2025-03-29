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
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error("An error occurred. Please try again later.");
  }

  if (!data) {
    throw new Error("User data not found.");
  }


  const validatedUser = download.parse(data);
  console.log("Validated User:", validatedUser);

  validatedUser.email = maskEmail(validatedUser.email);

  return JSON.stringify(validatedUser, null, 2);
}
