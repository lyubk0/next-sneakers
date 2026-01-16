'use client'

import { Cart } from '@/@types/cart'
import { ShippingAddressSection } from './shipping-address-section'
import { UserInfoSection } from './user-info-section'

interface Props {
	cart?: Cart
	className?: string
}

export const PersonalInfoForm = ({ cart, className }: Props) => {
	return (
		<form className='flex flex-col gap-4'>
			<UserInfoSection />

			<ShippingAddressSection />
		</form>
	)
}
