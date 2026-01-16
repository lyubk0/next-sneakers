import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const ProductCardSkeleton = ({ className }: Props) => {
	return (
		<div
			className={cn(className, 'space-y-2 cursor-auto bg-card flex flex-col')}
		>
			<Skeleton className='w-[350px] h-[350px] rounded-xl' />
			<Skeleton className='rounded-xl h-4 w-full' />
			<Skeleton className='rounded-xl h-4 w-1/3' />
		</div>
	)
}
