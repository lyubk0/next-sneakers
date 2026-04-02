'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { SORT_OPTIONS, SortValue } from '@/constants/sort.constants'
import { useSort } from '@/hooks/nuqs/use-sort'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const SortButton = ({ className }: Props) => {
	const { sort, setSort } = useSort()

	return (
		<Select
			value={sort ?? 'recommended'}
			onValueChange={(value: SortValue) => setSort(value)}
		>
			<SelectTrigger className={cn('gap-1.5 ', className)}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{SORT_OPTIONS.map(option => (
					<SelectItem value={option.value}>{option.label}</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
