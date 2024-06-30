"use server";

import { emailContactSchema } from "@/schemas/emailContactSchema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async function (formData: FormData) {
    console.log("Running on server");

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    console.log(name);
    console.log(email);
    console.log(message);

    if (!name || !email || !message) {
        throw new Error("Missing required form fields");
    }

    const parsed = emailContactSchema.safeParse({ name, email, message });

    if (!parsed.success) {
        const errors = parsed.error.errors.reduce((acc, error) => {
            acc[error.path[0]] = error.message;
            return acc;
        }, {});
        return { errors };
    }

    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "rezashow60@gmail.com",
            subject: "Feedback",
            text: message as string,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};
