/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  NEXTAUTH_URL: "http://localhost:3000",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.classbon.com",
      },
      {
        protocol: "https",
        hostname: "classbon-blog.s3.ir-thr-at1.arvanstorage.ir",
      },
      {
        protocol: "https",
        hostname: "classbon-blog.s3.ir-thr-at1.arvanstorage.com",
      },
    ],
  },
};

module.exports = nextConfig;
