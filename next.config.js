/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: process.env.ResourceDomains.split(" "),
  },
  output: "standalone",
  publicRuntimeConfig: {
    BRW_BaseApiURL: process.env.BRW_BaseApiURL,
    BRW_BaseURL: process.env.BRW_BaseURL,
    BRW_PusherApiKey: process.env.BRW_PusherApiKey,
    BRW_AdminPasscode: process.env.BRW_AdminPasscode,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
