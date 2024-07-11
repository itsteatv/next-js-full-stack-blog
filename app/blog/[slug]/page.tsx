import Image from "next/image";

const SinglePost = () => {
  return (
    <section className="w-full max-w-full flex items-center justify-center">
      <div className="540<=:text-center">
        <Image
          src="https://placehold.co/600x400"
          alt="ui/ux review check"
          width={480}
          height={480}
          className="mt-20 rounded-md"
        />
        <h1 className="text-white text-3xl mt-6 font-Archivo">
          UI/UX Review Check
        </h1>
        <h3 className="text-white font-light font-FiraSans lg:max-w-96 md:max-w-80 sm:max-w-72 max-w-60 mt-4 540<=:mx-auto">
          Because it&apos;s about motivating the doers. Because I&apos;m here to
          follow my dreams and inspire others.
        </h3>
      </div>
    </section>
  );
};

export default SinglePost;
