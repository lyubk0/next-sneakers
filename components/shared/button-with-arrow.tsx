import { cn } from '@/lib/utils'
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { PropsWithChildren } from 'react'
import { Button } from '../ui/button'

interface Props {
	leftArrow?: boolean
	rightArrow?: boolean
	className?: string
}

export const ButtonWithArrow = ({
	className,
	children,
	leftArrow,
	rightArrow,
}: PropsWithChildren<Props>) => {
	return (
		<Button size={'xl'} className={cn(className, 'group')}>
			{leftArrow && (
				<ArrowLeftIcon
					className='group-hover:-translate-x-1 duration-150 ease-out'
					weight='bold'
				/>
			)}
			{children}
			{rightArrow && (
				<ArrowRightIcon
					className='group-hover:translate-x-1 duration-150 ease-out'
					weight='bold'
				/>
			)}
		</Button>
	)
}
