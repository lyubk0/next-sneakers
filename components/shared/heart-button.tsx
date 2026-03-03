'use client'

import { useToggleFavorite } from '@/hooks/tanstack/favorite/favorite-mutations'
import { cn } from '@/lib/utils'
import { FavouriteIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { motion } from 'motion/react'
import { MouseEvent, useState } from 'react'

interface Props {
	productId: number
	isFavorite: boolean
	isLoading?: boolean
	iconSize?: number
	className?: string
}

export const HeartButton = ({
	productId,
	isFavorite,
	isLoading,
	iconSize = 20,
	className,
}: Props) => {
	const { mutateAsync: toggleFavorite } = useToggleFavorite()
	const [bounceKey, setBounceKey] = useState(0)

	const handleClickFavorite = async (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()

		setBounceKey(prev => prev + 1)
		await toggleFavorite(productId)
	}

	return (
		<motion.div
			key={bounceKey}
			role='button'
			onClick={handleClickFavorite}
			className={cn(
				'active:scale-[0.97] text-[#adadad] cursor-pointer hover:text-red-500 duration-150 ease-out',
				isFavorite && 'text-red-500',
				isLoading && 'pointer-events-none ',
				className,
			)}
			initial={false}
			animate={{ scale: [1, 1.25, 1] }}
			transition={{ duration: 0.25, ease: 'easeOut' }}
		>
			<HugeiconsIcon
				strokeWidth={2}
				size={iconSize}
				className={cn(
					isFavorite && 'fill-red-500',
					isLoading &&
						'fill-[oklch(0.9061_0_0/0.7216)]  text-[oklch(0.9061_0_0/0.7216)] animate-pulse',
				)}
				icon={FavouriteIcon}
			/>
		</motion.div>
	)
}
