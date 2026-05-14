import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/compare", destination: "/#faq", permanent: false },
    ];
  },
};

export default nextConfig;
