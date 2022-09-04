/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["melkorwebjobstorage.blob.core.windows.net"],
  },
  output: "standalone",
};

module.exports = nextConfig;
