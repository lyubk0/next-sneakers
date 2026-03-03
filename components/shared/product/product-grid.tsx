'use client'

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
				'grid gap-6 gap-y-[60px] grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4',
			)}
		>
			{children}
		</ul>
	)
}
