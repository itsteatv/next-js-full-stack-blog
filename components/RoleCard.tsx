"use client";
import React from "react";

type RoleCardProps = {
  title: string;
  description: string;
  role: "admin" | "user" | "guest";
};

const RoleCard = ({ title, description, role }: RoleCardProps) => {
  const roleStyles = {
    admin: "bg-gradient-to-r from-green-400 to-green-600 text-white",
    user: "bg-gradient-to-r from-blue-400 to-blue-600 text-white",
    guest: "bg-gradient-to-r from-gray-400 to-gray-600 text-white",
  };

  return (
    <div className="p-6 rounded-xl bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700 shadow-xl flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-white text-indigo-600">
       
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-200">{description}</p>
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
