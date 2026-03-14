'use client'

import { ProductList } from '@/components/shared/product/product-list'
import { useFilters } from '@/hooks/nuqs/filters/use-filters'
import { useProducts } from '@/hooks/tanstack/product-queries'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

interface Props {
	className?: string
}

export const ProductListContainer = ({ className }: Props) => {
	const {
		selectedBrandsQuery,
		selectedSexes,
		priceFrom,
		priceTo,
		selectedSizes,
		selectedColors,
	} = useFilters()

	const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useProducts({
			brands: selectedBrandsQuery || [],
			sexes: selectedSexes,
			priceFrom: priceFrom || undefined,
			priceTo: priceTo || undefined,
			sizes: selectedSizes,
			colors: selectedColors,
		})

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [
		JSON.stringify(selectedBrandsQuery),
		JSON.stringify(selectedSexes),
		priceFrom,
		priceTo,
		JSON.stringify(selectedSizes),
		JSON.stringify(selectedColors),
	])

	const products = data?.pages.flatMap(page => page.items) ?? []

	return (
		<div className={cn(className)}>
			<ProductList
				items={products}
				isPending={isPending}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
				onLoadMore={fetchNextPage}
			/>
		</div>
	)
}
