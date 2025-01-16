import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Next.js Learning Hub",
};

const About = () => {
  return (
    <div className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Link
          href="https://github.com/itsteatv"
          target="_blank"
          className="text-base font-semibold leading-7 text-indigo-600"
        >
          Connect With Me
        </Link>
        <h2 className="mt-2 text-4xl font-bold tracking-tight dark:text-white sm:text-6xl">
          About Our Mission
        </h2>
        <p className="mt-6 text-lg leading-8 dark:text-gray-300">
          Our goal is to create a comprehensive learning resource by showcasing
          Next.js features. Join us in exploring the future of web development.
        </p>
      </div>
    </div>
  );
};

export default About;
