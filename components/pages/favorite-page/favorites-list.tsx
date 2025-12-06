'use client'

import { ProductCard } from '@/components/shared/product/product-card'
import { ProductGrid } from '@/components/shared/product/product-grid'
import { useProducts } from '@/hooks/queries/products/use-products'
import Link from 'next/link'

interface Props {
	className?: string
}

export const FavoritesList = ({ className }: Props) => {
	const { data: products } = useProducts()

	const favoriteProducts = products?.filter(product => product.isFavorite)
	return (
		<ProductGrid>
			{favoriteProducts?.map(product => (
				<Link
					key={product.id}
					href={`/${product.category.slug}/${product.slug}`}
				>
					<li>
						<ProductCard product={product} />
					</li>
				</Link>
			))}
		</ProductGrid>
	)
}
