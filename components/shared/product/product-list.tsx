'use client'

import { useProducts } from '@/hooks/queries/products/use-products'
import Link from 'next/link'
import { ProductCard } from './product-card'
import { ProductCardSkeleton } from './product-card-skeleton'
import { ProductGrid } from './product-grid'

interface Props {
	className?: string
}

export const ProductList = ({ className }: Props) => {
	const mockData = [...Array(20)]
	const { data: products, isPending } = useProducts()
	return (
		<ProductGrid className={className}>
			{isPending &&
				mockData.map((_, i) => (
					<li key={i}>
						<ProductCardSkeleton />
					</li>
				))}
			{products?.map(product => (
				<Link
					key={product.id}
					href={`/${product.category.slug}/${product.slug}`}
				>
					<ProductCard product={product} />
				</Link>
			))}
		</ProductGrid>
	)
}
