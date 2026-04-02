import { cn } from '@/lib/utils'

interface Props {
	count: number
	className?: string
}

export const Badge = ({ count, className }: Props) => {
	return (
		<span
			className={cn(
				'absolute -top-1 -right-1 min-w-[16px] h-[16px] px-[3px] inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-medium',
				className,
			)}
			style={{ lineHeight: 1 }}
		>
			{count}
		</span>
	)
}
