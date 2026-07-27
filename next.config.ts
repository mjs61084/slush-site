import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/public/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
