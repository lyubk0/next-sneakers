'use client'

import { Product } from '@/@types/product'
import { ANIMATED_EMOJIS } from '@/constants/animated-emojis-constant'
import { useInfiniteLoading } from '@/hooks/infinite-loading'
import { useFiltersCount } from '@/hooks/use-filters-count'
import {
	cardVariants,
	getCardTransition,
	transition,
} from '@/lib/motion/product-list-motion'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
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

export const ProductList = ({
	items,
	isPending,
	isFetchingNextPage,
	hasNextPage,
	onLoadMore,
	className,
}: Props) => {
	const { count } = useFiltersCount()
	const sentinelRef = useInfiniteLoading({
		hasNextPage,
		isFetchingNextPage,
		onLoadMore,
	})

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
								transition={getCardTransition(i)}
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
								transition={getCardTransition(i)}
							>
								<Link href={`/${item.slug}`}>
									<ProductCard product={item} />
								</Link>
							</motion.div>
						))}

					{isFetchingNextPage &&
						mockData.map((_, i) => (
							<motion.li
								key={`next-skeleton-${i}`}
								variants={cardVariants}
								initial='hidden'
								animate='visible'
								exit='exit'
								transition={getCardTransition(i)}
							>
								<ProductCardSkeleton />
							</motion.li>
						))}
				</AnimatePresence>
			</ProductGrid>

			<div ref={sentinelRef} className='h-1' />
		</>
	)
}
