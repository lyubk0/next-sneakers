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
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MouseEvent } from 'react'

interface Props {
	images: string[]
	productId: number
	isFavorite: boolean
	isFavoriteLoading?: boolean
	setApi: (api: CarouselApi) => void
	onPrev: (event: MouseEvent) => void
	onNext: (event: MouseEvent) => void
	className?: string
}

export const ProductCarousel = ({
	images,
	productId,
	isFavorite,
	isFavoriteLoading,
	setApi,
	onPrev,
	onNext,
	className,
}: Props) => {
	return (
		<Carousel
			className={cn(
				'relative group-hover/card:bg-[#f0f0f0] duration-100 ease-out select-none bg-muted flex justify-center items-center rounded-2xl aspect-square',
			)}
			opts={{ align: 'start', watchDrag: true, duration: 15 }}
			setApi={setApi}
		>
			<HeartButton
				productId={productId}
				isLoading={isFavoriteLoading}
				isFavorite={isFavorite || false}
				className='absolute right-4 top-4 z-10'
				iconSize={20}
			/>
			<CarouselContent className='h-full w-full'>
				{images.map(img => (
					<CarouselItem key={img} className='flex justify-center items-center '>
						<div className='relative m-10 w-full aspect-square'>
							<Image
								loading='lazy'
								src={img}
								alt={''}
								fill
								className='object-contain'
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious onClick={onPrev} />
			<CarouselNext onClick={onNext} />
			<CarouselDots className='mt-4 opacity-0 group-hover/card:opacity-100 duration-150 ease-out' />
		</Carousel>
	)
}
