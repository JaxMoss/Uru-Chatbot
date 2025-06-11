/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api',
  },
  images: {
    domains: [
      'dynamosoftware.chat-dev.uruenterprises.com',
      'api.dynamosoftware.chat-dev.uruenterprises.com'
    ],
  },
  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  // Handle crypto-js module
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      crypto: 'crypto-js',
    };
    return config;
  },
}

module.exports = nextConfig
