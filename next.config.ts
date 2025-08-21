import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true } // needed when exporting statically
};

export default nextConfig;
