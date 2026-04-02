'use client'

import { Product } from '@/@types/product.types'
import { ANIMATED_EMOJIS } from '@/constants/animated-emojis.constants'
import { useFiltersCount } from '@/hooks/use-filters-count.hooks'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import Link from 'next/link'
import { SomethingWentWrong } from '../something-went-wrong'
import { ProductCard } from './product-card'
import { ProductCardSkeleton } from './product-card-skeleton'
import { ProductGrid } from './product-grid'

interface Props {
	items?: Product[]
	isPending?: boolean
	className?: string
}

const mockData = [...Array(8)]

const transition = {
	duration: 0.35,
	type: 'spring',
	stiffness: 400,
	damping: 22,
} as const
const variants: Variants = {
	initial: { opacity: 0, y: 32 },
	animate: { opacity: 1, y: 0 },
	exit: {
		opacity: 0,
		y: 16,
		transition: { duration: 0.15, ease: 'easeIn' as const },
	},
}

export const ProductList = ({ items, isPending, className }: Props) => {
	const { count } = useFiltersCount()
	const isEmpty = items?.length === 0 && count > 0 && !isPending

	return (
		<AnimatePresence mode='wait'>
			{isEmpty ? (
				<motion.div
					key='empty-state'
					className='w-full flex justify-center'
					variants={variants}
					initial='initial'
					animate='animate'
					exit='exit'
					transition={transition}
				>
					<SomethingWentWrong
						title='Oops, nothing here'
						subtext='Looks like these filters are too specific. Try tweaking them.'
						lottieEmoji={ANIMATED_EMOJIS.lmfao}
					/>
				</motion.div>
			) : (
				<motion.div
					key='product-list'
					className={className}
					variants={variants}
					initial='initial'
					animate='animate'
					exit='exit'
					transition={transition}
				>
					<ProductGrid>
						{isPending
							? mockData.map((_, i) => <ProductCardSkeleton key={i} />)
							: items?.map(item => (
									<Link key={item.id} href={`/${item.slug}`}>
										<ProductCard product={item} />
									</Link>
								))}
					</ProductGrid>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
