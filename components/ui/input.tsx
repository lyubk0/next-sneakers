'use client'

import { ErrorText } from '@/components/ui/error-text'
import { cn } from '@/lib/utils'
import { ViewIcon, ViewOffSlashIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import type * as React from 'react'
import { useState } from 'react'

export interface InputProps extends React.ComponentProps<'input'> {
	containerClassName?: string
	label?: string
	required?: boolean
	errorText?: string
	leftIcon?: IconSvgElement
	rightIcon?: IconSvgElement
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
	...props
}: InputProps) {
	const [showPassword, setShowPassword] = useState(false)

	const haveLeftElement = LeftIcon
	const haveRightElement = RightIcon
	const isPasswordType = type === 'password'

	const inputId = id ?? name
	const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type

	return (
		<div className={cn('flex flex-col', containerClassName)}>
			{label && (
				<label htmlFor={inputId} className='mb-2 block text-sm font-medium'>
					{label}
					{required && <span className='ml-0.5 text-red-500'>*</span>}
				</label>
			)}

			<div className='relative'>
				{haveLeftElement && (
					<div className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex gap-2 text-card-muted-foreground'>
						<HugeiconsIcon strokeWidth={2} icon={LeftIcon} size={20} />
					</div>
				)}

				<input
					id={inputId}
					name={name}
					type={inputType}
					aria-invalid={!!errorText}
					autoComplete='off'
					data-slot='input'
					className={cn(
						'file:text-foreground placeholder:text-muted-foreground selection:text-primary-foreground font-medium dark:bg-input/30 h-[48px] w-full rounded-2xl bg-input px-4 py-3 text-base outline-none transition-[color,box-shadow]',
						errorText
							? 'selection:bg-red-500 focus-visible:ring-red-500 focus-visible:ring-2'
							: 'selection:bg-primary focus-visible:ring-primary/95 focus-visible:ring-2',
						haveLeftElement && 'pl-11',
						(haveRightElement || isPasswordType) && 'pr-11',
						'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
						className,
					)}
					{...props}
				/>

				{isPasswordType ? (
					<button
						type='button'
						onClick={() => setShowPassword(prev => !prev)}
						className='absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground hover:text-foreground transition-colors'
					>
						<HugeiconsIcon
							strokeWidth={2}
							icon={showPassword ? ViewOffSlashIcon : ViewIcon}
							size={20}
						/>
					</button>
				) : haveRightElement ? (
					<div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground'>
						<HugeiconsIcon strokeWidth={2} icon={RightIcon} size={20} />
					</div>
				) : null}
			</div>

			{errorText && <ErrorText className='mt-2'>{errorText}</ErrorText>}
		</div>
	)
}

export { Input }
