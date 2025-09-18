import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for CDN/edge; routes are client-side with fetch to API gateway.
  output: "export",
  // Note: custom headers are not supported with "output: export".
  // Configure headers at your hosting layer (e.g., CDN) instead.
};

export default nextConfig;
