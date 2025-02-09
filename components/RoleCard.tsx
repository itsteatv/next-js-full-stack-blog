"use client";
import React from "react";

type RoleCardProps = {
  title: string;
  description: string;
  role: "admin" | "user" | "guest";
};

const RoleCard = ({ title, description, role }: RoleCardProps) => {
  const roleStyles = {
    admin: "bg-primary text-white",
    user: "bg-primary text-white",
    guest: "bg-primary text-white",
  };

  return (
    <div className="p-6 rounded-xl bg-gradient-to-r from-primary to-neutral-content shadow-xl flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="icon-[solar--shield-user-bold-duotone] text-white size-12"></span>
        <div>
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-white">{description}</p>
        </div>
      </div>

      <div
        className={`px-4 py-2 rounded-full text-sm font-medium inline-flex items-center ${roleStyles[role]}`}
      >
        <span className="font-bold">
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default RoleCard;
