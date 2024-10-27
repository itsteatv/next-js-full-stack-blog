import UpdatePostForm from "@/components/UpdatePostForm";
import { fetchPosts } from "@/actions/fetchPosts";
import { BlogPost } from "@/lib/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const EditPost = async ({ params }: { params: { slug: string } }) => {
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  const user = await getUser();

  const posts = await fetchPosts(0, 0, params.slug);
  const post = posts[0];

  const isUserPostAuthor = post?.userId === user?.id;

  const UpdatePostPermission = await getPermission("basic::permissions");
  const adminUpdatePostPermission = await getPermission("all::permissions");

  const canUpdatePost =
    isLoggedIn &&
    user &&
    isUserPostAuthor &&
    (UpdatePostPermission?.isGranted || adminUpdatePostPermission?.isGranted);

  if (!canUpdatePost) {
    redirect("/blog");
  }

  if (!post) {
    return (
      <p className="dark:text-white text-center text-bold">Post not found</p>
    );
  }

  return (
    <div>
      <UpdatePostForm post={post} />
    </div>
  );
};

export default EditPost;
