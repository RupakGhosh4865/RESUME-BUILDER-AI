import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  experimental: {
    appDir: false,  // Disable app directory if not used
  },
};
export default nextConfig;
