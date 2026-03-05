import type { MetadataRoute } from "next";

const DOMAIN = "https://adhddiaryproject.com";

const openWhenSlugs = [
  "spiraling",
  "feeling-behind",
  "ashamed",
  "missed-a-deadline",
  "ghosted-someone",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: DOMAIN,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${DOMAIN}/open-when`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/downloads`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${DOMAIN}/resources`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${DOMAIN}/write`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${DOMAIN}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const openWhenPages: MetadataRoute.Sitemap = openWhenSlugs.map((slug) => ({
    url: `${DOMAIN}/open-when/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Excluded: /entry/*, /admin, /api/*

  return [...staticPages, ...openWhenPages];
}
