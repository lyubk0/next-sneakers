import { Container } from '@/components/shared/container'
import { TopBar } from '@/components/shared/header/top-bar'
import type { SearchParams } from 'nuqs/server'

import { FiltersSidebarContainer } from './_components/filters-sidebar/filters-sidebar-container'
import { ProductListContainer } from './_components/product-list-container'

interface Props {
	searchParams: Promise<SearchParams>
}

export default async function Home({ searchParams }: Props) {
	return (
		<Container>
			<TopBar />
			<div className='flex gap-17'>
				<FiltersSidebarContainer className='mt-8' />
				<div className='flex-1'>
					<ProductListContainer className='mt-8' />
				</div>
			</div>
		</Container>
	)
}
