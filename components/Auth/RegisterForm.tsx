"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/actions/auth";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { registerSchema, TRegisterSchema } from "@/schemas/registerSchema";

type FormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const supabase = createClient();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const handleFormSubmit = async (data: TRegisterSchema) => {
    setLoading(true);
    try {
      const result = await register(data);

      if (result.status === "success") {
        await supabase.auth.signOut();
        toast.success("Successfully registered! Redirecting to sign in...");
        router.push(`/${locale}/signIn`);
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:max-w-smd mx-auto flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="w-full mb-4">
            <div className="input-group w-full">
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="input max-w-sm"
                {...formRegister("username")}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
          </div>
          <div className="w-full mb-4">
            <div className="input-group w-full">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="input max-w-sm"
                {...formRegister("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full mb-4">
            <div className="input-group w-full">
              <input
                type="password"
                id="password"
                className="input max-w-sm"
                placeholder="Enter your password"
                {...formRegister("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <div className="w-full mb-4 flex items-center gap-1">
            <input
              type="checkbox"
              className="checkbox"
              id="defaultCheckbox1"
              // {...formRegister("rememberMe")}
            />
            <label
              className="label label-text text-base"
              htmlFor="defaultCheckbox1"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 bg-gradient-to-r from-primary to-neutral bg-clip-text text-transparent font-bold w-fit">
          Already have an account?{" "}
          <Link
            href={`/${locale}/signIn`}
            className="text-primary hover:text-primary-content duration-300"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
