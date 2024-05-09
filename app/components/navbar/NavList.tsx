"use client";

import React from "react";

import { Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavList = () => {
  const pathname = usePathname();

  const isActive = function (href: string) {
    return pathname === href ? "font-bold" : "";
  };

  // TEMPORARY
  const isAdmin = false;
  const session = false;

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
          "/blog"
        )}`}
      >
        <a href="/blog" className="flex items-center transition-colors">
          Blog
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
          "/contact"
        )}`}
      >
        <Link href="/contact" className="flex items-center transition-colors">
          Contact
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
          "/about"
        )}`}
      >
        <Link href="/about" className="flex items-center transition-colors">
          About
        </Link>
      </Typography>
      {session && isAdmin && (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
            "/admin"
          )}`}
        >
          <Link href="/admin" className="flex items-center transition-colors">
            Admin
          </Link>
        </Typography>
      )}
      {!session && (
        <Button
          variant="text"
          className="font-Archivo duration-300"
          color="green"
        >
          Login
        </Button>
      )}
      {session && isAdmin && (
        <Button
          variant="text"
          className="font-Archivo duration-300"
          color="red"
        >
          Logout
        </Button>
      )}
    </ul>
  );
};

export default NavList;
