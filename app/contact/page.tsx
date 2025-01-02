import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

const Contact = () => {
  return <ContactForm />;
};

export default Contact;
