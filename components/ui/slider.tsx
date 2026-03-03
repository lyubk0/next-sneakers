'use client'

import { cn } from '@/lib/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
	const _values = React.useMemo(
		() =>
			Array.isArray(value)
				? value
				: Array.isArray(defaultValue)
					? defaultValue
					: [min, max],
		[value, defaultValue, min, max],
	)

	return (
		<SliderPrimitive.Root
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			className={cn(
				'relative flex w-full touch-none items-center select-none',
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track className='bg-muted relative grow overflow-hidden rounded-full h-1 w-full'>
				<SliderPrimitive.Range className='bg-primary absolute h-full' />
			</SliderPrimitive.Track>

			{Array.from({ length: _values.length }, (_, index) => {
				return (
					<SliderPrimitive.Thumb
						key={index}
						className='flex items-center justify-center size-4 rounded-full bg-black will-change-transform'
					>
						<div
							className={cn(
								'rounded-full bg-white size-1.5 transition-transform duration-150 ease-out',
							)}
						/>
					</SliderPrimitive.Thumb>
				)
			})}
		</SliderPrimitive.Root>
	)
}

export { Slider }
