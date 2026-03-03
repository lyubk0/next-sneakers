import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'

interface Props {
	colorName: string
	colorHex: string
	isActive?: boolean
	onClick?: () => void
	className?: string
}

export const FiltersColorChip = ({
	colorName,
	colorHex,
	isActive = false,
	onClick,
	className,
}: Props) => {
	return (
		<button
			onClick={onClick}
			aria-pressed={isActive}
			aria-label={colorName}
			className={cn(
				'relative cursor-pointer border border-border grid place-items-center size-7 rounded-md',
				className,
			)}
			style={{ background: colorHex }}
		>
			<AnimatePresence initial={false}>
				{isActive && (
					<motion.svg
						key='check'
						aria-hidden
						className={cn(
							'relative z-10 size-3  stroke-white pointer-events-none',
							colorHex === '#ffff' && 'stroke-black',
						)}
						viewBox='0 0 10 8'
						fill='none'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1, ease: 'easeOut' }}
					>
						<motion.path
							d='M1 4L3.5 6.5L9 1'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							exit={{ pathLength: 0 }}
							transition={{ duration: 0.2, ease: 'easeOut' }}
						/>
					</motion.svg>
				)}
			</AnimatePresence>
		</button>
	)
}
