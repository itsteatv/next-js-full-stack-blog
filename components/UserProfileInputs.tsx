"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { TUserProfileSchema } from "@/schemas/userProfileSchema";

interface UserProfileInputsProps {
  userData: TUserProfileSchema;
  setUserData: React.Dispatch<React.SetStateAction<TUserProfileSchema>>;
  formErrors: Partial<Record<keyof TUserProfileSchema, string>>;
}

const UserProfileInputs = ({
  userData,
  setUserData,
  formErrors,
}: UserProfileInputsProps) => {
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
            value={userData.first_name}
            onChange={(e) =>
              setUserData({ ...userData, first_name: e.target.value })
            }
            placeholder={t("inputs.firstName.placeholder")}
          />
        </div>
        {formErrors.first_name && (
          <p className="text-red-500 text-sm mt-1">{formErrors.first_name}</p>
        )}
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
            value={userData.last_name}
            placeholder={t("inputs.lastName.placeholder")}
            onChange={(e) =>
              setUserData({ ...userData, last_name: e.target.value })
            }
          />
        </div>
        {formErrors.last_name && (
          <p className="text-red-500 text-sm mt-1">{formErrors.last_name}</p>
        )}
      </div>

      <div className="w-full">
        <div className="input-group w-full">
          <span className="input-group-text">
            <span className="icon-[solar--mention-square-bold-duotone] text-base-content/80 size-5"></span>
          </span>
          <input
            type="email"
            className="input max-w-sm"
            id="email"
            name="email"
            value={userData.email}
            placeholder={t("inputs.email.placeholder")}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>
        {formErrors.email && (
          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
        )}
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
        {formErrors.username && (
          <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
        )}
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
