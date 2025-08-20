import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Webpack's persistent filesystem cache occasionally attempts to
    // `readlink` normal files on Windows, which surfaces as
    // "EISDIR: illegal operation on a directory" during `npm run build`.
    // Disabling the cache sidesteps the faulty readlink calls and keeps the
    // build cross-platform.
    config.cache = false;
    return config;
  },
};

export default nextConfig;
