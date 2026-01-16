'use client'

import { cn } from '@/lib/utils'
import { useFiltersSidebarStore } from '@/store/use-filters-sidebar-store'
import { FiltersSidebar } from '.'

interface Props {
	className?: string
}

export const FiltersSidebarContainer = ({ className }: Props) => {
	const { open } = useFiltersSidebarStore()
	return (
		<FiltersSidebar
			className={cn(
				'w-[300px] shrink-0 h-[100px]',
				!open && 'hidden',
				className
			)}
		/>
	)
}
