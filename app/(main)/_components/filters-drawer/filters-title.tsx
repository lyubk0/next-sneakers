import { cn } from '@/lib/utils'

interface Props {
	title?: string
	className?: string
}

export const FiltersTitle = ({ title, className }: Props) => {
	return <h6 className={cn('font-semibold !text-base', className)}>{title}</h6>
}
