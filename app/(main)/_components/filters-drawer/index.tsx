'use client'

import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer'
import { useFilters } from '@/hooks/nuqs'
import { useFiltersCount } from '@/hooks/use-filters-count'
import { cn } from '@/lib/utils'
import { useFiltersModalStore } from '@/store/use-filters-modal-store'
import { Filters } from './filters'

interface Props {
	className?: string
}

export const FiltersDrawer = ({ className }: Props) => {
	const { open, toggle } = useFiltersModalStore()
	const { resetFilters } = useFilters()
	const { count } = useFiltersCount()
	return (
		<Drawer handleOnly direction='right' open={open} onOpenChange={toggle}>
			<DrawerContent className='overflow-y-auto overflow-x-hidden !w-[344px]'>
				<DrawerHeader className='flex flex-row justify-between items-center'>
					<DrawerTitle className='text-xl font-bold uppercase'>
						filters {count > 0 && <span>({count})</span>}
					</DrawerTitle>
					<Button
						className={cn(count > 0 ? 'opacity-100' : 'opacity-0')}
						variant='ghost'
						size={'sm'}
						onClick={resetFilters}
					>
						Reset
					</Button>
				</DrawerHeader>
				<Filters />
			</DrawerContent>
		</Drawer>
	)
}
