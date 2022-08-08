/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["v1.tailwindcss.com", "res.cloudinary.com"]
  }
};

module.exports = nextConfig;
