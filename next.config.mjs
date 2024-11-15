/** @type {import('next').NextConfig} */

const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",") || [];

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
  async headers() {
    return [
      {
        source: "/dashboard(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'self'; font-src 'self'; object-src 'none'; frame-ancestors 'none';`,
          },
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

export default nextConfig;
