import { Container } from '@/components/shared/container'
import { TopBar } from '@/components/shared/header/top-bar'

import { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductListContainer } from '../../components/shared/product/product-list-container'
import { FiltersDrawer } from './_components/filters-drawer'

export const metadata: Metadata = {
	title: 'Next Sneakers | Home',
}

export default function HomePage() {
	return (
		<Suspense>
			<TopBar />
			<FiltersDrawer />

			<Container>
				<div className='flex-1'>
					<ProductListContainer className='mt-8' />
				</div>
			</Container>
		</Suspense>
	)
}
