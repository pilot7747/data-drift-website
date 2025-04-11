/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async rewrites() {
    return [
      {
        source: '/files/:path*',
        destination: '/api/audio/:path*',
      },
    ];
  },
}

module.exports = nextConfig 