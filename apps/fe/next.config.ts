import type { NextConfig } from "next";

/** Where Next.js proxies `/dna-api/*` (server-side only; browser never hits CORS). */
const API_INTERNAL_ORIGIN =
  process.env.API_INTERNAL_ORIGIN ?? "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/dna-api/:path*",
          destination: `${API_INTERNAL_ORIGIN.replace(/\/$/, "")}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
