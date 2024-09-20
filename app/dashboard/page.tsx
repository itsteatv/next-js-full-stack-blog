import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  return (
    <div className="dark:text-white flex items-center flex-col mt-16">
      <p>Given Name: {user?.given_name}</p>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
      <p>ID: {user?.id}</p>
    </div>
  );
};

export default Dashboard;
