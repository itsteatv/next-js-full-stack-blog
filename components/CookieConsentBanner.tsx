"use client";

import Link from "next/link";
import CookieConsent from "react-cookie-consent";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="userCookieConsent"
      style={{
        background: "#1a1a1a",
        color: "#ffffff",
        fontSize: "14px",
        padding: "15px 20px",
        borderTop: "2px solid #007BFF",
      }}
      buttonStyle={{
        color: "#ffffff",
        fontSize: "14px",
        background: "#007BFF",
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        cursor: "pointer",
      }}
      expires={365}
    >
      This website uses cookies to enhance the user experience.{" "}
      <span style={{ fontSize: "12px", color: "#cccccc" }}>
        You can find more information in our{" "}
        <Link
          href="/privacy-policy"
          className="text-[#007BFF] underline duration-300 hover:text-[#006fe6]"
        >
          Privacy Policy
        </Link>
        .
      </span>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
