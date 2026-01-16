'use client'

import { ProductList } from '@/components/shared/product/product-list'
import { useFavorites } from '@/hooks/queries/favorite/use-favorites'

interface Props {
	className?: string
}

export const FavoritesListContainer = ({ className }: Props) => {
	const { data, isPending } = useFavorites()
	return (
		<div className={className}>
			<ProductList items={data || []} isPending={isPending} />
		</div>
	)
}
