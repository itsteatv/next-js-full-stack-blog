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
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { InboxIcon } from "@heroicons/react/24/outline";
import Loading from "@/app/[locale]/blog/loading";
import { useTranslations } from "next-intl";

const ContactPostForm = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<TEmailContactSchema>({
    resolver: zodResolver(emailContactSchema),
  });

  const t = useTranslations("contact");

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
    <section className="flex mx-5 flex-col items-center justify-center mt-12">
      <div>
        <form
          action={handleFormSubmit}
          className="mb-4 rounded-3xl w-full max-w-lg sm:px-8 md:px-20"
        >
          <div className="mb-4">
            <label
              htmlFor={t("name.label")}
              className="block text-sm font-medium leading-6 dark:text-white"
            >
              {t("name.label")}
            </label>
            <div>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mt-[1.2rem]">
                  <InboxIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </div>
              </div>
              <Input
                className="block w-full rounded-md border-0 py-1.5 pl-10 dark:text-white bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                placeholder={t("name.placeholder")}
                {...register("authorName")}
                name="authorName"
              />
            </div>
            {errors.authorName &&
              toast.error(`${errors.authorName.message}`, {
                id: "Name-Error",
              })}
          </div>
          <div className="mb-4">
            <label
              className="block dark:text-white text-sm font-bold mb-2"
              htmlFor={t("email.label")}
            >
              {t("email.label")}
            </label>
            <div>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mt-[1.2rem]">
                  <EnvelopeIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </div>
              </div>
              <Input
                className="block w-full rounded-md border-0 py-1.5 pl-10 dark:text-white bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="email"
                placeholder={t("email.placeholder")}
                {...register("authorEmail")}
                name="authorEmail"
              />
            </div>
            {errors.authorEmail &&
              toast.error(`${errors.authorEmail.message}`, {
                id: "Email-Error",
              })}
          </div>
          <div className="mb-4">
            <label
              className="block dark:text-white text-sm font-bold mb-2"
              htmlFor="message"
            >
              {t("message.label")}
            </label>
            <Textarea
              className="block w-full rounded-md border-0 py-1.5 px-1.5 dark:text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              label={t("sendButton")}
              usePendingStatus={true}
              pendingContent="Sending..."
              loadingComponent={
                <div className="relative w-6 h-6">
                  <Loading color="black" />
                </div>
              }
              className="flex items-center justify-center w-full cursor-pointer rounded-xl disabled:bg-gray-500 disabled:cursor-not-allowed dark:bg-white px-8 py-4 mt-4 text-center duration-300 font-semibold text-black no-underline dark:hover:bg-gray-300 hover:bg-gray-200 ring-1 ring-inset ring-gray-300"
              type="submit"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactPostForm;
