"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const RegisterForm = () => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  return (
    <div className="sm:max-w-smd mx-auto flex items-center justify-center min-h-screen ">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form>
          <div className="w-full mb-4">
            <div className="input-group w-full">
              <span className="input-group-text">
                <span className="icon-[solar--user-rounded-bold-duotone] text-base-content/80 size-5"></span>
              </span>
              <input
                type="text"
                id="username"
                name="username"
                className="input max-w-sm"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <div className="input-group w-full">
              <span className="input-group-text">
                <span className="icon-[solar--mention-square-bold-duotone] text-base-content/80 size-5"></span>
              </span>
              <input
                type="email"
                id="email"
                name="email"
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
                type="password"
                name="password"
                id="password"
                className="input max-w-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="w-full mb-4 flex items-center gap-1">
            <input type="checkbox" className="checkbox" id="defaultCheckbox1" />
            <label
              className="label label-text text-base"
              for="defaultCheckbox1"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block transition"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 bg-gradient-to-r from-primary to-neutral bg-clip-text text-transparent font-bold w-fit">
          Already have an account?{" "}
          <Link
            href={`/${locale}/signIn`}
            className="text-primary hover:text-primary-content duration-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
