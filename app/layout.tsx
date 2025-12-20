import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from './providers'

const saans = localFont({
	src: [
		{
			path: '../public/font/SaansTRIAL-Light.ttf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../public/font/SaansTRIAL-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../public/font/SaansTRIAL-Medium.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../public/font/SaansTRIAL-SemiBold.ttf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../public/font/SaansTRIAL-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../public/font/SaansTRIAL-Heavy.ttf',
			weight: '900',
			style: 'normal',
		},
	],
	variable: '--font-saans',
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Next Sneakers',
	description: 'The best sneakers shop!',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${saans.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
