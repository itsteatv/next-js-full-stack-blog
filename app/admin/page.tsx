import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Admin = async () => {
  const { isAuthenticated, getPermission } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const requiredPermission = await getPermission("all::permissions");

  if (!requiredPermission?.isGranted) {
    redirect("/");
  }

  return (
    <>
      <h1 className="text-white text-4xl flex items-center justify-center">
        Admin Dashboard
      </h1>
    </>
  );
};

export default Admin;
