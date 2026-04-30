export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  imageDataUrl?: string;
}

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Understanding IP Geolocation Accuracy",
    excerpt: "How reliable is IP-based location data and what factors influence its precision in 2026?",
    content: "Geolocation accuracy varies significantly depending on the connection type. Mobile networks often route traffic through centralized gateways, while residential broadband provides more granular data. Our systems utilize multi-source validation to ensure the highest possible accuracy for intelligence reports.",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "The Rise of IPv6 Intelligence",
    excerpt: "Transitioning to IPv6 brings new challenges and opportunities for network analysis.",
    content: "With the exhaustion of IPv4 addresses, IPv6 adoption is critical. However, analyzing IPv6 ranges requires new methodologies for security audits and traffic mapping. GeoProbe is at the forefront of mapping these vast address spaces.",
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];
