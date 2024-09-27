import UpdatePostForm from "@/components/UpdatePostForm";
import { fetchPosts } from "@/lib/api/fetchPosts";
import { BlogPost } from "@/lib/types";

const EditPost = async ({ params }: { params: { slug: string } }) => {
  const posts: BlogPost[] = await fetchPosts();
  const post = posts.find((post) => post.id === params.slug);

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
