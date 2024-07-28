import Link from "next/link";
import { usePathname } from "next/navigation";

const NavList = () => {
  const pathname = usePathname();

  const isActive = function (href: string) {
    return pathname === href ? "font-bold" : "";
  };

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <p
        className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
          "/blog"
        )}`}
      >
        <a href="/blog" className="flex items-center transition-colors">
          Blog
        </a>
      </p>
      <p
        className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
          "/contact"
        )}`}
      >
        <Link href="/contact" className="flex items-center transition-colors">
          Contact
        </Link>
      </p>
      <p
        className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
          "/about"
        )}`}
      >
        <Link href="/about" className="flex items-center transition-colors">
          About
        </Link>
      </p>
      <p
        className={`p-1 duration-150 hover:text-gray-500 text-[#d6d6d6] font-Archivo ${isActive(
          "/about"
        )}`}
      >
        <Link
          href="/create-post"
          className="flex items-center transition-colors"
        >
          Create Post
        </Link>
      </p>
    </ul>
  );
};

export default NavList;
