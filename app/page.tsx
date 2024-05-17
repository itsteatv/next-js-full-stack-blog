import Image from "next/image";
import girlIllustration from "@/public/girlIllustration.svg";
import Button from "./components/button/Button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex">
      <div className="mt-16 flex-grow">
        <p className="text-white ml-24 mt-20 font-Archivo font-extrabold text-sclamp 768<=:text-center 768<=:ml-auto 768<=:text-tclamp">
          The Art of Blogging
        </p>
        <div className="text-left ml-24 768<=:ml-0 768<=:text-center mt-6">
          <div className="">
            <p className="text-gray-400 font-Archivo font-extralight text-fclamp 768<=:text-foclamp 768<=:mx-2">
              Join us on this journey of exploration and discovery
            </p>
            <p className="text-gray-400 font-Archivo font-extralight text-fclamp 768<=:text-foclamp 768<=:mx-2">
              as we delve into the fascinating world around us.
            </p>
            <p className="text-gray-400 font-Archivo font-extralight text-fclamp 768<=:text-foclamp 768<=:mx-2">
              We look forward to sharing our knowledge and experiences with you!
            </p>
          </div>
          <Link href="/blog">
            <Button
              ripple={true}
              variant="outlined"
              size="sm"
              className="text-white border-white font-Archivo rounded-full w-28 mt-6 font-extralight"
              content="Explore"
            />
          </Link>
        </div>
      </div>
      <div className="mt-16 1180>=:mt-28 lg:mr-28 lg:w-[30rem] 930>=:w-[25rem] 930>=:mt-[5.5rem] 768<=:hidden">
        <Image src={girlIllustration} alt="blog image" />{" "}
      </div>
    </section>
  );
}
