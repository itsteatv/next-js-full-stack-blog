import Footer from "@/components/Footer";

export const metadata = {
  title: "Learn Next.js | Feature Showcase",
};

export default function Home() {
  return (
    <>
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight dark:text-white sm:text-6xl">
            Master Next.js
          </h2>
          <p className="mt-6 text-lg leading-8 dark:text-gray-300">
            Dive into a comprehensive guide showcasing Next.js capabilities.
            Learn and implement cutting-edge features to elevate your
            development skills.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
