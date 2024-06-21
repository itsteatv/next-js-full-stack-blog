"use client";

import { useEffect } from "react";
import Button from "../components/button/Button";
import Input from "../components/input/Input";
import TextArea from "../components/textarea/TextArea";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async function (data: FieldValues) {
    // TODO
    // Sending email ...

    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset(); // Reset form after submission
  };

  return (
    <section className="mt-28">
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Your name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters",
                },
              })}
            />
            {errors.name &&
              toast.error(`${errors.name.message}`, {
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/i,
                  message:
                    "Email must be from a valid domain (e.g., @gmail.com)",
                },
              })}
            />
            {errors.email &&
              toast.error(`${errors.email.message}`, {
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
            <TextArea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              {...register("message", {
                required: "Message is required",
              })}
            />
            {errors.message &&
              toast.error(`${errors.message.message}`, {
                id: "Message-Error",
              })}
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="inline-block w-full cursor-pointer rounded-xl disabled:bg-gray-500 disabled:cursor-not-allowed bg-black px-8 py-4 mt-4 text-center duration-300 font-semibold text-white no-underline [box-shadow:rgb(19,_83,_254)_6px_6px]"
              type="submit"
              content="Send"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
