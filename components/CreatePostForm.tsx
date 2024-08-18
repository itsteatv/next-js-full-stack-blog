"use client";

import createPost from "@/actions/createPost";
import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
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
        <TextArea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
          {...register("body")}
          name="body"
          placeholder="Your body"
        />
        {errors.body &&
          toast.error(`${errors.body.message}`, {
            id: "Body-Error",
          })}
      </div>
      <div className="flex items-center justify-between">
        <Button
          usePendingStatus={true}
          className="inline-block w-full cursor-pointer rounded-xl disabled:bg-gray-500 disabled:cursor-not-allowed bg-white px-8 py-4 mt-4 text-center duration-300 font-semibold text-black no-underline"
          type="submit"
          content="Create"
        />
      </div>
    </form>
  );
};

export default CreatePostForm;
