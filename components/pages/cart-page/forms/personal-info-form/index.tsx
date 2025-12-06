import { Cart } from '@/@types/cart'
import { useCreateInvoice } from '@/hooks/queries/monobank/use-create-invoice'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
	personalInfoSchema,
	PersonalInfoValues,
} from '../schemas/personal-info-form-schema'
import { ShippingAddressSection } from './shipping-address-section'
import { UserInfoSection } from './user-info-section'

interface Props {
	cart?: Cart
	setMonobankInvoiceUrl: (url: string) => void
	className?: string
}

export const PersonalInfoForm = ({
	cart,
	setMonobankInvoiceUrl,
	className,
}: Props) => {
	const form = useForm<PersonalInfoValues>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			middleName: '',
			phone: '',
			city: '',
			warehouse: '',
		},
	})

	const { handleSubmit } = form

	const createInvoiceMutation = useCreateInvoice()

	const onSubmit = async (data: PersonalInfoValues) => {
		if (!cart) return
		const response = await createInvoiceMutation.mutateAsync(cart)
		console.log('Invoice URL:', response)
	}

	return (
		<FormProvider {...form}>
			<form
				id='personal-info-form'
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
				<UserInfoSection />

				<ShippingAddressSection />
			</form>
		</FormProvider>
	)
}
