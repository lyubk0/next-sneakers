import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

interface Props {
	className?: string
}

export const Container = ({
	children,
	className,
}: PropsWithChildren<Props>) => {
	return (
		<div className={cn('mx-auto max-w-[1280px] px-5', className)}>
			{children}
		</div>
	)
}
