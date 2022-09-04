/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["melkorwebjobstorage.blob.core.windows.net"],
  },
};

module.exports = nextConfig;
