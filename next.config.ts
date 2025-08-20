import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Windows symlink handling can cause Next.js to attempt a readlink on
    // regular files like `node_modules/next/dist/pages/_app.js`, resulting in
    // "EISDIR: illegal operation on a directory" errors during `npm run build`.
    // Disabling webpack's symlink resolution avoids these faulty readlink calls
    // and allows the project to build reliably across platforms.
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
