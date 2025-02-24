"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  console.log(formData);

  const supabase = await createClient();

  const credentials = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log(credentials);

  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.username,
      },
    },
  });

  console.log(error);

  if (error) {
    return {
      status: error.message,
      user: null,
    };
  } else if (data.user?.identities?.length === 0) {
    return {
      status: "User with this email already exists",
      user: null,
    };
  }

  revalidatePath("/en/blog");

  console.log(data.user);

  return { status: "success", user: data.user };
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return {
      status: error.message,
      user: null,
    };
  }

  console.log(error);

  revalidatePath("/en/blog");

  console.log(data.user);

  return { status: "success", user: data.user };
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/en/error");
  }

  revalidatePath("en/blog");

  redirect("/en/signIn");
}
