'use client'

import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer'
import { useFiltersCount } from '@/hooks/use-filters-count'
import { useFiltersModalStore } from '@/store/use-filters-modal-store'
import { Filters } from './filters'

interface Props {
	className?: string
}

export const FiltersDrawer = ({ className }: Props) => {
	const { open, toggle } = useFiltersModalStore()
	const { count } = useFiltersCount()
	return (
		<Drawer handleOnly direction='right' open={open} onOpenChange={toggle}>
			<DrawerContent className='overflow-y-auto overflow-x-hidden !w-[344px]'>
				<DrawerHeader>
					<DrawerTitle className='text-xl font-bold uppercase'>
						filters {count > 0 && <span>({count})</span>}
					</DrawerTitle>
				</DrawerHeader>
				<Filters />
			</DrawerContent>
		</Drawer>
	)
}
