import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const ProductCardSkeleton = ({ className }: Props) => {
	return (
		<div
			className={cn(className, 'space-y-3 cursor-auto bg-card flex flex-col')}
		>
			<div className='relative'>
				<Skeleton className={cn('w-full rounded-xl aspect-square')} />

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
			<Skeleton className='rounded-xl h-4 w-full' />
			<Skeleton className='rounded-xl h-4 w-1/4' />
		</div>
	)
}
