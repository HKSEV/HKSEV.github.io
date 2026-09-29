import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*"
      },
      {
        source: "/images/:path*",
        destination: "http://localhost:4000/images/:path*"
      },
    ];
  },
  compiler: {
    styledComponents: true
  }
};

export default nextConfig;
