import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.wrenlo.co';
  return [
    { url: `${baseUrl}/`, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/product`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/hvac`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/why-us`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/our-story`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/survey`, lastModified: new Date(), priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), priority: 0.2 },
  ];
}