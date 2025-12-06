import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

interface Props {
	className?: string
}

export const WhiteBlock = ({
	className,
	children,
}: PropsWithChildren<Props>) => {
	return (
		<div className={cn(className, 'bg-white rounded-2xl p-6')}>{children}</div>
	)
}
