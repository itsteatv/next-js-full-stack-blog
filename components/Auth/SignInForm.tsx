"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/actions/auth";
import GithubLogin from "./GithubLogin";

const SignInForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const result = await signIn(formData);

    console.log(result);

    if (result.status === "success") {
      router.push(`/${locale}/blog`);
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  return (
    <div className="sm:max-w-smd mx-auto flex items-center justify-center min-h-screen ">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-4">
            <div className="input-group w-full">
              <span className="input-group-text">
                <span className="icon-[solar--mention-square-bold-duotone] text-base-content/80 size-5"></span>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                className="input max-w-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <div className="input-group w-full">
              <span className="input-group-text">
                <span className="icon-[solar--lock-password-bold-duotone] text-base-content/80 size-5"></span>
              </span>
              <input
                name="password"
                id="password"
                type="password"
                className="input max-w-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block transition"
          >
            Sign In
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
