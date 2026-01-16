'use client'

import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { ReactNode } from 'react'

type ToggleOption = {
	label: ReactNode
	value: string
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
		<div className={cn('inline-flex rounded-full bg-muted p-1', className)}>
			{options.map(option => {
				const isActive = option.value === value

				return (
					<button
						key={option.value}
						type='button'
						onClick={() => onChange(option.value)}
						className={cn(
							'relative z-10 cursor-pointer px-3 py-1.5 text-sm font-medium duration-150 ease-out',
							isActive
								? 'text-foreground'
								: 'text-muted-foreground hover:text-foreground'
						)}
					>
						{isActive && (
							<motion.div
								layoutId='toggle-tabs-indicator'
								className='absolute inset-0 z-[-1] rounded-full bg-background shadow-sm'
								transition={{
									type: 'spring',
									stiffness: 300,
									damping: 25,
								}}
							/>
						)}

						{option.label}
					</button>
				)
			})}
		</div>
	)
}
