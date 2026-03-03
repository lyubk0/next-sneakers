'use client'

import { Product } from '@/@types/product'
import { ANIMATED_EMOJIS } from '@/constants/animated-emojis-constant'
import { useFiltersCount } from '@/hooks/use-filters-count'
import { AnimatePresence, easeOut, motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { SomethingWentWrong } from '../something-went-wrong'
import { ProductCard } from './product-card'
import { ProductCardSkeleton } from './product-card-skeleton'
import { ProductGrid } from './product-grid'

interface Props {
	items: Product[]
	isPending?: boolean
	isFetchingNextPage?: boolean
	hasNextPage?: boolean
	onLoadMore?: () => void
	className?: string
}

const mockData = [...Array(8)]

const cardVariants = {
	hidden: { opacity: 0, scale: 0.92 },
	visible: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.92 },
}

const transition = {
	duration: 0.15,
	ease: easeOut,
}

export const ProductList = ({
	items,
	isPending,
	isFetchingNextPage,
	hasNextPage,
	onLoadMore,
	className,
}: Props) => {
	const { count } = useFiltersCount()
	const sentinelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					onLoadMore?.()
				}
			},
			{ threshold: 0.1 },
		)
		if (sentinelRef.current) observer.observe(sentinelRef.current)
		return () => observer.disconnect()
	}, [hasNextPage, isFetchingNextPage, onLoadMore])

	return (
		<>
			<AnimatePresence>
				{items.length === 0 && count > 0 && !isPending && (
					<motion.div
						key='empty-state'
						className='w-full flex justify-center'
						initial={{ opacity: 0, scale: 0.92 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.92 }}
						transition={transition}
					>
						<SomethingWentWrong
							title='Oops, nothing here'
							subtext='Looks like these filters are too specific. Try tweaking them.'
							lottieEmoji={ANIMATED_EMOJIS.lmfao}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<ProductGrid className={className}>
				<AnimatePresence mode='popLayout'>
					{isPending &&
						mockData.map((_, i) => (
							<motion.li
								key={`skeleton-${i}`}
								variants={cardVariants}
								initial='hidden'
								animate='visible'
								exit='exit'
								transition={{
									...transition,
									delay: (i % 8) * 0.04,
								}}
							>
								<ProductCardSkeleton />
							</motion.li>
						))}

					{!isPending &&
						items?.map((item, i) => (
							<motion.div
								key={item.id}
								variants={cardVariants}
								initial='hidden'
								animate='visible'
								exit='exit'
								transition={{ ...transition, delay: (i % 8) * 0.04 }}
							>
								<Link href={`/${item.slug}`}>
									<ProductCard product={item} />
								</Link>
							</motion.div>
						))}
				</AnimatePresence>
			</ProductGrid>

			{/* Триггер подгрузки */}
			<div ref={sentinelRef} className='h-1' />

			{isFetchingNextPage && (
				<ProductGrid>
					{mockData.map((_, i) => (
						<ProductCardSkeleton key={`next-skeleton-${i}`} />
					))}
				</ProductGrid>
			)}
		</>
	)
}
