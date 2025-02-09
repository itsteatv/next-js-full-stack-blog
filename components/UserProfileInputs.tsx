"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface UserProfileInputsProps {
  formData: {
    given_name: string;
    family_name: string;
    email: string;
    bio: string;
    socialLinks: string;
    username?: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const UserProfileInputs = ({ formData, onChange }: UserProfileInputsProps) => {
  const t = useTranslations("dashboard");

  return (
    <div className="flex flex-col gap-y-6 w-full">
      <div className="w-full">
        <div className="input-group w-full">
          <span className="input-group-text">
            <span className="icon-[solar--user-hand-up-bold-duotone] text-base-content/80 size-5"></span>
          </span>
          <input
            type="text"
            className="input max-w-sm"
            id="given_name"
            name="given_name"
            value={formData?.given_name || ""}
            onChange={onChange}
            placeholder={t("inputs.firstName.placeholder")}
          />
        </div>
      </div>

      <div className="w-full">
        <div className="input-group w-full">
          <span className="input-group-text">
            <span className="icon-[solar--users-group-two-rounded-bold-duotone] text-base-content/80 size-5"></span>
          </span>
          <input
            type="text"
            className="input max-w-sm"
            id="family_name"
            name="family_name"
            value={formData?.family_name || ""}
            onChange={onChange}
            placeholder={t("inputs.lastName.placeholder")}
          />
        </div>
      </div>

      <div className="w-full">
        <div className="input-group w-full">
          <span className="input-group-text">
            <span className="icon-[solar--mention-square-bold-duotone] text-base-content/80 size-5"></span>
          </span>
          <input
            type="email"
            className="input max-w-sm cursor-not-allowed"
            id="email"
            name="email"
            value={formData?.email || ""}
            onChange={onChange}
            placeholder={t("inputs.email.placeholder")}
            disabled
          />
        </div>
      </div>

      <div className="w-full">
        <div className="input-group w-full">
          <span className="input-group-text">
            <span className="icon-[solar--user-speak-bold-duotone] text-base-content/80 size-5"></span>
          </span>
          <input
            type="text"
            className="input max-w-sm cursor-not-allowed"
            id="username"
            name="username"
            value={formData.username || ""}
            onChange={onChange}
            placeholder={t("inputs.username.placeholder")}
            disabled
          />
        </div>
      </div>

      <div className="w-full">
        <div className="input-group w-full">
          <span className="input-group-text">
            <span className="icon-[solar--pen-bold-duotone] text-base-content/80 size-5"></span>
          </span>
          <textarea
            className="textarea w-full"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={onChange}
            placeholder={t("inputs.bio.placeholder")}
            rows={3}
          />
        </div>
      </div>

      <div className="w-full">
        <div className="input-group w-full">
          <span className="input-group-text">
            <span className="icon-[solar--paperclip-bold-duotone] text-base-content/80 size-5"></span>
          </span>
          <textarea
            className="textarea w-full"
            id="socialLinks"
            name="socialLinks"
            value={formData.socialLinks}
            onChange={onChange}
            placeholder={t("inputs.socialLinks.placeholder")}
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileInputs;
