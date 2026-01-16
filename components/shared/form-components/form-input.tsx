import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'

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
				id={name}
				className={cn(className)}
				errorText={errorText}
				{...register(name)}
				{...props}
			/>
		</div>
	)
}
