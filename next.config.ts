import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/simplelab",
        destination: "/labs",
        permanent: true,
      },
      {
        source: "/designlab",
        destination: "/labs",
        permanent: true,
      },
      {
        source: "/recipe-library",
        destination: "/recipes-and-library",
        permanent: true,
      },
    ];
  },

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
