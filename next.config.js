/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    typedRoutes: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "kruftqkiwlqjyyjvwxsu.supabase.co",
      },
    ],
  },
}

module.exports = nextConfig
