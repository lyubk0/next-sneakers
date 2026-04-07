'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type ToggleOption = {
	label: ReactNode
	value: string
	icon?: ReactNode
}

interface ToggleTabsProps {
	value: string
	onChange: (value: string) => void
	options: ToggleOption[]
	className?: string
}

export function ToggleTabs({
	value,
	onChange,
	options,
	className,
}: ToggleTabsProps) {
	return (
		<div
			className={cn('inline-flex rounded-full bg-muted p-1', className)}
			role='tablist'
		>
			{options.map(option => {
				const active = option.value === value

				return (
					<button
						key={option.value}
						type='button'
						role='tab'
						aria-selected={active}
						data-active={active ? 'true' : 'false'}
						onClick={() => onChange(option.value)}
						className={cn(
							'relative cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-150 ease-out',
							'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
							active
								? 'bg-background text-foreground shadow-sm'
								: 'text-muted-foreground hover:text-foreground',
							option.icon && 'flex items-center gap-2',
						)}
					>
						{option.icon ? (
							<>
								<span className='sm:hidden'>{option.icon}</span>
								<span className='hidden sm:inline'>{option.label}</span>
							</>
						) : (
							option.label
						)}
					</button>
				)
			})}
		</div>
	)
}
