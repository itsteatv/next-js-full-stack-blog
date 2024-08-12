import CreatePostForm from "@/components/CreatePostForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login?post_login_redirect_url=/create-post");
  }

  return (
    <section className="mt-20">
      <div className="flex flex-col items-center justify-center">
        <CreatePostForm />
      </div>
    </section>
  );
};

export default page;
