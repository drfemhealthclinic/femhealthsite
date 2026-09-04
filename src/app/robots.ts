import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://femhealthclinic.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/contact", "/blog", "/privacy"],
        disallow: ["/admin", "/admin/*", "/api", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
