import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**', // разрешает все хосты
			},
			{
				protocol: 'http',
				hostname: '**', // если нужны и http
			},
		],
	},
}

export default nextConfig
