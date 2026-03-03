import { Filters } from '@/app/(main)/_components/filters-drawer/filters'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

interface Props {
	className?: string
}

export const FiltersDrawer = ({
	className,
	children,
}: PropsWithChildren<Props>) => {
	return (
		<Drawer>
			<DrawerTrigger className={cn('ml-auto', className)}>
				{children}
			</DrawerTrigger>
			<DrawerContent className='h-[80%]'>
				<DrawerHeader>
					<DrawerTitle>Filters</DrawerTitle>
				</DrawerHeader>
				<Filters />
				<DrawerFooter>
					<DrawerClose></DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
