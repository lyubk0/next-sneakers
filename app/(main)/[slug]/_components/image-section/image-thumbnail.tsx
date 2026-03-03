import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
	imgUrl?: string
	isActive?: boolean
	onClick?: () => void
	className?: string
}

export const ImageThumbnail = ({
	imgUrl,
	isActive,
	onClick,
	className,
}: Props) => {
	return (
		<div
			onClick={onClick}
			className={cn(
				'bg-muted flex-1 cursor-pointer duration-150 rounded-2xl aspect-square flex items-center justify-center',
				isActive && 'ring-2 ring-primary',
				className,
			)}
		>
			<Image
				src={imgUrl || '/krossi.png'}
				alt={''}
				height={100}
				width={100}
				quality={100}
				className='w-[70%] h-[70%] object-contain'
			/>
		</div>
	)
}
