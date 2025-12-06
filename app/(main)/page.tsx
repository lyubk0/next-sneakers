import { HomeContainer } from '@/components/pages/home-page/home-container'
import { Container } from '@/components/shared/container'
import type { SearchParams } from 'nuqs/server'

interface Props {
	searchParams: Promise<SearchParams>
}

export default async function Home({ searchParams }: Props) {
	return (
		<Container>
			<HomeContainer />
		</Container>
	)
}
