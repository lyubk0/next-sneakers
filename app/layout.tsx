import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
	subsets: ['cyrillic'],
	variable: '--font-inter',
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
			<body className={`${inter.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
