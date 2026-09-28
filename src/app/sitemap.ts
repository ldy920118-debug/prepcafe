import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // 실제 도메인이 등록되지 않은 경우 임의의 example.com 등을 생성하지 않음
  if (!siteUrl) {
    return [];
  }

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
