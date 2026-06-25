import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // three ships untranspiled ESM — Next must transpile it for R3F (preloader).
  transpilePackages: ["three"],
};

export default nextConfig;
