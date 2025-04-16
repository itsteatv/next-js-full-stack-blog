"use client";

import { signInWithDiscord } from "@/actions/auth";
import React, { useTransition } from "react";

const DiscordLogin = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    startTransition(async () => {
      await signInWithDiscord();
    });
  };

  return (
    <div
      onClick={handleLogin}
      className="btn btn-block mt-2 border-[#5865F2] bg-[#5865F2] text-white shadow-[#5865F2]/30 hover:bg-[#5865F2]/90"
    >
      <span className="icon-[tabler--brand-discord]"></span>
      {isPending ? "Redirecting..." : "Connect Discord"}
    </div>
  );
};

export default DiscordLogin;
