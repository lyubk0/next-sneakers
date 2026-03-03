import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FilterIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Calligraph } from 'calligraph'

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
			className={cn('!ml-auto', className)}
		>
			<HugeiconsIcon strokeWidth={2} icon={FilterIcon} />
			<Calligraph variant='text'>{`Filters ${filtersCount > 0 ? `(${filtersCount})` : ''}`}</Calligraph>
		</Button>
	)
}
