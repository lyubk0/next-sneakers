import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const geist = Geist({
	variable: '--font-geist',
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
			<body className={`${geist.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
