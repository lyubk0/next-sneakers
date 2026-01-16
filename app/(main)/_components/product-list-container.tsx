'use client'

import { ProductList } from '@/components/shared/product/product-list'
import {
	useBrandsFilter,
	usePriceRangeFilter,
	useSexFilter,
} from '@/hooks/nuqs'
import { useColorsFilter } from '@/hooks/nuqs/use-colors-filter'
import { useSizeFilter } from '@/hooks/nuqs/use-size-filters'
import { useBrands } from '@/hooks/queries/use-brands'
import { useProducts } from '@/hooks/queries/use-products'

interface Props {
	className?: string
}

export const ProductListContainer = ({ className }: Props) => {
	const { data: brands } = useBrands()

	const { selectedBrands } = useBrandsFilter(brands || [])
	const { selectedSexes } = useSexFilter()
	const { priceFrom, priceTo } = usePriceRangeFilter()
	const { selectedSizes } = useSizeFilter([])
	const { selectedColors } = useColorsFilter([])

	const { data: products, isPending } = useProducts({
		brands: selectedBrands,
		sexes: selectedSexes,
		priceFrom: priceFrom || undefined,
		priceTo: priceTo || undefined,
		sizes: selectedSizes,
		colors: selectedColors,
	})
	return (
		<div className={className}>
			<ProductList items={products || []} isPending={isPending} />
		</div>
	)
}
