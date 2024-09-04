"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TEmailContactSchema,
  emailContactSchema,
} from "@/schemas/emailContactSchema";
import { sendEmail } from "@/actions/sendEmail";
import Textarea from "./Textarea";

const ContactPostForm = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<TEmailContactSchema>({
    resolver: zodResolver(emailContactSchema),
  });

  const handleFormSubmit = async (formData: FormData) => {
    const data = {
      authorName: formData.get("authorName") as string,
      authorEmail: formData.get("authorEmail") as string,
      reviewText: formData.get("reviewText") as string,
    };

    const parsed = emailContactSchema.safeParse(data);

    if (!parsed.success) {
      parsed.error.errors.forEach((error) => {
        toast.error(error.message, { id: error.path.join("-") });
      });
      return;
    }

    try {
      await sendEmail(parsed.data);
      reset();
      toast.success("Form submitted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to submit the form!");
      }
    }
  };

  return (
    <section className="mt-28">
      <div className="flex flex-col items-center">
        <form
          action={handleFormSubmit}
          className="mb-4 rounded-3xl w-full max-w-2xl sm:px-8 md:px-20"
        >
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              type="text"
              placeholder="Your name"
              {...register("authorName")}
              name="authorName"
            />
            {errors.authorName &&
              toast.error(`${errors.authorName.message}`, {
                id: "Name-Error",
              })}
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              type="email"
              placeholder="Your email"
              {...register("authorEmail")}
              name="authorEmail"
            />
            {errors.authorEmail &&
              toast.error(`${errors.authorEmail.message}`, {
                id: "Email-Error",
              })}
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <Textarea
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              rows={4}
              {...register("reviewText")}
              name="reviewText"
              id="reviewText"
            />
            {errors.reviewText &&
              toast.error(`${errors.reviewText.message}`, {
                id: "Message-Error",
              })}
          </div>
          <div className="flex items-center justify-between">
            <Button
              usePendingStatus={true}
              pendingContent="Sending..."
              className="inline-block w-full cursor-pointer rounded-xl disabled:bg-gray-500 disabled:cursor-not-allowed bg-white px-8 py-4 mt-4 text-center duration-300 font-semibold text-black no-underline"
              type="submit"
              label="Send"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactPostForm;
