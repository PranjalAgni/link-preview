/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["v1.tailwindcss.com"]
  }
};

module.exports = nextConfig;
