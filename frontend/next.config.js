/** @type {import('next').NextConfig} */
const nextConfig = {
  // 'standalone' produces a self-contained server bundle for small Docker images.
  // Vercel ignores this and uses its own build pipeline, so it is safe in both targets.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
