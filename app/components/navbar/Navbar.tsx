"use client";

import { useEffect, useState } from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  IconButton,
} from "@material-tailwind/react";

import NavList from "./NavList";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <MTNavbar className="bg-transparent mx-auto max-w-full rounded-none mt-0 px-6 py-3 border-none">
      <div className="flex items-center justify-between text-[#d6d6d6]">
        <div className="mr-4 cursor-pointer py-1.5">
          <Link
            href="/"
            className="flex font-normal font-Archivo items-center transition-colors"
          >
            Home
          </Link>
        </div>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </MTNavbar>
  );
};

export default Navbar;
