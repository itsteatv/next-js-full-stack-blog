import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "create-post"],
      },
    ],
    sitemap: `${process.env.SITE_URL}/sitemap.xml`,
  };
}
