import { fetchPosts } from "@/actions/fetchPosts";

export default async function sitemap() {
  try {
    const allPosts = await fetchPosts(0, Number.MAX_SAFE_INTEGER);

    const postSitemap = allPosts.map((post) => ({
      url: `${process.env.SITE_URL}/blog/${post.id}`,
      lastModified: new Date(post.updatedAt).toISOString(),
    }));

    const staticRoutes = [
      {
        url: `${process.env.SITE_URL}/blog`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${process.env.SITE_URL}/contact`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${process.env.SITE_URL}/about`,
        lastModified: new Date().toISOString(),
      },
    ];

    return [...staticRoutes, ...postSitemap];
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    throw new Error("Failed to generate sitemap");
  }
}
