import { FiltersDrawerContent } from '@/components/shared/filters-drawer-content'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

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
