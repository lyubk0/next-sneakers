import { Header } from '@/components/shared/header/header'
import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Next Sneakers | The best Sneakers',
	icons: {
		icon: '/mini-logo.svg',
	},
}

export default function MainLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<main>
			<Header />
			{children}
		</main>
	)
}
