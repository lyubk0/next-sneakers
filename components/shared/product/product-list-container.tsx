'use client'

import { ProductList } from '@/components/shared/product/product-list'
import { Skeleton } from '@/components/ui/skeleton'
import { useFilters } from '@/hooks/nuqs/filters/use-filters'
import { useSort } from '@/hooks/nuqs/use-sort'
import { useProducts } from '@/hooks/tanstack/product.queries'
import { parseProductSearchParams } from '@/lib/parse-product-search-params.utils'
import { cn } from '@/lib/utils'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect } from 'react'
import { PaginationControl } from '../pagination-control'

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
	const { sort } = useSort()
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

	const { data, isPending } = useProducts(
		parseProductSearchParams({
			brands: selectedBrandsQuery,
			sexes: selectedSexes,
			priceFrom,
			priceTo,
			sizes: selectedSizes,
			colors: selectedColors,
			sort,
			page,
		}),
	)

	useEffect(() => {
		setPage(1)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [
		JSON.stringify(selectedBrandsQuery),
		JSON.stringify(selectedSexes),
		priceFrom,
		priceTo,
		JSON.stringify(selectedSizes),
		JSON.stringify(selectedColors),
		sort,
	])

	return (
		<div className={cn(className)}>
			<ProductList items={data?.items} isPending={isPending} />
			{isPending ? (
				<div className='flex items-center justify-center gap-2 mt-4'>
					<Skeleton className='h-9 w-9' />
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={i} className='h-9 w-9' />
					))}
					<Skeleton className='h-9 w-9' />
				</div>
			) : (data?.items?.length ?? 0) > 0 ? (
				<PaginationControl
					page={page}
					totalPages={data?.pagination.totalPages ?? 1}
					onPageChange={page => {
						window.scrollTo({ top: 0, behavior: 'smooth' })
						setPage(page)
					}}
					className='mt-8 mb-4'
				/>
			) : null}
		</div>
	)
}
