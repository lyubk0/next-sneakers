import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Spinner } from './spinner'

const buttonVariants = cva(
	"inline-flex items-center cursor-pointer duration-100 ease-out justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all text-sm disabled:pointer-events-none  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border border-black bg-transparent  hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary:
					'bg-muted text-foreground border-none hover:bg-[oklch(0.92_0_0/72.16%)]',
				flat: 'bg-primary/15 text-primary hover:bg-primary/20',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 p-4 has-[>svg]:px-3 ',
				sm: 'h-9 gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 [&_svg:not([class*="size-"])]:!size-5  px-6 py-[9.5px] has-[>svg]:px-4',
				xl: 'h-12.5 [&_svg:not([class*="size-"])]:!size-5  px-6 py-[9.5px] has-[>svg]:px-4',
				icon: 'size-8 rounded-[12px]',
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
	const Comp = asChild ? Slot : motion.button

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			disabled={loading || props.disabled}
			whileTap={{ scale: 0.97 }}
			transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
			{...props}
		>
			<AnimatePresence initial={false} mode='wait'>
				{loading ? (
					<Spinner className={size === 'sm' ? 'size-4' : 'size-5'} />
				) : (
					<>{children}</>
				)}
			</AnimatePresence>
		</Comp>
	)
}

export { Button, buttonVariants }
