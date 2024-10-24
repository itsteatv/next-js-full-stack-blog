import { SiteConfigProps } from "@/lib/types";

const isProduction = process.env.NODE_ENV === "production"

export const siteConfig: SiteConfigProps = {
    name: "itsteatv Blog App",
    description: "An open source Next.js 14 full-stack blog",
    url: isProduction
        ? "https://your-production-domain.com"
        : "http://localhost:3000",
    og: isProduction
        ? "https://your-production-domain.com/images/og-image.png"
        : "https://i.imgur.com/IBnZrh6.png",
    ogImage: isProduction
        ? "https://your-production-domain.com/images/og-image.png"
        : "https://i.imgur.com/IBnZrh6.png",
    links: {
        github: "https://github.com/itsteatv",
    },
};
