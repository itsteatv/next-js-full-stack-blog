import { redirect } from "next/navigation";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return {
    title: "Redirecting...",
  };
}

export default function Home() {
  redirect("en/blog");

  return null;
}
