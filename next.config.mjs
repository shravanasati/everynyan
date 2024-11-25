/** @type {import('next').NextConfig} */
import nextPwa from "next-pwa";

const withPWA = nextPwa({
  dest: "public", // Output directory for the service worker
  disable: process.env.NODE_ENV === "development", // Disable SW in dev mode by default
});

const notificationsServerAddress = process.env.NEXT_PUBLIC_NOTIFICATIONS_SERVER_ADDRESS || ""; 
if (!notificationsServerAddress) {
  console.warn("NOTIFICATIONS_SERVER_ADDRESS environment variable is not set. Notifications will not work.");
}

const nextConfig = {
  reactStrictMode: true, // Other Next.js settings
  ...withPWA, // Spread the PWA configuration
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: notificationsServerAddress },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, Content-Length, X-Requested-With" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ]
      }
    ]
  }
};

export default nextConfig;
