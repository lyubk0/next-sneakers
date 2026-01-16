import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

interface Props {
	className?: string
}

export const ErrorText = ({
	className,
	children,
}: PropsWithChildren<Props>) => {
	return (
		<p className={cn(className, 'text-red-500 font-medium text-sm')}>
			{children}
		</p>
	)
}
