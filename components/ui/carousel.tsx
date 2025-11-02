'use client'

import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
	opts?: CarouselOptions
	plugins?: CarouselPlugin
	orientation?: 'horizontal' | 'vertical'
	setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0]
	api: ReturnType<typeof useEmblaCarousel>[1]
	scrollPrev: () => void
	scrollNext: () => void
	canScrollPrev: boolean
	canScrollNext: boolean
	selectedIndex: number
	scrollSnapList: number[]
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
	const context = React.useContext(CarouselContext)

	if (!context) {
		throw new Error('useCarousel must be used within a <Carousel />')
	}

	return context
}

function Carousel({
	orientation = 'horizontal',
	opts,
	setApi,
	plugins,
	className,
	children,
	...props
}: React.ComponentProps<'div'> & CarouselProps) {
	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			axis: orientation === 'horizontal' ? 'x' : 'y',
		},
		plugins
	)
	const [canScrollPrev, setCanScrollPrev] = React.useState(false)
	const [canScrollNext, setCanScrollNext] = React.useState(false)
	const [selectedIndex, setSelectedIndex] = React.useState(0)
	const [scrollSnapList, setScrollSnapList] = React.useState<number[]>([])

	const onSelect = React.useCallback((api: CarouselApi) => {
		if (!api) return
		setCanScrollPrev(api.canScrollPrev())
		setCanScrollNext(api.canScrollNext())
		setSelectedIndex(api.selectedScrollSnap())
		setScrollSnapList(api.scrollSnapList())
	}, [])

	const scrollPrev = React.useCallback(() => {
		api?.scrollPrev()
	}, [api])

	const scrollNext = React.useCallback(() => {
		api?.scrollNext()
	}, [api])

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'ArrowLeft') {
				event.preventDefault()
				scrollPrev()
			} else if (event.key === 'ArrowRight') {
				event.preventDefault()
				scrollNext()
			}
		},
		[scrollPrev, scrollNext]
	)

	React.useEffect(() => {
		if (!api || !setApi) return
		setApi(api)
	}, [api, setApi])

	React.useEffect(() => {
		if (!api) return
		onSelect(api)
		api.on('reInit', onSelect)
		api.on('select', onSelect)

		return () => {
			api?.off('select', onSelect)
		}
	}, [api, onSelect])

	return (
		<CarouselContext.Provider
			value={{
				carouselRef,
				api: api,
				opts,
				orientation:
					orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
				selectedIndex,
				scrollSnapList,
			}}
		>
			<div
				onKeyDownCapture={handleKeyDown}
				className={cn('relative', className)}
				role='region'
				aria-roledescription='carousel'
				data-slot='carousel'
				{...props}
			>
				{children}
			</div>
		</CarouselContext.Provider>
	)
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
	const { carouselRef, orientation } = useCarousel()

	return (
		<div
			ref={carouselRef}
			className='overflow-hidden'
			data-slot='carousel-content'
		>
			<div
				className={cn(
					'flex',
					orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
					className
				)}
				{...props}
			/>
		</div>
	)
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
	const { orientation } = useCarousel()

	return (
		<div
			role='group'
			aria-roledescription='slide'
			data-slot='carousel-item'
			className={cn(
				'min-w-0 shrink-0 grow-0 basis-full',
				orientation === 'horizontal' ? 'pl-4' : 'pt-4',
				className
			)}
			{...props}
		/>
	)
}

function CarouselPrevious({
	className,
	variant = 'outline',
	size = 'icon',
	...props
}: React.ComponentProps<typeof Button>) {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel()

	return (
		<Button
			data-slot='carousel-previous'
			variant={variant}
			size={size}
			className={cn(
				'absolute size-8 bg-white rounded-full',
				orientation === 'horizontal'
					? 'top-1/2 left-4 -translate-y-1/2'
					: 'top-4 left-1/2 -translate-x-1/2 rotate-90',
				className
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<ArrowLeft />
			<span className='sr-only'>Previous slide</span>
		</Button>
	)
}

function CarouselNext({
	className,
	variant = 'outline',
	size = 'icon',
	...props
}: React.ComponentProps<typeof Button>) {
	const { orientation, scrollNext, canScrollNext } = useCarousel()

	return (
		<Button
			data-slot='carousel-next'
			variant={variant}
			size={size}
			className={cn(
				'absolute size-8 bg-white rounded-full',
				orientation === 'horizontal'
					? 'top-1/2 right-4 -translate-y-1/2'
					: 'bottom-4 left-1/2 -translate-x-1/2 rotate-90',
				className
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<ArrowRight />
			<span className='sr-only'>Next slide</span>
		</Button>
	)
}

function CarouselDots({ className, ...props }: React.ComponentProps<'div'>) {
	const { api, selectedIndex, scrollSnapList } = useCarousel()

	return (
		<div
			className={cn(
				'absolute bottom-4 left-1/2 p-2 bg-black/70 rounded-full  -translate-x-1/2 flex justify-center gap-2',
				className
			)}
			data-slot='carousel-dots'
			{...props}
		>
			{scrollSnapList.map((_, idx) => (
				<button
					key={idx}
					onClick={() => api?.scrollTo(idx)}
					className={cn(
						'h-2 rounded-full transition-all',
						selectedIndex === idx
							? 'w-8 bg-primary'
							: 'w-2 bg-white hover:bg-white/90'
					)}
					aria-label={`Go to slide ${idx + 1}`}
					aria-current={selectedIndex === idx}
				/>
			))}
		</div>
	)
}

export {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
}
