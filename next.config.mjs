import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => config,
  experimental: {
    serverActions: {},
  },
  turbopack: {},
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);