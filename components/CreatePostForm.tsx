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
import { ItalicIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Category } from "@/lib/types";
import { getCategories } from "@/actions/categories";

const CreatePostForm = () => {
  const {
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<TCreatePostSchema>({ resolver: zodResolver(createPostSchema) });

  const [previewMode, setPreviewMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [previewData, setPreviewData] = useState<{
    title: string;
    body: string;
  }>({
    title: "",
    body: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  console.log(selectedCategories);
  console.log(categories);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handlePreview = () => {
    const values = getValues();

    if (!values.title || !values.body) {
      toast.error("Title and Body must be filled to preview the post");
      return;
    }

    setPreviewData({
      title: values.title,
      body: values.body,
    });
    setPreviewMode(true);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleFormSubmit = async function (formData: FormData) {
    const data = {
      title: formData.get("title"),
      body: formData.get("body"),
      categoryId: selectedCategories,
    };

    console.log(data);

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
      setSelectedCategories([]);
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
    <section className="flex mx-5 flex-col items-center justify-center">
      <form
        action={handleFormSubmit}
        className="mb-4 rounded-3xl w-full max-w-60"
      >
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label
              className="block dark:text-white text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <InformationCircleIcon
              onClick={handlePreview}
              className={`mb-2 h-5 w-5 cursor-pointer text-white duration-300 ${
                isHovered ? "text-blue-500 duration-300" : ""
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
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
          />
          {errors.body &&
            toast.error(`${errors.body.message}`, {
              id: "Body-Error",
            })}
        </div>
        <div className="mb-4">
          <label
            className="block dark:text-white text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <div>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={category.id}
                  value={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="mr-2"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="dark:text-white"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center flex-col justify-between">
          <Button
            usePendingStatus={true}
            pendingContent="Creating..."
            className="inline-block w-full cursor-pointer rounded-xl disabled:bg-gray-500 disabled:cursor-not-allowed dark:bg-white px-8 py-4 mt-4 text-center duration-300 font-semibold text-black no-underline dark:hover:bg-gray-300 hover:bg-gray-200 ring-1 ring-inset ring-gray-300"
            type="submit"
            label="Create"
          />
        </div>
      </form>
      <Modal isOpen={previewMode} onClose={() => setPreviewMode(false)}>
        <div
          className={`flex items-center justify-center flex-col transition-opacity duration-300 ease-out ${
            previewMode ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <h1 className="text-xl font-bold dark:text-black text-white">
            Post Title: {previewData.title || "Untitled Post"}{" "}
          </h1>
          <p className="text-xl font-bold dark:text-black text-white">
            Post Body: {previewData.body || "No content available."}{" "}
          </p>
          <h3 className="text-xl font-bold dark:text-black text-white">
            Category:{" "}
            {selectedCategories.length > 0
              ? selectedCategories
                  .map(
                    (categoryId) =>
                      categories.find((cat) => cat.id === categoryId)?.name
                  )
                  .filter(Boolean)
                  .join(", ")
              : "Uncategorized"}
          </h3>
        </div>
      </Modal>
    </section>
  );
};

export default CreatePostForm;
