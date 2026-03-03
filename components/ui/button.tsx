'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Spinner } from './spinner'

const buttonVariants = cva(
	"inline-flex items-center cursor-pointer duration-100 ease-out justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all text-sm disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
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
	},
)

function Button({
	className,
	variant,
	size,
	asChild = false,
	isScaled = true,
	isLoading = false,
	children,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
		isLoading?: boolean
		isScaled?: boolean
	}) {
	const Comp = asChild ? Slot : motion.button
	const [showContent, setShowContent] = React.useState(!isLoading)

	React.useEffect(() => {
		if (isLoading) {
			// Сразу показываем загрузку
			setShowContent(false)
		} else {
			// Добавляем задержку перед показом контента
			const timer = setTimeout(() => {
				setShowContent(true)
			}, 150)
			return () => clearTimeout(timer)
		}
	}, [isLoading])

	return (
		<>
			{' '}
			{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
			{/* @ts-ignore */}
			<Comp
				data-slot='button'
				className={cn(
					buttonVariants({ variant, size, className }),
					isLoading && 'pointer-events-none bg-muted text-muted-foreground',
				)}
				disabled={isLoading || props.disabled}
				whileTap={{ scale: isScaled ? 0.97 : 1 }}
				transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
				{...props}
			>
				<AnimatePresence initial={false} mode='wait'>
					{!showContent ? (
						<motion.div
							key='spinner'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15 }}
						>
							<Spinner className={size === 'sm' ? 'size-4' : 'size-5'} />
						</motion.div>
					) : (
						<motion.div
							key='content'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15 }}
							className='inline-flex items-center  justify-center gap-2'
						>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</Comp>
		</>
	)
}

export { Button, buttonVariants }
