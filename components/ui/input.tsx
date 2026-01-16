import { ErrorText } from '@/components/ui/error-text'
import { cn } from '@/lib/utils'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import Image from 'next/image'
import type * as React from 'react'

export interface InputProps extends React.ComponentProps<'input'> {
	containerClassName?: string
	label?: string
	required?: boolean
	errorText?: string
	leftIcon?: IconSvgElement
	rightIcon?: IconSvgElement
	leftImage?: string
	rightImage?: string
	leftText?: string
	rightText?: string
}

function Input({
	className,
	containerClassName,
	type,
	label,
	required,
	errorText,
	name,
	id,
	leftIcon: LeftIcon,
	rightIcon: RightIcon,
	leftImage,
	rightImage,
	leftText,
	rightText,
	...props
}: InputProps) {
	const haveLeftElement = LeftIcon || leftImage || leftText
	const haveRightElement = RightIcon || rightImage || rightText

	const inputId = id ?? name

	return (
		<div className={cn('flex flex-col', containerClassName)}>
			{label && (
				<label htmlFor={inputId} className='mb-2 block text-sm font-medium'>
					{label}
					{required && <span className='ml-0.5 text-red-500'>*</span>}
				</label>
			)}

			<div className='relative'>
				{/* Left element */}
				{haveLeftElement && (
					<div className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex gap-2 text-card-muted-foreground'>
						{LeftIcon ? (
							<HugeiconsIcon strokeWidth={2} icon={LeftIcon} size={20} />
						) : leftImage ? (
							<Image src={leftImage} width={20} height={20} alt='left icon' />
						) : null}

						{leftText && (
							<span className='font-medium text-foreground'>{leftText}</span>
						)}
					</div>
				)}

				{/* Input */}
				<input
					id={inputId}
					name={name}
					type={type}
					aria-invalid={!!errorText}
					autoComplete='off'
					data-slot='input'
					className={cn(
						'file:text-foreground placeholder:text-muted-foreground selection:text-primary-foreground font-medium dark:bg-input/30 h-[48px] w-full rounded-2xl bg-input px-4 py-3 text-base outline-none transition-[color,box-shadow]',
						errorText
							? 'selection:bg-red-500 focus-visible:ring-red-500 focus-visible:ring-2'
							: 'selection:bg-primary focus-visible:ring-primary/95 focus-visible:ring-2',
						haveLeftElement && 'pl-11',
						haveRightElement && 'pr-11',
						'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
						className
					)}
					{...props}
				/>

				{/* Right element */}
				{haveRightElement && (
					<div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground'>
						{rightText && <span className='text-foreground'>{rightText}</span>}
						{RightIcon ? (
							<HugeiconsIcon strokeWidth={2} icon={RightIcon} size={20} />
						) : rightImage ? (
							<Image
								src={rightImage}
								width={20}
								height={20}
								className='ml-1'
								alt='right icon'
							/>
						) : null}
					</div>
				)}
			</div>

			{errorText && <ErrorText className='mt-2'>{errorText}</ErrorText>}
		</div>
	)
}

export { Input }
