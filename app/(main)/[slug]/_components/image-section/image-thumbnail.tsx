import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

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
	const [isLoaded, setIsLoaded] = useState(false)

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
				alt=''
				height={100}
				width={100}
				className={cn(
					'w-[70%] h-[70%] object-contain transition-[opacity,filter] duration-300',
					isLoaded ? 'blur-0' : 'blur-md',
				)}
				onLoad={() => setIsLoaded(true)}
			/>
		</div>
	)
}
