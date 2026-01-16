'use client'

import { Product } from '@/@types/product'
import Link from 'next/link'
import { ProductCard } from './product-card'
import { ProductCardSkeleton } from './product-card-skeleton'
import { ProductGrid } from './product-grid'

interface Props {
	items: Product[]
	isPending?: boolean
	className?: string
}

const mockData = [...Array(10)]

export const ProductList = ({ items, isPending, className }: Props) => {
	return (
		<ProductGrid className={className}>
			{isPending &&
				mockData.map((_, i) => (
					<li key={i}>
						<ProductCardSkeleton />
					</li>
				))}

			{items?.map(item => (
				<Link key={item.id} href={`/${item.slug}`}>
					<ProductCard product={item} />
				</Link>
			))}
		</ProductGrid>
	)
}
