"use client";

import Image from "next/image";
import boyIllustration from "@/public/boyIllustration.svg";
import Link from "next/link";
import Button from "@/components/Button";

const About = () => {
  return (
    <section className="flex">
      <div className="mt-16 1180>=:mt-28 lg:mr-28 lg:w-[30rem] 930>=:w-[25rem] 930>=:mt-[5.5rem] 768<=:hidden">
        <Image src={boyIllustration} alt="blog image" />{" "}
      </div>
      <div className="mt-16 flex-grow">
        <p className="text-white mr-24 mt-20 font-Archivo font-extrabold text-sclamp 768<=:text-center 768<=:mr-auto 768<=:text-tclamp">
          Next.js 14 Full Stack Blog
        </p>
        <div className="text-left mr-24 mb-10 768<=:mr-0 768<=:text-center mt-6">
          <div className="">
            <p className="text-gray-400 font-Archivo font-extralight text-fclamp 768<=:text-foclamp 768<=:mx-2">
              Welcome to our blog! We're passionate about exploring the world{" "}
            </p>
            <p className="text-gray-400 font-Archivo font-extralight text-fclamp 768<=:text-foclamp 768<=:mx-2">
              and sharing our discoveries with you.
            </p>
            <p className="text-gray-400 font-Archivo font-extralight text-fclamp 768<=:text-foclamp 768<=:mx-2">
              Join us as we journey through fascinating topics.
            </p>
          </div>
          <Link href="/contact">
            <Button
              type="button"
              className="rounded-md bg-white/10 px-3.5 duration-300 py-2.5 mt-6 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              label="Contact Us"
            />
          </Link>
        </div>
      </div>

      {/* <Footer /> */}
    </section>
  );
};

export default About;
