/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",") || [];

const withNextIntl = createNextIntlPlugin();

const remotePatterns = imageDomains.map((domain) => ({
  protocol: "https",
  hostname: domain,
  pathname: "/**",
}));

const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/dashboard(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);