import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/why-us',
        destination: '/why-us',
        permanent: true,
      },
      {
        source: '/our-story',
        destination: '/our-story',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
