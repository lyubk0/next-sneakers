import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

interface Props {
	className?: string
}

export const ProductGrid = ({
	children,
	className,
}: PropsWithChildren<Props>) => {
	return (
		<ul
			className={cn(
				className,
				'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
			)}
		>
			{' '}
			{children}
		</ul>
	)
}
