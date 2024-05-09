/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "d59ekxy3ibt4bqqo.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
