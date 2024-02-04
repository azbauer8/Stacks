// const {
// 	withHydrationOverlay,
// } = require("@builder.io/react-hydration-overlay/next")

/** @type {import('next').NextConfig} */
const nextConfig = {
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
