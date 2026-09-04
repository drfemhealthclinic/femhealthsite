import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/supabase";
import { FALLBACK_POSTS } from "@/lib/blog-fallback";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://femhealthclinic.in";
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic blog routes
  let posts = await getPublishedPosts();
  if (!posts || posts.length === 0) {
    posts = FALLBACK_POSTS;
  }

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : (post.published_at ? new Date(post.published_at) : now),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
