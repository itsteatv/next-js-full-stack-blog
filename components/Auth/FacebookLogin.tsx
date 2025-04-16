"use client";

import { signInWithFacebook } from "@/actions/auth";
import React, { useTransition } from "react";

const FacebookLogin = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    startTransition(async () => {
      await signInWithFacebook();
    });
  };

  return (
    <div
      onClick={handleLogin}
      className="btn btn-block mt-2 border-[#1877f2] bg-[#1877f2] text-white shadow-[#1877f2]/30 hover:bg-[#1877f2]/90"
    >
      <span className="icon-[tabler--brand-facebook]"></span>
      {isPending ? "Redirecting..." : "Connect Facebook"}
    </div>
  );
};

export default FacebookLogin;
