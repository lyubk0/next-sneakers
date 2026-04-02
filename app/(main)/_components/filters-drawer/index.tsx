'use client'

import { FiltersDrawerContent } from '@/components/shared/filters-drawer-content'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { useFiltersDrawerStore } from '@/store/use-filters-modal-store'

interface Props {
	className?: string
}

export const FiltersDrawer = ({ className }: Props) => {
	const { open, toggle } = useFiltersDrawerStore()

	return (
		<Drawer handleOnly direction='right' open={open} onOpenChange={toggle}>
			<DrawerContent className='overflow-y-auto overflow-x-hidden !w-[344px]'>
				<FiltersDrawerContent />
			</DrawerContent>
		</Drawer>
	)
}
