"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { User } from "@supabase/supabase-js";

interface UserProfileInputsProps {
  userData: { email: string; username: string };
  setUserData: React.Dispatch<
    React.SetStateAction<{ email: string; username: string }>
  >;
  // bio?: string;
  // socialLinks?: string;
}

const UserProfileInputs = ({
  userData,
  setUserData,
}: UserProfileInputsProps) => {
  const t = useTranslations("dashboard");

  return (
    <div className="flex flex-col gap-y-6 w-full">
      {/* <div className="w-full">
        <div className="input-group w-full">
          <span className="input-group-text">
            <span className="icon-[solar--users-group-two-rounded-bold-duotone] text-base-content/80 size-5"></span>
          </span>
          <input
            type="text"
            className="input max-w-sm"
            id="family_name"
            name="family_name"
            value=""
            placeholder={t("inputs.lastName.placeholder")}
          />
        </div>
      </div> */}

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
            value={userData.email}
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
            className="input max-w-sm"
            id="username"
            name="username"
            value={userData.username}
            placeholder={t("inputs.username.placeholder")}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </div>
      </div>

      {/* <div className="w-full">
        <div className="input-group w-full">
          <span className="input-group-text">
            <span className="icon-[solar--pen-bold-duotone] text-base-content/80 size-5"></span>
          </span>
          <textarea
            className="textarea w-full"
            id="bio"
            name="bio"
            value=""
            placeholder={t("inputs.socialLinks.placeholder")}
            rows={3}
          />
        </div>
      </div> */}

      {/* <div className="w-full">
        <div className="input-group w-full">
          <span className="input-group-text">
            <span className="icon-[solar--paperclip-bold-duotone] text-base-content/80 size-5"></span>
          </span>
          <textarea
            className="textarea w-full"
            id="socialLinks"
            name="socialLinks"
            value=""
            placeholder={t("inputs.socialLinks.placeholder")}
            rows={2}
          />
        </div>
      </div> */}
    </div>
  );
};

export default UserProfileInputs;