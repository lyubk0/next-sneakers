'use client'

import { Category } from '@/@types/category'
import { motion } from 'motion/react'

const transitionProps = {
	type: 'spring' as const,
	stiffness: 500,
	damping: 30,
	mass: 0.5,
}

export interface CategorySelectorProps {
	items: Category[]
	value: string
	onChange: (next: string) => void
	className?: string
}

export const CategorySelector = ({
	items,
	value,
	onChange,
	className = '',
}: CategorySelectorProps) => {
	const toggle = (item: string) => {
		// Не позволяем отменить выбор - просто переключаем на другую категорию
		if (value !== item) {
			onChange(item)
		}
	}

	return (
		<motion.div
			className={`flex flex-wrap gap-3 overflow-visible ${className}`}
			layout
			transition={transitionProps}
		>
			{items.map(item => {
				const isSelected = value === item.name
				return (
					<motion.button
						style={{
							background: isSelected ? 'oklch(0.8063 0.1648 129.56)' : '',
							transition: 'background 0.07s ease-out',
						}}
						key={item.id}
						onClick={() => toggle(item.name)}
						layout
						whileTap={{ scale: 0.97 }}
						initial={false}
						transition={{
							...transitionProps,
						}}
						className={`inline-flex cursor-pointer items-center px-4 py-2 rounded-xl text-base bg-muted duration-150 font-medium whitespace-nowrap overflow-hidden   ${
							isSelected ? 'text-white border-transparent' : 'text-foreground'
						}`}
					>
						<motion.div
							className='relative flex items-center'
							animate={{
								width: isSelected ? 'auto' : '100%',
								// paddingRight: isSelected ? '1.5rem' : '0',
							}}
							transition={{
								ease: [0.175, 0.885, 0.32, 1.275],
								duration: 0.3,
							}}
						>
							<span>{item.name}</span>

							{/* <AnimatePresence mode='popLayout'>
								{isSelected && (
									<motion.span
										initial={{ scale: 0.5, opacity: 0 }}
										animate={{
											scale: 1,
											opacity: 1,
											transition: {
												type: 'spring',
												stiffness: 400,
												damping: 25,
												mass: 0.8,
											},
										}}
										exit={{
											scale: 0.5,
											opacity: 0,
											transition: {
												duration: 0.15,
												ease: 'easeOut',
											},
										}}
										className='absolute right-0'
									>
										<CheckCircleIcon size={18} weight='duotone' />
									</motion.span>
								)}
							</AnimatePresence> */}
						</motion.div>
					</motion.button>
				)
			})}
		</motion.div>
	)
}
