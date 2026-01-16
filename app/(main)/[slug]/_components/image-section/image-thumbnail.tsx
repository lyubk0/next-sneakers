import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
	imgUrl?: string
	active?: boolean
	onClick?: () => void
	className?: string
}

export const ImageThumbnail = ({
	imgUrl,
	active,
	onClick,
	className,
}: Props) => {
	return (
		<div
			onClick={onClick}
			className={cn(
				'bg-muted flex-1 cursor-pointer opacity-50 hover:opacity-70 duration-150 rounded-2xl h-[127px] flex items-center justify-center',
				active && 'hover:!opacity-100 opacity-100',
				className
			)}
		>
			<Image
				src={imgUrl || '/krossi.png'}
				alt={''}
				height={105}
				width={105}
				quality={100}
			/>
		</div>
	)
}
