/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icas.ac.in",
      },
    ],
  },
};

module.exports = nextConfig;
