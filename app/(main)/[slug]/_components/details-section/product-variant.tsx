// product-variant.tsx
import { ProductImageMask } from '@/components/shared/product/product-image-mask'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
	imgUrl?: string
	isActive?: boolean
	onClick?: () => void
	className?: string
}

export const ProductVariant = ({
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
				'bg-muted size-[100px] cursor-pointer duration-150 rounded-2xl aspect-square flex items-center justify-center relative',
				isActive && 'ring-2 ring-primary',
				className,
			)}
		>
			{!isLoaded && <ProductImageMask />}

			<Image
				src={imgUrl || '/krossi.png'}
				alt={''}
				height={100}
				width={100}
				quality={100}
				className={cn(
					'w-[70%] h-[70%] object-contain transition-opacity duration-300',
					isLoaded ? 'opacity-100' : 'opacity-0',
				)}
				onLoad={() => setIsLoaded(true)}
			/>
		</div>
	)
}
