'use client'

import { Product } from '@/@types/product'
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'
import { HeartButton } from '../heart-button'
import { Title } from '../title'

interface Props {
	product: Product
	className?: string
}
const imageUrls = ['/krossi.png', '/krossi.png', '/krossi.png']

export const ProductCard = ({ product, className }: Props) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [api, setApi] = useState<CarouselApi | undefined>(undefined)
	return (
		<motion.div
			className={cn(
				className,
				'w-[350px] group cursor-pointer space-y-3 rounded-2xl h-full bg-card flex flex-col'
			)}
			initial='rest'
			whileHover='hover'
			animate='rest'
		>
			<Carousel
				className='relative select-none'
				opts={{ align: 'start', watchDrag: false }}
				setApi={setApi}
			>
				<HeartButton
					productId={product.id}
					isFavorite={product.isFavorite}
					className='absolute right-4 top-4 z-10'
					iconSize={20}
				/>
				<CarouselContent className='rounded-2xl '>
					{imageUrls.map(img => (
						<CarouselItem className='flex justify-center group-hover:bg-[#f0f0f0] duration-100 ease-out select-none relative items-center h-[350px] bg-muted '>
							<Image
								src={img}
								alt={''}
								height={270}
								width={270}
								quality={100}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious
					onClick={e => {
						e.preventDefault()
						api?.scrollPrev()
						setCurrentIndex(api?.selectedScrollSnap || 0)
					}}
				/>
				<CarouselNext
					onClick={e => {
						e.preventDefault()
						api?.scrollNext()
						setCurrentIndex(api?.selectedScrollSnap || 0)
					}}
				/>
				<CarouselDots className='mt-4 opacity-0 group-hover:opacity-100 duration-150 ease-out' />
			</Carousel>

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
