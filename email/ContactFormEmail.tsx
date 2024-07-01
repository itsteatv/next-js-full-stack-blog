import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface RaycastMagicLinkEmailProps {
  authorName: string;
  authorEmail: string;
  reviewText: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const ContactFormEmail = ({
  authorName,
  authorEmail,
  reviewText,
}: RaycastMagicLinkEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Here's what {authorName} wrote</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Text style={review}>👉 {reviewText} 👈</Text>
          </Text>
        </Section>
        <Text style={paragraph}>
          🪄 {authorName}'s email: {authorEmail}
        </Text>
        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
);

export default ContactFormEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const review = {
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};
