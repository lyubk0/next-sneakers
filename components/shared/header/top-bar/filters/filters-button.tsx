import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FilterIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface Props {
	filtersCount: number
	onClick?: () => void
	className?: string
}

export const FiltersButton = ({ onClick, filtersCount, className }: Props) => {
	return (
		<Button
			onClick={onClick}
			variant={'ghost'}
			className={cn('relative', className)}
		>
			<HugeiconsIcon strokeWidth={2} icon={FilterIcon} />
			<span>Filters</span>
			{filtersCount > 0 && <Badge count={filtersCount} />}
		</Button>
	)
}
