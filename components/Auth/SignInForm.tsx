"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/actions/auth";
import GithubLogin from "./GithubLogin";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, TSignInSchema } from "@/schemas/signInSchema";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const handleFormSubmit = async (data: TSignInSchema) => {
    setLoading(true);
    try {
      const result = await signIn(data);

      if (result.status === "success") {
        toast.success("Successfully signed in! Redirecting...");
        reset();
        router.push(`/${locale}/blog`);
      } else {
        toast.error(result.message || "Sign-in failed. Please try again.");
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
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="w-full mb-4">
            <div className="input-group w-full">
              <span className="input-group-text">
                <span className="icon-[solar--mention-square-bold-duotone] text-base-content/80 size-5"></span>
              </span>
              <input
                id="email"
                type="email"
                className="input max-w-sm"
                placeholder="Enter your email"
                {...formRegister("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="w-full mb-4">
            <div className="input-group w-full">
              <span className="input-group-text">
                <span className="icon-[solar--lock-password-bold-duotone] text-base-content/80 size-5"></span>
              </span>
              <input
                id="password"
                type="password"
                className="input max-w-sm"
                placeholder="Enter your password"
                {...formRegister("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <GithubLogin />

        <p className="mt-4 bg-gradient-to-r from-primary to-neutral bg-clip-text text-transparent font-bold w-fit">
          Don't have an account?{" "}
          <Link
            href={`/${locale}/register`}
            className="text-primary hover:text-primary-content duration-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
