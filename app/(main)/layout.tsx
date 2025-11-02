import { Header } from '@/components/shared/header'

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main>
			<Header />
			{children}
		</main>
	)
}
