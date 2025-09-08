import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  async rewrites() {
    return [
      {
        source: '/jobs/:id',
        destination: '/jobs/[id]'
      },
      {
        source: '/employers/:id',
        destination: '/employers/[id]'
      }
    ]
  }
};

export default nextConfig;
