import FetchUserProfile from "@/components/FetchUserProfile";

export default async function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  return <FetchUserProfile username={params.username} />;
}
