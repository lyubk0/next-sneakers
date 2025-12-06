'use client'

import { Container } from '@/components/shared/container'
import { Title } from '@/components/shared/title'
import { WhiteBlock } from '@/components/shared/white-block'
import { useCart } from '@/hooks/queries/cart/use-cart'
import { TrashIcon } from '@phosphor-icons/react'
import { CartItemsList } from './cart-items-list'
import { CheckoutSummary } from './checkout-summary'
import { PersonalInfoForm } from './forms/personal-info-form'

interface Props {
	className?: string
}

export const CheckoutContainer = ({ className }: Props) => {
	const { data: cart, isPending } = useCart()
	return (
		<Container>
			<div className='flex gap-12 justify-between w-full'>
				<div className='flex w-full gap-10 flex-col'>
					<WhiteBlock className='!p-0 w-full border-shadow'>
						<div className='p-6 flex items-center justify-between border-b border-border'>
							<Title className='font-semibold'>1. Корзина</Title>

							<button className='flex cursor-pointer font-medium hover:text-foreground duration-100 gap-2 items-center text-card-muted-foreground text-sm'>
								{' '}
								<TrashIcon size={16} weight='duotone' />
								Очистити корзину
							</button>
						</div>
						{isPending && <p>Завантаження...</p>}
						<CartItemsList className='p-6' cartItems={cart?.items} />
					</WhiteBlock>
					<WhiteBlock className='!p-0 w-full border-shadow'>
						<div className='p-6 flex items-center justify-between border-b border-border'>
							<Title className='font-semibold'>2. Персональна інформація</Title>
						</div>
						<div className='p-6'>
							<PersonalInfoForm />
						</div>
					</WhiteBlock>
				</div>

				<CheckoutSummary cart={cart} />
			</div>
		</Container>
	)
}
