'use client'

import { Product } from '@/@types/product'
import { HeartButton } from '@/components/shared/heart-button'
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'
import { ImageThumbnail } from './image-thumbnail'

interface Props {
	product: Product
	className?: string
}

export const ImageSection = ({ product, className }: Props) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [api, setApi] = useState<CarouselApi | undefined>(undefined)

	const handleSelectImage = (index: number) => {
		setCurrentIndex(index)
		api?.scrollTo(index)
	}

	return (
		<div className='flex flex-col flex-1  gap-4'>
			<Carousel
				className='relative select-none bg-muted rounded-2xl'
				opts={{ align: 'start', watchDrag: true, duration: 15 }}
				setApi={setApi}
			>
				<HeartButton
					productId={product.id}
					isFavorite={product.isFavorite}
					className='absolute right-4 top-4 z-10'
					iconSize={20}
				/>
				<CarouselContent className='rounded-2xl'>
					{product.images.map(img => (
						<CarouselItem className='flex justify-center  '>
							<Image
								src={img}
								alt={''}
								height={500}
								width={500}
								quality={100}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious
					onClick={() => {
						api?.scrollPrev()
						setCurrentIndex(api?.selectedScrollSnap || 0)
					}}
				/>
				<CarouselNext
					onClick={() => {
						api?.scrollNext()
						setCurrentIndex(api?.selectedScrollSnap || 0)
					}}
				/>
				<CarouselDots className='mt-4' />
			</Carousel>

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
							active={currentIndex === index}
						/>
					</motion.div>
				))}
			</div>
		</div>
	)
}
