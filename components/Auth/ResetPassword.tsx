"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/actions/auth";
import toast from "react-hot-toast";
import {
  passwordMatchSchema,
  TPasswordMatchSchema,
} from "@/schemas/passwordMatchSchema";

const ResetPassword = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TPasswordMatchSchema>({
    resolver: zodResolver(passwordMatchSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const handleFormSubmit = async (data: TPasswordMatchSchema) => {
    setError(null);
    setLoading(true);

    try {
      const response = await resetPassword({
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });

      if (response.error) {
        setError(response.message);
      } else {
        toast.success("Password successfully reset!");
        reset();
        router.replace(`/${locale}/blog`);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:max-w-smd mx-auto flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Password Input */}
          <div className="w-full mb-4">
            <div className="input-group w-full">
              <span className="input-group-text">
                <span className="icon-[solar--lock-password-bold-duotone] text-base-content/80 size-5"></span>
              </span>
              <input
                {...register("password")}
                type="password"
                className="input max-w-sm"
                placeholder="Enter your new password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="w-full mb-4">
            <div className="input-group w-full">
              <span className="input-group-text">
                <span className="icon-[solar--lock-password-bold-duotone] text-base-content/80 size-5"></span>
              </span>
              <input
                {...register("passwordConfirm")}
                type="password"
                className="input max-w-sm"
                placeholder="Confirm your password"
              />
            </div>
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm mt-1">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-block transition"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
