"use client";

import { Button } from "@material-tailwind/react";
import Image from "next/image";
import boyIllustration from "@/public/boyIllustration.svg";
import Link from "next/link";
import Footer from "@/components/footer/Footer";

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
        <div className="text-left mr-24 768<=:mr-0 768<=:text-center mt-6">
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
          <Button
            ripple={true}
            variant="outlined"
            size="sm"
            className="text-white border-white font-Archivo rounded-full w-28 mt-6 font-extralight"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default About;
