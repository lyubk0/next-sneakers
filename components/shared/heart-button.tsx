'use client'

import { useToggleFavorite } from '@/hooks/tanstack/favorite/favorite-mutations'
import { cn } from '@/lib/utils'
import { FavouriteIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { MouseEvent } from 'react'

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

	const handleClickFavorite = async (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		if (!isFavorite) {
			navigator.vibrate?.(30)
		}

		toggleFavorite(productId)
	}

	return (
		<button
			type='button'
			onClick={handleClickFavorite}
			className={cn(
				'active:scale-[0.90] text-[#adadad] cursor-pointer hover:text-red-500 duration-250 ease-out',
				isFavorite && 'text-red-500',
				isLoading && 'pointer-events-none',
				className,
			)}
		>
			<HugeiconsIcon
				strokeWidth={2}
				size={iconSize}
				className={cn(
					isFavorite && 'fill-red-500',
					isLoading &&
						'fill-[oklch(0.9061_0_0/0.7216)] text-[oklch(0.9061_0_0/0.7216)] animate-pulse',
				)}
				icon={FavouriteIcon}
			/>
		</button>
	)
}
