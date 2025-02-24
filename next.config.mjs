import nextPwa from "@ducanh2912/next-pwa";

const withPWA = nextPwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

let notificationsServerAddress = process.env.NEXT_PUBLIC_NOTIFICATIONS_PUSH_ADDRESS || ""; 
if (!notificationsServerAddress) {
  console.warn(
    "NEXT_PUBLIC_NOTIFICATIONS_PUSH_ADDRESS environment variable is not set. Notifications will not work."
  );
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.giphy.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: notificationsServerAddress,
          },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Type, Authorization, Content-Length, X-Requested-With",
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
