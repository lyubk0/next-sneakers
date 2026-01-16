import { Container } from '@/components/shared/container'
import { ReactNode } from 'react'
import { SneakerCarousel } from './_components/sneaker-carousel'

const sneakerImageUrls = ['/krossi.png', '/krossi.png', '/krossi.png']

export default function AuthLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<main>
			<Container className='h-screen p-6'>
				<div className='w-full h-full flex gap-10 justify-center items-center'>
					<div className='flex-1 flex items-center justify-center rounded-2xl bg-muted h-full'>
						<SneakerCarousel />
					</div>
					{children}
				</div>
			</Container>
		</main>
	)
}
