import { cn } from '@/lib/utils'

interface Props {
	title?: string
	className?: string
}

export const FiltersSidebarTitle = ({ title, className }: Props) => {
	return <h6 className={cn('font-semibold mb-2.5', className)}>{title}</h6>
}
