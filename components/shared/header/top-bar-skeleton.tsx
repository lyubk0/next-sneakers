import { cn } from '@/lib/utils'
import { Skeleton } from '../../ui/skeleton'

interface Props {
	className?: string
}

export const TopBarSkeleton = ({ className }: Props) => {
	const mockData = [...Array(5)]

	return (
		<div
			className={cn(className, 'flex gap-3 py-6 px-5  items-center flex-wrap')}
		>
			{mockData.map(_ => (
				<Skeleton className='w-[104px] h-[40px]' />
			))}
		</div>
	)
}
