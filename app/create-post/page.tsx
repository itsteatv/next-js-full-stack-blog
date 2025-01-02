import CreatePostForm from "@/components/CreatePostForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create-Post",
};

const CreatePost = async () => {
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();

  try {
    const isLoggedIn = await isAuthenticated();
    const user = await getUser();
    const createPostPermission = await getPermission("basic::permissions");
    const adminCreatePostPermission = await getPermission("all::permissions");
    const canCreatePost =
      isLoggedIn &&
      user &&
      (createPostPermission?.isGranted || adminCreatePostPermission?.isGranted);

    if (!canCreatePost) {
      redirect("/api/auth/login");
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
    redirect("/api/auth/login");
  }

  return (
    <section className="mt-28">
      <div className="flex flex-col items-center justify-center">
        <CreatePostForm />
      </div>
    </section>
  );
};

export default CreatePost;
