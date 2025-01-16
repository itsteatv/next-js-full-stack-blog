import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages: any = await getMessages({ locale });
  const title = messages.home.header;

  return {
    title,
  };
}

export default function Home() {
  const t = useTranslations("home");
  return (
    <>
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight dark:text-white sm:text-6xl">
            {t("header")}{" "}
          </h2>
          <p className="mt-6 text-lg leading-8 dark:text-gray-300">
            {t("description")}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
