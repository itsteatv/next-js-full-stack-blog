import Link from "next/link";
import Button from "@/components/Button";

const NotFound = () => {
  return (
    <div className="mt-36 px-4 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-black text-white">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-300 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-300">We can't find that page.</p>

        <Link href="/">
          <Button
            type="button"
            label="Go Back Home"
            className="text-white border-white font-Archivo rounded-full  mt-6 font-extralight"
          />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
