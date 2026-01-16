'use client'

import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'

interface Props extends InputProps {
	name: string
	className?: string
}

export const PhoneInput = ({ name, className, ...props }: Props) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const errorText = errors[name]?.message as string | undefined

	const registerWithMask = useHookFormMask(register)

	return (
		<div className={cn(className, 'relative')}>
			<Input
				leftText='+380'
				leftImage='/flag-ukraine.svg'
				className={cn('pl-21 w-full', className)}
				errorText={errorText}
				type='text'
				placeholder='__ ___ __ __'
				{...registerWithMask(name, '99 999 99 99')}
				{...props}
			/>
		</div>
	)
}
