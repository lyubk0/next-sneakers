'use client'

import { Product } from '@/@types/product'
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { HeartIcon } from '@phosphor-icons/react'
import Image from 'next/image'

interface Props {
	product: Product
	className?: string
}

export const ImageSection = ({ product, className }: Props) => {
	return (
		<Carousel className='relative select-none' opts={{ align: 'start' }}>
			<HeartIcon
				size={22}
				weight='duotone'
				className={cn(
					'absolute active:scale-[0.97] z-10 right-3 top-3 text-muted-foreground cursor-pointer hover:text-red-500 duration-150 ease-out',
					product.isFavorite && 'text-red-500'
				)}
			/>
			<CarouselContent className='w-[640px]'>
				{product?.images.map(img => (
					<CarouselItem>
						<Image
							src={img}
							alt={''}
							height={600}
							width={600}
							quality={100}
							className='rounded-xl max-w-full'
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselDots className='mt-4' />
		</Carousel>
	)
}
