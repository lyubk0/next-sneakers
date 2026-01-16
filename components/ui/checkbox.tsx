'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

function Checkbox({
	className,
	...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
	return (
		<CheckboxPrimitive.Root
			data-slot='checkbox'
			className={cn(
				'peer dark:bg-input/30 cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary bg-input data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4.5 shrink-0 rounded-[6px] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot='checkbox-indicator'
				className='grid place-content-center text-current'
			>
				<svg
					aria-hidden
					className='size-2 stroke-white'
					viewBox='0 0 10 8'
					fill='none'
				>
					<motion.path
						d='M1 4L3.5 6.5L9 1'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						exit={{ pathLength: 0 }}
						transition={{
							type: 'spring',
							duration: 0.35,
							bounce: 0,
						}}
					/>
				</svg>
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}

export { Checkbox }
