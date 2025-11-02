import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const ProductCardSkeleton = ({ className }: Props) => {
	return (
		<div
			className={cn(
				className,
				'p-4 w-[300px] h-[388px] space-y-4 shadow-xs cursor-auto rounded-2xl bg-card flex flex-col'
			)}
		>
			<Skeleton className='w-full h-[240px] rounded-xl' />
			<Skeleton className='rounded-xl h-6 -mt-2 w-full' />
			<Skeleton className='rounded-xl h-6 -mt-2 w-full' />
		</div>
	)
}
