import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.b-cdn.net' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/stills/press-photos',
        destination: '/stills/portraits',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
