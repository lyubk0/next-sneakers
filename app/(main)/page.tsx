import { Container } from '@/components/shared/container'
import { TopBar } from '@/components/shared/header/top-bar/top-bar'
import { ProductListContainer } from '@/components/shared/product/product-list-container'
import { searchParamsCache } from '@/hooks/nuqs/filters/search-params.nuqs'
import { productKeys } from '@/hooks/tanstack/product.queries'
import { parseProductSearchParams } from '@/lib/parse-product-search-params.utils'
import { ApiServer } from '@/services/api-server'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import { Metadata } from 'next'
import type { SearchParams } from 'nuqs/server'
import { FiltersDrawer } from './_components/filters-drawer'

export const metadata: Metadata = {
	title: 'Next Sneakers | Home',
}

interface Props {
	searchParams: SearchParams | Promise<SearchParams>
}

export default async function HomePage({ searchParams }: Props) {
	const productSearchParams = await searchParamsCache.parse(await searchParams)

	const safetySearchParams = parseProductSearchParams(productSearchParams)

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: productKeys.filtered(safetySearchParams),
		queryFn: () => ApiServer.product.getProducts(safetySearchParams),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<TopBar />
			<FiltersDrawer />
			<Container>
				<ProductListContainer className='mt-8' />
			</Container>
		</HydrationBoundary>
	)
}
