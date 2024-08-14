"use server";

import { emailContactSchema } from "@/schemas/emailContactSchema";
import { Resend } from "resend";
import ContactFormEmail from "@/email/ContactFormEmail";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async function (formData: unknown) {

    const parsed = emailContactSchema.safeParse(formData);

    if (!parsed.success) {
        const errors = parsed.error.errors.reduce((acc, error) => {
            acc[error.path[0]] = error.message;
            return acc;
        }, {});
        return { errors };
    }

    try {
        await resend.emails.send({
            from: `${parsed.data.authorName}'s Review <onboarding@resend.dev>`,
            to: "rezashow60@gmail.com",
            subject: "Review",
            react: React.createElement(ContactFormEmail, { authorName: parsed.data.authorName, authorEmail: parsed.data.authorEmail, reviewText: parsed.data.reviewText }),
        });
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};
