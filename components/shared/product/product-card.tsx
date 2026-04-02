'use client'

import { Product } from '@/@types/product.types'
import { useCarouselSync } from '@/hooks/use-carousel-sync.hooks'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { MouseEvent } from 'react'
import { Title } from '../../ui/title'
import { ProductCarousel } from './product-carousel'

interface Props {
	product: Product
	className?: string
}

export const ProductCard = ({ product, className }: Props) => {
	const { setApi, api } = useCarouselSync()
	return (
		<motion.div
			className={cn(
				className,
				'w-full group/card isolate cursor-pointer space-y-3 rounded-2xl h-full bg-card flex flex-col',
			)}
			initial='rest'
			whileHover='hover'
			animate='rest'
		>
			<ProductCarousel
				images={product.images}
				productTitle={product.name}
				productId={product.id}
				isFavorite={product.isFavorite || false}
				setApi={setApi}
				onPrev={(event: MouseEvent) => {
					api?.scrollTo((api?.selectedScrollSnap() || 0) - 1)
					event.preventDefault()
					event.stopPropagation()
				}}
				onNext={(event: MouseEvent) => {
					api?.scrollTo((api?.selectedScrollSnap() || 0) + 1)
					event.preventDefault()
					event.stopPropagation()
				}}
			/>

			<div className='flex flex-col gap-2 flex-1 justify-between'>
				<div className='relative inline-block'>
					<Title size='xs' className='font-semibold uppercase !text-sm'>
						{product.name}
					</Title>
				</div>
				<div className='flex justify-between items-end'>
					<div className='flex flex-col'>
						<Title size='xs' className='font-semibold !text-sm'>
							${product.price}
						</Title>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
