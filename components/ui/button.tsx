import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Spinner } from '../shared/spinner'

const buttonVariants = cva(
	"inline-flex items-center cursor-pointer duration-150 active:scale-[0.98] ease-out justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border border-1 bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary:
					'bg-primary/13 text-foreground border-none hover:bg-primary/10',
				flat: 'bg-primary/15 text-primary hover:bg-primary/20',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default:
					'h-9 p-4 has-[>svg]:px-3 [&_svg:not([class*="size-"])]:!size-5',
				sm: 'h-9 gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 [&_svg:not([class*="size-"])]:!size-5.5 px-6 py-[9.5px] has-[>svg]:px-4',
				icon: 'h-8 w-max px-[7px] rounded-xl [&_svg:not([class*="size-"])]:!size-4.5',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

function Button({
	className,
	variant,
	size,
	asChild = false,
	loading = false,
	children,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
		loading?: boolean
	}) {
	const Comp = asChild ? Slot : 'button'

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			disabled={loading || props.disabled}
			{...props}
		>
			<AnimatePresence initial={false} mode='wait'>
				{loading ? (
					<motion.span
						key='spinner'
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 10, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 500, damping: 30 }}
						className='flex justify-center items-center w-full'
					>
						<Spinner className={size === 'sm' ? 'size-4' : 'size-5'} />
					</motion.span>
				) : (
					<motion.span
						key='text'
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -10, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 500, damping: 30 }}
						className='inline-flex items-center justify-center gap-2 w-full'
					>
						{children}
					</motion.span>
				)}
			</AnimatePresence>
		</Comp>
	)
}

export { Button, buttonVariants }
