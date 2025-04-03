/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  images: {
    domains: ["api.dicebear.com", "xsgames.co", "res.cloudinary.com"],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins = config.plugins || [];
    return config;
  },
  output: "standalone",
};

module.exports = nextConfig;
