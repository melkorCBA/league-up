/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["melkorwebjobstorage.blob.core.windows.net"],
  },
  output: "standalone",
  publicRuntimeConfig: {
    PUBLIC_BaseApiURL: process.env.PUBLIC_BaseApiURL,
    PUBLIC_BaseURL: process.env.PUBLIC_BaseURL,
    PUBLIC_PusherApiKey: process.env.PUBLIC_PusherApiKey,
    PUBLIC_AdminPasscode: process.env.PUBLIC_AdminPasscode,
  },
};

module.exports = nextConfig;
