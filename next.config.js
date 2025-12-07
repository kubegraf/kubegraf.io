/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only use static export for production builds, not for dev server
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    distDir: 'out',
  }),
  images: {
    unoptimized: true
  },
  trailingSlash: true,
};

module.exports = nextConfig;
