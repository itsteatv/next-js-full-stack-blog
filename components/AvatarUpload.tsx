"use client";

import React from "react";
import Button from "./Button";
import Image from "next/image";

type AvatarUploadProps = {
  avatarUrl?: string;
  title: string;
  description: string;
  onClick?: () => void;
};

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarUrl,
  title,
  description,
  onClick,
}) => {
  console.log(title);

  return (
    <div className="flex items-center gap-x-8">
      {/* Avatar */}
      <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-full w-full text-gray-300"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </span>

      {/* Title, Description, and Button */}
      <div>
        <Button
          type="button"
          onClick={onClick}
          className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold dark:text-white shadow-sm hover:bg-white/20"
          label={title}
        />
        <p className="mt-2 text-xs leading-5 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AvatarUpload;
