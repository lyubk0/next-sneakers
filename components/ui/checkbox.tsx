'use client'

import { cn } from '@/lib/utils'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { motion } from 'motion/react'
import * as React from 'react'

function Checkbox({
	className,
	checked,
	...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
	return (
		<CheckboxPrimitive.Root
			data-slot='checkbox'
			checked={checked}
			className={cn(
				'peer size-4.5 shrink-0 rounded-[6px] cursor-pointer bg-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground outline-none',
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				forceMount
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
						initial={false}
						animate={{ pathLength: checked ? 1 : 0 }}
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
