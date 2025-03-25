"use server";

import { maskEmail } from "@/lib/maskEmail";
import { createClient } from "@/utils/supabase/server";

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

  return JSON.stringify(data, null, 2);
}
