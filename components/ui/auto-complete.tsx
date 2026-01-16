'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Input, InputProps } from './input'
import { Popover, PopoverAnchor, PopoverContent } from './popover'

interface Props extends Omit<InputProps, 'onChange' | 'value'> {
	items: { label: string; value: string }[]
	value?: string
	onChange?: (value: string) => void
	className?: string
}

export const AutoComplete = ({
	items,
	value,
	onChange,
	className,
	...props
}: Props) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={cn(className)}>
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverAnchor asChild>
					<Input
						{...props}
						value={value ?? ''}
						onFocus={() => setIsOpen(true)}
						onChange={e => {
							onChange?.(e.target.value)
							setIsOpen(true)
						}}
					/>
				</PopoverAnchor>
				<PopoverContent
					className='w-[var(--radix-popover-trigger-width)]'
					onOpenAutoFocus={e => e.preventDefault()}
				>
					<div className='flex flex-col gap-1.5'>
						{items.map(item => (
							<div
								key={item.value}
								role='option'
								onMouseDown={() => {
									onChange?.(item.label)
									setIsOpen(false)
								}}
								className={cn(
									'cursor-pointer font-inter font-medium text-[#545454] text-sm bg-white hover:text-foreground duration-150 ease-out p-2.5 px-3 rounded-[10px]',
									item.label === value && '!text-foreground'
								)}
							>
								{item.label}
							</div>
						))}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}
