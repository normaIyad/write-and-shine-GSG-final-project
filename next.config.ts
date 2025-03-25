import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com", // ✅ Allow images from placeholder.com
        pathname: "/**", // ✅ Allow all paths
      },
    ],
  },
};

export default nextConfig;
