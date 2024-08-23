import CreatePostForm from "@/components/CreatePostForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const CreatePost = async () => {
  const { isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  return (
    <section className="mt-20">
      <div className="flex flex-col items-center justify-center">
        <CreatePostForm />
      </div>
    </section>
  );
};

export default CreatePost;
