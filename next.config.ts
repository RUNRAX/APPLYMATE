import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdf-parse"],
  experimental: {
    outputFileTracingIncludes: {
      "/**/*": ["./node_modules/pdf-parse/test/data/**/*.pdf"],
    },
  },
};

export default nextConfig;
