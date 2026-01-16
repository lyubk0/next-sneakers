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
import { Title } from '../../ui/title'
import { HeartButton } from '../heart-button'

interface Props {
	product: Product
	className?: string
}

export const ProductCard = ({ product, className }: Props) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [api, setApi] = useState<CarouselApi | undefined>(undefined)
	return (
		<motion.div
			className={cn(
				className,
				'w-full group cursor-pointer space-y-3 rounded-2xl h-full bg-card flex flex-col'
			)}
			initial='rest'
			whileHover='hover'
			animate='rest'
		>
			<Carousel
				className='relative  group-hover:bg-[#f0f0f0] duration-100 ease-out select-none  bg-muted flex justify-center h-[350px] items-center  rounded-2xl'
				opts={{ align: 'start', watchDrag: true, duration: 15 }}
				setApi={setApi}
			>
				<HeartButton
					productId={product.id}
					isFavorite={product.isFavorite}
					className='absolute right-4 top-4 z-10'
					iconSize={20}
				/>
				<CarouselContent>
					{product.images.map(img => (
						<CarouselItem className='flex justify-center  '>
							<Image src={img} alt={''} height={270} width={270} />
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
