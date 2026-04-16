/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Prisma is bundled via the Neon HTTP adapter (pure JS).
  // No native binaries -- works in Node.js and Cloudflare Workers.
  eslint: {
    // ESLint runs separately in CI -- skip during next build to avoid version conflicts.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
