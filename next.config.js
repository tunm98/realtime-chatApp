/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "movieapi.cyberlearn.vn",
      },
    ],
  },
};

module.exports = nextConfig;
