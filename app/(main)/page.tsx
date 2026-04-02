import { Container } from '@/components/shared/container'
import { TopBar } from '@/components/shared/header/top-bar/top-bar'
import { ProductListContainer } from '@/components/shared/product/product-list-container'
import { ALL_SEXES_VALUES } from '@/constants/filters.constants'
import { searchParamsCache } from '@/hooks/nuqs/filters/search-params.nuqs'
import { productKeys } from '@/hooks/tanstack/product.queries'
import { ApiServer } from '@/services/api-server'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import { Metadata } from 'next'
import type { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { FiltersDrawer } from './_components/filters-drawer'

export const metadata: Metadata = {
	title: 'Next Sneakers | Home',
}

type HomePageProps = {
	searchParams: SearchParams | Promise<SearchParams>
}

export default async function HomePage({ searchParams }: HomePageProps) {
	const { sex, sizes, brands, colors, priceFrom, priceTo, sort, page } =
		await searchParamsCache.parse(await searchParams)

	const filters = {
		sexes: sex ?? ALL_SEXES_VALUES,
		sizes: sizes ?? [],
		brands: brands ?? [],
		colors: colors ?? [],
		priceFrom,
		priceTo,
		sort,
		page,
	}

	const queryClient = new QueryClient()

	const data = await queryClient.prefetchQuery({
		queryKey: productKeys.filtered(filters),
		queryFn: async () => await ApiServer.product.getProducts(filters),
	})
	const dat2a = queryClient.getQueryData(productKeys.filtered(filters))
	console.log('DATA', dat2a)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{' '}
			<Suspense>
				<TopBar />
				<FiltersDrawer />
				<Container>
					<ProductListContainer className='mt-8' />
				</Container>
			</Suspense>
		</HydrationBoundary>
	)
}
