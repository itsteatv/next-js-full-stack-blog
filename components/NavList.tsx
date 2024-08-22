import Loading from "@/app/blog/loading";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Button from "./Button";
import AdminButton from "@/components/AdminButton";

const NavList = () => {
  const pathname = usePathname();

  const isActive = function (href: string) {
    return pathname === href ? "font-bold" : "";
  };

  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) {
    return <Loading />;
  }

  console.log(user, isAuthenticated);

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {[
        { href: "/blog", text: "Blog" },
        { href: "/contact", text: "Contact" },
        { href: "/about", text: "About" },
      ].map(({ href, text }) => (
        <li
          key={href}
          className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
            href
          )}`}
        >
          <Link href={href} className="flex items-center transition-colors">
            {text}
          </Link>
        </li>
      ))}

      {isAuthenticated ? (
        <>
          <li
            className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
              "/create-post"
            )}`}
          >
            <Link
              href="/create-post"
              className="flex items-center transition-colors"
            >
              Create Post
            </Link>
          </li>
          <li
            className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
              "/Dashboard"
            )}`}
          >
            <Link
              href="/dashboard"
              className="flex items-center transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <LogoutLink>
              <Button
                content="Logout"
                type="button"
                color="red"
                ripple
                size="sm"
                variant="gradient"
                className="text-white font-bold"
              />
            </LogoutLink>
          </li>
          <li>{user?.given_name}</li>
        </>
      ) : (
        <>
          <li
            className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
              "/login"
            )}`}
          >
            <LoginLink>
              <Button
                content="Login"
                type="button"
                size="sm"
                variant="filled"
                className="font-bold"
              />
            </LoginLink>
          </li>
          <li
            className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
              "/register"
            )}`}
          >
            <RegisterLink>
              <Button
                content="Register"
                type="button"
                size="sm"
                variant="filled"
                className="font-bold"
              />
            </RegisterLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavList;
