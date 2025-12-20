'use client'

import { Container } from '@/components/shared/container'
import { Stepper } from '@/components/shared/stepper'
import { Title } from '@/components/shared/title'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/queries/cart/use-cart'
import {
	IconCreditCard,
	IconShoppingBag,
	IconUserEdit,
} from '@tabler/icons-react'
import { CartItemsList } from './cart-items-list'

interface Props {
	className?: string
}

export const CheckoutContainer = ({ className }: Props) => {
	const { data: cart, isPending } = useCart()
	return (
		<Container className='flex gap-20'>
			<div className='flex flex-col w-[65%]'>
				<Title className='font-bold  mb-5' size='md'>
					CHECKOUT
				</Title>
				<div className='max-w-[350px] mb-10'>
					<Stepper
						currentStep={1}
						steps={[
							{ id: 1, Icon: IconShoppingBag },
							{ id: 2, Icon: IconUserEdit },
							{ id: 3, Icon: IconCreditCard },
						]}
					/>
				</div>
				<CartItemsList cartItems={cart?.items} />
				<div className='mt-10 flex justify-end'>
					<Button size={'lg'}>Next</Button>
				</div>
			</div>

			<div className='flex-1 bg-[#f5f5f5] p-4'>
				<Title className='font-bold mb-5' size='md'>
					Order Summary
				</Title>
			</div>
		</Container>
	)
}
