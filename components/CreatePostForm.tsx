"use client";

import createPost from "@/actions/createPost";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "./Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  createPostSchema,
  TCreatePostSchema,
} from "@/schemas/createPostSchema";

const CreatePostForm = () => {
  const {
    register,
    formState: { errors },
    reset,
  } = useForm<TCreatePostSchema>({ resolver: zodResolver(createPostSchema) });

  const handleFormSubmit = async function (formData: FormData) {
    const data = {
      title: formData.get("title"),
      body: formData.get("body"),
    };

    const parsed = createPostSchema.safeParse(data);

    if (!parsed.success) {
      parsed.error.errors.forEach((error) => {
        toast.error(error.message, { id: error.path.join("-") });
      });
      return;
    }

    try {
      await createPost(parsed.data);
      reset();
      toast.success("Post created successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create the post!");
      }
    }
  };

  return (
    <form
      action={handleFormSubmit}
      className="mb-4 rounded-3xl w-full max-w-60"
    >
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <Input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          type="text"
          placeholder="Your title"
          {...register("title")}
          name="title"
        />
        {errors.title &&
          toast.error(`${errors.title.message}`, {
            id: "Title-Error",
          })}
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="body"
        >
          Body
        </label>
        <Textarea
          className="block w-full rounded-md border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          rows={4}
          {...register("body")}
          name="body"
          id="body"
        />
        {errors.body &&
          toast.error(`${errors.body.message}`, {
            id: "Body-Error",
          })}
      </div>
      <div className="flex items-center justify-between">
        <Button
          usePendingStatus={true}
          pendingContent="Creating..."
          className="inline-block w-full cursor-pointer rounded-xl disabled:bg-gray-500 disabled:cursor-not-allowed bg-white px-8 py-4 mt-4 text-center duration-300 font-semibold text-black no-underline"
          type="submit"
          label="Create"
        />
      </div>
    </form>
  );
};

export default CreatePostForm;
