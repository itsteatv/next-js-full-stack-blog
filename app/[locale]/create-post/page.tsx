import CreatePostForm from "@/components/CreatePostForm";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create-Post",
};

const CreatePost = async () => {
  return (
    <section className="mt-28">
      <div className="flex flex-col items-center justify-center">
        <CreatePostForm />
      </div>
    </section>
  );
};

export default CreatePost;
