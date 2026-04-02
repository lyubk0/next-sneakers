'use client'

import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { ReactNode, useEffect, useRef, useState } from 'react'

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
	const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
	const [indicatorStyle, setIndicatorStyle] = useState<{
		left: number
		width: number
	} | null>(null)

	useEffect(() => {
		const activeButton = buttonRefs.current.get(value)
		if (!activeButton) return

		setIndicatorStyle({
			left: activeButton.offsetLeft,
			width: activeButton.offsetWidth,
		})
	}, [value])

	return (
		<div
			className={cn(
				'relative inline-flex rounded-full bg-muted p-1',
				className,
			)}
		>
			{indicatorStyle && (
				<motion.div
					initial={false}
					className='absolute top-1 bottom-1 rounded-full bg-background shadow-sm'
					animate={{
						left: indicatorStyle.left,
						width: indicatorStyle.width,
					}}
					transition={{
						duration: 0.15,
					}}
				/>
			)}

			{options.map(option => {
				const isActive = option.value === value

				return (
					<button
						key={option.value}
						ref={el => {
							if (el) buttonRefs.current.set(option.value, el)
							else buttonRefs.current.delete(option.value)
						}}
						type='button'
						onClick={() => onChange(option.value)}
						className={cn(
							'relative z-10 cursor-pointer px-3 py-1.5 text-sm font-medium transition-colors duration-150 ease-out',
							isActive
								? 'text-foreground'
								: 'text-muted-foreground hover:text-foreground',
						)}
					>
						{option.icon ? (
							<>
								<span className='sm:hidden flex items-center justify-center'>
									{option.icon}
								</span>
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
