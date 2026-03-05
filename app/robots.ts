import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/open-when/", "/downloads/", "/about", "/resources", "/privacy"],
        disallow: ["/entry/", "/admin", "/api/"],
      },
    ],
    sitemap: "https://adhddiaryproject.com/sitemap.xml",
  };
}
