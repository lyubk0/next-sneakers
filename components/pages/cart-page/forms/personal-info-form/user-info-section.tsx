import { FormInput } from '@/components/shared/form-components/form-input'
import { PhoneInput } from '@/components/shared/form-components/phone-input'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const UserInfoSection = ({ className }: Props) => {
	return (
		<div className={cn('w-full flex flex-col gap-4', className)}>
			<div className='flex gap-4'>
				<FormInput
					containerClassName='flex-1'
					placeholder="Ім'я"
					name='firstName'
				/>
				<FormInput
					containerClassName='flex-1'
					placeholder='Фамілія'
					name='lastName'
				/>
			</div>
			<div className='flex gap-4'>
				<FormInput
					containerClassName='flex-1'
					placeholder='По батькові'
					name='middleName'
				/>
				<PhoneInput className='flex-1' name='phone' />
			</div>
		</div>
	)
}
