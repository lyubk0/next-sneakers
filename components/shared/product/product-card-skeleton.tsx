import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { ProductImageMask } from './product-image-mask'

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
				<ProductImageMask />
			</div>
			<Skeleton className='rounded-xl h-4 w-full' />
			<Skeleton className='rounded-xl h-4 w-1/4' />
		</div>
	)
}
