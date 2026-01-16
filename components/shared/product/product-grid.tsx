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
				'grid gap-4 ',
				'[grid-template-columns:repeat(auto-fit,350px)]'
			)}
		>
			{children}
		</ul>
	)
}
