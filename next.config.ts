import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
