import { cn } from '@/lib/utils'
import type { Icon } from '@phosphor-icons/react'
import type * as React from 'react'

export interface InputProps extends React.ComponentProps<'input'> {
	leftIcon?: Icon
	rightIcon?: Icon
}

function Input({
	className,
	type,
	leftIcon: LeftIcon,
	rightIcon: RightIcon,
	...props
}: InputProps) {
	const haveIcon = LeftIcon || RightIcon
	return (
		<div className='relative w-full'>
			{LeftIcon && (
				<div className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
					<LeftIcon size={20} weight='duotone' />
				</div>
			)}
			<input
				type={type}
				data-slot='input'
				className={cn(
					'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-11 w-full min-w-0 rounded-xl bg-input px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
					'focus-visible:border-ring focus-visible:ring-primary/95 focus-visible:ring-[2px]',
					'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
					haveIcon && 'pl-10 pr-10',
					className
				)}
				{...props}
			/>
			{RightIcon && (
				<div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
					<RightIcon size={20} weight='duotone' />
				</div>
			)}
		</div>
	)
}

export { Input }
