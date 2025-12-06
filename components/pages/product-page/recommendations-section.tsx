'use client'

import { Product } from '@/@types/product'
import { ThumbsUpIcon } from '@phosphor-icons/react'
import { ProductCard } from '../../shared/product/product-card'
import { Title } from '../../shared/title'

interface Props {
	className?: string
	products: Product[]
}

export const RecommendationsSection = ({ className, products }: Props) => {
	return (
		<div className={className}>
			<Title className='font-medium mb-5' size='sm'>
				<ThumbsUpIcon size={24} weight='duotone' />
				Рекомендації
			</Title>
			<div className='flex justify-between'>
				{products.slice(0, 5).map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}
