"use server";

import { emailContactSchema } from "@/schemas/emailContactSchema";
import { Resend } from "resend";
import ContactFormEmail from "@/email/ContactFormEmail";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async function (formData: FormData) {
    console.log("Running on server");

    const authorName = formData.get("authorName") as string;
    const authorEmail = formData.get("authorEmail") as string;
    const reviewText = formData.get("reviewText") as string;

    console.log(authorName);
    console.log(authorEmail);
    console.log(reviewText);

    if (!authorName || !authorEmail || !reviewText) {
        throw new Error("Missing required form fields");
    }

    const parsed = emailContactSchema.safeParse({ authorName, authorEmail, reviewText });

    if (!parsed.success) {
        const errors = parsed.error.errors.reduce((acc, error) => {
            acc[error.path[0]] = error.message;
            return acc;
        }, {});
        return { errors };
    }

    try {
        await resend.emails.send({
            from: `${authorName}'s Review <onboarding@resend.dev>`,
            to: "yourEmail@gmail.com",
            subject: "Review",
            react: React.createElement(ContactFormEmail, { authorName: authorName, authorEmail: authorEmail, reviewText: reviewText }),
        });
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};
