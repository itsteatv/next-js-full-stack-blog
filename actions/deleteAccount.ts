"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const cookieStore = cookies();

const supabaseAdmin = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PULIC_SUPABASE_SERVICE_ROLE!,
  {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {}
      },
    },
  }
);

export const deleteAccount = async (userId: string) => {
  const supabase = await createClient();

  try {
    const { error: dataError } = await supabase
      .from("user_profiles")
      .delete()
      .eq("id", userId);

    if (dataError) {
      console.error("Error deleting user data:", dataError.message);
      return { error: "Failed to delete user data." };
    }

    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(
      userId
    );

    if (authError) {
      console.error("Error deleting user account:", authError.message);
      return { error: "Failed to delete user account." };
    }

    await supabase.auth.signOut();

    revalidatePath("/en/blog");

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
};
