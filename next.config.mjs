/** @type {import('next').NextConfig} */

const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(',') || [];

const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        domains: imageDomains,
    },
};

export default nextConfig;
