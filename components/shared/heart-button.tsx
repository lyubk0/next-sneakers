import { useToggleFavorite } from '@/hooks/queries/favorite/use-toggle-favorite'
import { cn } from '@/lib/utils'
import { FavouriteIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { MouseEvent } from 'react'

interface Props {
	productId: number
	isFavorite: boolean
	iconSize?: number
	className?: string
}

export const HeartButton = ({
	productId,
	isFavorite,
	iconSize = 20,
	className,
}: Props) => {
	const { mutateAsync: toggleFavorite } = useToggleFavorite()

	const handleClickFavorite = async (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
		await toggleFavorite(productId)
	}

	return (
		<div
			role='button'
			className={cn(
				'active:scale-[0.97] text-[#adadad] cursor-pointer hover:text-red-500 duration-150 ease-out',
				isFavorite && 'text-red-500',
				className
			)}
			onClick={handleClickFavorite}
		>
			<HugeiconsIcon
				strokeWidth={2}
				size={iconSize}
				className={cn(isFavorite && 'fill-red-500')}
				icon={FavouriteIcon}
			/>
		</div>
	)
}
