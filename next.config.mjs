/** @type {import('next').NextConfig} */
import nextPwa from "next-pwa";

const withPWA = nextPwa({
  dest: "public", // Output directory for the service worker
  disable: process.env.NODE_ENV === "development", // Disable SW in dev mode by default
});

const nextConfig = {
  reactStrictMode: true, // Other Next.js settings
  ...withPWA, // Spread the PWA configuration
};

export default nextConfig;
