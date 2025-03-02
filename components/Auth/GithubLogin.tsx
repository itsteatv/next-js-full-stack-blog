"use client";

import { signInWithGithub } from "@/actions/auth";
import React, { useTransition } from "react";
import { FaGithub } from "react-icons/fa";

const GithubLogin = () => {
  const [isPending, startTransition] = useTransition();

  const handleGithubLogin = () => {
    startTransition(async () => {
      await signInWithGithub();
    });
  };
  return (
    <div
      onClick={handleGithubLogin}
      className="btn btn-block mt-2 border-[#2b3137] bg-[#2b3137] text-white shadow-[#2b3137]/30 hover:border-[#2b3137] hover:bg-[#2b3137]/90"
    >
      <span className="icon-[tabler--brand-github]"></span>
      {isPending ? "Redirecting..." : "Login with Github"}
    </div>
  );
};

export default GithubLogin;
