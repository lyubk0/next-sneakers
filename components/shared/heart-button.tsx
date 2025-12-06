import { useToggleFavorite } from '@/hooks/queries/favorite/use-toggle-favorite'
import { cn } from '@/lib/utils'
import { IconHeart } from '@tabler/icons-react'
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
				'active:scale-[0.97] text-[#bdbdbd] cursor-pointer hover:text-red-500 duration-150 ease-out',
				isFavorite && 'text-red-500',
				className
			)}
			onClick={handleClickFavorite}
		>
			<IconHeart className={cn(isFavorite && 'fill-red-500')} size={iconSize} />
		</div>
	)
}
