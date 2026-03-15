'use client'

import { Filters } from '@/components/shared/filters'
import { Button } from '@/components/ui/button'
import { DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { useFilters } from '@/hooks/nuqs'
import { useFiltersCount } from '@/hooks/use-filters-count'
import { cn } from '@/lib/utils'

export const FiltersDrawerContent = () => {
	const { resetFilters } = useFilters()
	const { count } = useFiltersCount()

	return (
		<>
			<DrawerHeader className='flex flex-row justify-between items-center'>
				<DrawerTitle className='text-xl font-bold uppercase'>
					filters {count > 0 && <span>({count})</span>}
				</DrawerTitle>
				<Button
					className={cn(count > 0 ? 'opacity-100' : 'opacity-0')}
					variant='ghost'
					size='sm'
					onClick={resetFilters}
				>
					Reset
				</Button>
			</DrawerHeader>
			<Filters />
		</>
	)
}
