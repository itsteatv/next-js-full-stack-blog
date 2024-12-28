import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    {
      url: "https://your-production-domain.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://your-production-domain.com/contact",
      lastModified: new Date(),
    },
  ];

  return [...staticPages];
}
