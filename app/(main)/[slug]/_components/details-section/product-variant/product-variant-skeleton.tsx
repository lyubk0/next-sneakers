import { cn } from '@/lib/utils'

interface Props {
	imgUrl?: string
	isActive?: boolean
	onClick?: () => void
	className?: string
}

export const ProductVariantSkeleton = ({
	imgUrl,
	isActive,
	onClick,
	className,
}: Props) => {
	return (
		<div
			onClick={onClick}
			className={cn(
				'bg-muted relative size-[100px] cursor-pointer duration-150 rounded-2xl aspect-square flex items-center justify-center',
				isActive && 'ring-2 ring-primary',
				className,
			)}
		>
			<div
				className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[oklch(0.9061_0_0/0.7216)] animate-pulse w-[60%] aspect-square'
				style={{
					WebkitMaskImage: 'url(/blue-krossi.png)',
					maskImage: 'url(/blue-krossi.png)',
					WebkitMaskRepeat: 'no-repeat',
					maskRepeat: 'no-repeat',
					WebkitMaskSize: 'contain',
					maskSize: 'contain',
				}}
			/>
		</div>
	)
}
