"use server";

import { registerSchema, TRegisterSchema } from "@/schemas/registerSchema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function register(credentials: TRegisterSchema) {
  const supabase = await createClient();

  const validation = registerSchema.safeParse(credentials);

  if (!validation.success) {
    return {
      status: "error",
      message: validation.error.issues[0]?.message || "Invalid input data",
    };
  }

  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: { username: credentials.username },
    },
  });

  if (error) {
    return { status: "error", message: error.message };
  } else if (data.user?.identities?.length === 0) {
    return { status: "error", message: "User with this email already exists" };
  }

  revalidatePath("/en/blog");

  return {
    status: "success",
    message: "Check your email for confirmation",
    user: data.user,
  };
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { status: error.message, user: null };
  }

  const username = data?.user?.user_metadata?.username;
  if (!username || typeof username !== "string") {
    return { status: "Invalid username", user: null };
  }

  const { data: existingUser } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("email", credentials.email)
    .limit(1)
    .single();

  if (!existingUser) {
    const { error: insertError } = await supabase.from("user_profiles").insert({
      email: data.user.email,
      username: username,
    });

    if (insertError) {
      return { status: insertError.message, user: null };
    }
  }

  revalidatePath("/en/blog");

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

export async function signInWithGithub() {
  const headersList = headers();
  const pathname = headersList.get("next-url") || "/en";
  const locale = pathname.split("/")[1] || "en";

  const origin = await headers().get("origin");

  const redirectUrl = `${origin}/${locale}/auth/callback?next=${pathname}`;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    redirect(`${locale}/error`);
  } else if (data.url) {
    return redirect(data.url);
  }
}

export const forgotPassword = async ({ email }: { email: string }) => {
  const forgotPasswordValidation = forgotPasswordSchema.safeParse({
    email,
  });

  if (!forgotPasswordValidation.success) {
    return {
      error: true,
      message:
        forgotPasswordValidation.error.issues[0]?.message ?? "An error occured",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    success: true,
    message:
      "If an account exists, a password reset email has been sent. Please check your inbox.",
  };
};

export const resetPassword = async ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => {
  const newUserSchema = z.object({
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
  });

  const newUserValidation = newUserSchema.safeParse({
    password,
    passwordConfirm,
  });

  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.issues[0]?.message ?? "An error occured",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  console.log("data : ", data);

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Password reset successful",
  };
};
