"use client";

import { signInWithGoogle } from "@/actions/auth";
import React, { useTransition } from "react";

const GoogleLogin = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    startTransition(async () => {
      await signInWithGoogle();
    });
  };

  return (
    <div
      onClick={handleLogin}
      className="w-full btn mt-2 border-[#DB4437] bg-[#DB4437] text-white shadow-[#DB4437]/30 hover:bg-[#DB4437]/90"
    >
      <span className="icon-[tabler--brand-google]"></span>
      {isPending ? "Redirecting..." : "Connect Google"}
    </div>
  );
};

export default GoogleLogin;
