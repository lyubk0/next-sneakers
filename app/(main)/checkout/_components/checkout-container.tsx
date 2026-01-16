'use client'

import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'
import { Stepper } from '@/components/ui/stepper'
import { Title } from '@/components/ui/title'
import { useCart } from '@/hooks/queries/cart/use-cart'
import { useCreateOrder } from '@/hooks/queries/orders/use-create-order'
import { useCreateCheckoutSession } from '@/hooks/stripe/use-create-checkout-session'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	CreditCardIcon,
	ShoppingBag01Icon,
	UserIcon,
} from '@hugeicons/core-free-icons'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CartItemsList } from './cart-items-list'
import { PersonalInfoForm } from './forms/personal-info-form'
import {
	personalInfoSchema,
	PersonalInfoValues,
} from './forms/schemas/personal-info-form-schema'

interface Props {
	className?: string
}

export const CheckoutContainer = ({ className }: Props) => {
	const router = useRouter()
	const [step, setStep] = useState(1)

	const form = useForm<PersonalInfoValues>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			phone: '',
			city: '',
			warehouse: '',
		},
	})

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

		router.replace(checkoutSessionUrl)
	}

	const handleChangeStep = (newStep: number) => {
		if (newStep < 1 || newStep > 3) return
		setStep(newStep)
	}

	const { data: cart, isPending } = useCart()
	return (
		<FormProvider {...form}>
			<Container className='flex gap-20 max-w-3xl'>
				<div className='flex w-full flex-col'>
					<Title className='font-extrabold  mb-5' size='md'>
						CHECKOUT
					</Title>
					<div className='max-w-[350px] mb-10'>
						<Stepper
							currentStep={step}
							steps={[
								{ id: 1, Icon: ShoppingBag01Icon },
								{ id: 2, Icon: UserIcon },
								{ id: 3, Icon: CreditCardIcon },
							]}
						/>
					</div>
					{step === 1 && <CartItemsList cartItems={cart?.items} />}
					{step === 2 && <PersonalInfoForm cart={cart} />}

					<div className='mt-10 flex gap-4 justify-end'>
						<Button
							variant={'secondary'}
							size={'lg'}
							onClick={() => handleChangeStep(step - 1)}
						>
							Назад
						</Button>
						{step === 2 ? (
							<Button
								onClick={form.handleSubmit(onSubmit)}
								size={'lg'}
								type='submit'
							>
								Перейти до оплати
							</Button>
						) : (
							<Button size={'lg'} onClick={() => handleChangeStep(step + 1)}>
								Далі
							</Button>
						)}
					</div>
				</div>
			</Container>
		</FormProvider>
	)
}
