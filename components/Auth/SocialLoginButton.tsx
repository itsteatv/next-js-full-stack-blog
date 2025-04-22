"use client";

import { useTransition } from "react";
import { signInWithOAuthProvider } from "@/actions/auth";

interface SocialLoginButtonProps {
  provider: "google" | "github" | "facebook" | "discord";
  label: string;
  iconClass: string;
  styles: string;
}

const SocialLoginButton = ({
  provider,
  label,
  iconClass,
  styles,
}: SocialLoginButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    startTransition(async () => {
      await signInWithOAuthProvider(provider);
    });
  };

  return (
    <div onClick={handleLogin} className={`btn btn-block mt-2 ${styles}`}>
      <span className={iconClass}></span>
      {isPending ? "Redirecting..." : label}
    </div>
  );
};

export default SocialLoginButton;
