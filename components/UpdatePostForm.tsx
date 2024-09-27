"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "./Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  TUpdatePostSchema,
  updatePostSchema,
} from "@/schemas/updatePostSchema";
import { ItalicIcon } from "@heroicons/react/24/outline";
import userUpdatePost from "@/actions/userUpdatePost";
import { BlogPost } from "@/lib/types";
import { redirect } from "next/navigation";

interface UpdatePostFormProps {
  post: BlogPost;
}

const UpdatePostForm = ({ post }: UpdatePostFormProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<TUpdatePostSchema>({ resolver: zodResolver(updatePostSchema) });

  const handleFormSubmit = async function (formData: FormData) {
    const data = {
      title: formData.get("title"),
      body: formData.get("body"),
    };

    const parsed = updatePostSchema.safeParse(data);
    const id = post?.id;
    const postUserId = post?.userId;

    if (!parsed.success) {
      parsed.error.errors.forEach((error) => {
        toast.error(error.message, { id: error.path.join("-") });
      });
      return;
    }

    try {
      if (postUserId && id) {
        await userUpdatePost(parsed.data, id, postUserId);
        toast.success("Post created successfully");
      } else {
        throw new Error("Post User Id is missing");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create the post!");
      }
    }
    redirect(`/blog/${post.id}`);
  };

  return (
    <section className="flex mx-5 flex-col items-center justify-center">
      <form
        action={handleFormSubmit}
        className="mb-4 rounded-3xl w-full max-w-60"
      >
        <div className="mb-4">
          <label
            className="block dark:text-white text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <div>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mt-[1.2rem]">
                <ItalicIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                />
              </div>
            </div>
            <Input
              className="block w-full rounded-md border-0 py-1.5 pl-10 dark:text-white bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              placeholder="Your title"
              {...register("title")}
              name="title"
              defaultValue={post.title}
            />
          </div>
          {errors.title &&
            toast.error(`${errors.title.message}`, {
              id: "Title-Error",
            })}
        </div>
        <div className="mb-4">
          <label
            className="block dark:text-white text-sm font-bold mb-2"
            htmlFor="body"
          >
            Body
          </label>
          <Textarea
            className="block w-full rounded-md border-0 py-1.5 px-1.5 dark:text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            rows={4}
            {...register("body")}
            name="body"
            id="body"
            defaultValue={post.body}
          />
          {errors.body &&
            toast.error(`${errors.body.message}`, {
              id: "Body-Error",
            })}
        </div>
        <div className="flex items-center justify-between">
          <Button
            usePendingStatus={true}
            pendingContent="Updating..."
            className="inline-block w-full cursor-pointer rounded-xl disabled:bg-gray-500 disabled:cursor-not-allowed dark:bg-white px-8 py-4 mt-4 text-center duration-300 font-semibold text-black no-underline dark:hover:bg-gray-300 hover:bg-gray-200 ring-1 ring-inset ring-gray-300"
            type="submit"
            label="Update"
          />
        </div>
      </form>
    </section>
  );
};

export default UpdatePostForm;
