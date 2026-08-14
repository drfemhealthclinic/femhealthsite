import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // Allows local IP connections to Dev Server WebSocket chunk hot-reloader
  allowedDevOrigins: ["192.168.1.10", "192.168.1.10:3000", "192.168.1.10:3001", 'jayceon-musicianly-phillip.ngrok-free.dev'],
} as any;

export default nextConfig;
