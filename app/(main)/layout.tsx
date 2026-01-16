import { Header } from '@/components/shared/header'
import { ReactNode } from 'react'

export default function MainLayout({
	children,
	modals,
}: Readonly<{
	children: ReactNode
	modals: ReactNode
}>) {
	return (
		<main>
			<Header />
			{children}
			{modals}
		</main>
	)
}
