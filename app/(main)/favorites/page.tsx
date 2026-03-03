import { Container } from '@/components/shared/container'
import { PageTitle } from '@/components/ui/page-title'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { FavoritesListContainer } from './_components/favorites-list-container'

export const metadata: Metadata = {
	title: 'Next Sneakers | Favorites',
}

export default async function FavoritesPage() {
	return (
		<Container>
			<PageTitle title='Favorites' />
			<Suspense>
				<FavoritesListContainer className='mt-5' />
			</Suspense>
		</Container>
	)
}
