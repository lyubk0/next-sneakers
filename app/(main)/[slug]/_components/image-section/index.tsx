'use client'

import { Product } from '@/@types/product.types'
import { useCarouselSync } from '@/hooks/use-carousel-sync.hooks'
import { motion } from 'motion/react'

import { ProductCarousel } from '@/components/shared/product/product-carousel'
import { MouseEvent } from 'react'
import { ImageThumbnail } from './image-thumbnail'

interface Props {
	product: Product
	isFavoriteLoading?: boolean
	className?: string
}

export const ImageSection = ({
	product,
	isFavoriteLoading,
	className,
}: Props) => {
	const { currentIndex, setCurrentIndex, api, setApi } = useCarouselSync()

	const handleSelectImage = (index: number) => {
		setCurrentIndex(index)
		api?.scrollTo(index)
	}

	return (
		<div className='flex flex-col flex-1  gap-4'>
			<ProductCarousel
				images={product.images}
				productId={product.id}
				productTitle={product.name}
				isFavorite={product.isFavorite || false}
				isFavoriteLoading={isFavoriteLoading}
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

			<div className='grid grid-cols-4 gap-4'>
				{product.images.map((url, index) => (
					<motion.div
						key={url ?? index}
						whileTap={{ scale: 0.97 }}
						transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
					>
						<ImageThumbnail
							imgUrl={url}
							onClick={() => handleSelectImage(index)}
							isActive={currentIndex === index}
						/>
					</motion.div>
				))}
			</div>
		</div>
	)
}
