import { Cart } from '@/@types/cart'
import { Button } from '@/components/ui/button'
import { useCreateOrder } from '@/hooks/queries/orders/use-create-order'
import { useCreateCheckoutSession } from '@/hooks/stripe/use-create-checkout-session'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
	personalInfoSchema,
	PersonalInfoValues,
} from '../schemas/personal-info-form-schema'
import { ShippingAddressSection } from './shipping-address-section'
import { UserInfoSection } from './user-info-section'

interface Props {
	cart?: Cart
	className?: string
}

export const PersonalInfoForm = ({ cart, className }: Props) => {
	const router = useRouter()

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

	const createCheckoutSession = useCreateCheckoutSession()
	const createOrder = useCreateOrder()

	const onSubmit = async (data: PersonalInfoValues) => {
		if (!cart) return
		console.log('Form Data:', data)

		const checkoutSessionUrl = await createCheckoutSession.mutateAsync(cart)

		if (!checkoutSessionUrl)
			return toast.error('Не вдалося створити сесію оплати. Спробуйте ще раз.')

		const createdOrder = await createOrder.mutateAsync({
			cart,
			checkoutSessionUrl,
		})
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
				<Button type='submit'>Submit</Button>
			</form>
		</FormProvider>
	)
}
