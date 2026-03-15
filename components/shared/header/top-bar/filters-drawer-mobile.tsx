import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'
import { FiltersDrawerContent } from '../../filters-drawer-content'

interface Props {
	className?: string
}

export const FiltersDrawerMobile = ({
	className,
	children,
}: PropsWithChildren<Props>) => {
	return (
		<Drawer>
			<DrawerTrigger className={cn('ml-auto', className)}>
				{children}
			</DrawerTrigger>
			<DrawerContent className='h-[80%]'>
				<FiltersDrawerContent />
				<DrawerFooter>
					<DrawerClose />
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
