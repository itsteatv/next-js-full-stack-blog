/** @type {import('next').NextConfig} */

const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(',') || [];

const remotePatterns = imageDomains.map(domain => ({
    protocol: 'https',
    hostname: domain,
    pathname: '/**'
}));

const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns,
    },
};

export default nextConfig;
