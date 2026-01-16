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
					label='First Name'
					required
					placeholder='Your first name'
					name='firstName'
				/>
				<FormInput
					containerClassName='flex-1'
					label='Last Name'
					required
					placeholder='Your last name'
					name='lastName'
				/>
			</div>
			<div>
				<PhoneInput
					containerClassName='flex-1'
					label='Phone'
					required
					placeholder='00 000 00 00'
					name='phone'
				/>
			</div>
		</div>
	)
}
