import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const ProductImageMask = ({ className }: Props) => {
	return (
		<div
			className={cn(
				'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[oklch(0.9061_0_0/0.7216)] animate-pulse w-[73%] aspect-square',
				className,
			)}
			style={{
				WebkitMaskImage: 'url(/blue-krossi.png)',
				maskImage: 'url(/blue-krossi.png)',
				WebkitMaskRepeat: 'no-repeat',
				maskRepeat: 'no-repeat',
				WebkitMaskSize: 'contain',
				maskSize: 'contain',
			}}
		/>
	)
}
