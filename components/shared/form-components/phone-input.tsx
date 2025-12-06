'use client'

import { ErrorText } from '@/components/shared/error-text'
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
				leftImage='/flag-ukraine.svg'
				leftText='+380'
				className={cn(
					'pl-21 w-full',
					errorText && 'focus-visible:ring-red-400 selection:bg-red-400 ',
					className
				)}
				type='text'
				placeholder='__ ___ __ __'
				{...registerWithMask(name, '99 999 99 99')}
				{...props}
			/>
			{errorText && <ErrorText className='mt-2'>{errorText}</ErrorText>}
		</div>
	)
}
