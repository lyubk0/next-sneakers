import { Container } from '@/components/shared/container'
import { PageTitle } from '@/components/ui/page-title'
import { FavoritesListContainer } from './_components/favorites-list-container'

export default async function FavoritesPage() {
	return (
		<Container>
			<PageTitle title='Обрані товари' />
			<FavoritesListContainer className='mt-5' />
		</Container>
	)
}
