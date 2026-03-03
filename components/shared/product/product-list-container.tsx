'use client'

import { ProductList } from '@/components/shared/product/product-list'
import {
	useBrandsFilter,
	usePriceRangeFilter,
	useSexFilter,
} from '@/hooks/nuqs'
import { useColorsFilter } from '@/hooks/nuqs/use-colors-filter'
import { useSizeFilter } from '@/hooks/nuqs/use-size-filters'
import { useProducts } from '@/hooks/tanstack/product-queries'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

interface Props {
	className?: string
}

export const ProductListContainer = ({ className }: Props) => {
	const { selectedBrandsQuery } = useBrandsFilter()
	const { selectedSexes } = useSexFilter()
	const { priceFrom, priceTo } = usePriceRangeFilter()
	const { selectedSizes } = useSizeFilter()
	const { selectedColors } = useColorsFilter()

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
