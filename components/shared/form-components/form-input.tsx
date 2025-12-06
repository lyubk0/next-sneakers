import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { ErrorText } from '../error-text'

interface Props extends InputProps {
	name: string
	className?: string
}

export const FormInput = ({ className, name, ...props }: Props) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()
	const errorText = errors[name]?.message as string | undefined
	return (
		<div className='w-full flex-1'>
			<Input
				className={cn(
					errorText && 'focus-visible:ring-red-400 selection:bg-red-400 ',
					className
				)}
				{...props}
				{...register(name)}
			/>

			{errorText && <ErrorText className='mt-2'>{errorText}</ErrorText>}
		</div>
	)
}
