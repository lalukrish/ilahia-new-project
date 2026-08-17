/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.23"],

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
