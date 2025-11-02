'use client'

import { Container } from '@/components/shared/container'
import { PageTitle } from '@/components/shared/page-title'
import { CartItemsList } from '@/components/shared/pages/cart-page/cart-items-list'
import { WhiteBlock } from '@/components/shared/white-block'
import { Button } from '@/components/ui/button'
import {
	Stepper,
	StepperContent,
	StepperIndicator,
	StepperItem,
	StepperNav,
	StepperPanel,
	StepperSeparator,
	StepperTrigger,
} from '@/components/ui/stepper'
import { useCart } from '@/hooks/queries/cart/use-cart'
import { ShoppingCartIcon } from '@phosphor-icons/react'
import { useState } from 'react'

interface Props {
	className?: string
}

const steps = [1, 2, 3, 4]

export const CartContainer = ({ className }: Props) => {
	const [currentStep, setCurrentStep] = useState(1)
	const { data: cart, isPending } = useCart()
	return (
		<Container>
			<PageTitle title='Корзина' Icon={ShoppingCartIcon} />
			<div className='flex gap-12 justify-between w-full'>
				<WhiteBlock className='!p-0'>
					<Stepper
						className='border-b border-muted'
						value={currentStep}
						onValueChange={setCurrentStep}
						defaultValue={steps[0]}
					>
						<StepperNav className='p-6 border-b w-full border-muted'>
							<div className='w-[400px] flex justify-between'>
								{steps.map(step => (
									<StepperItem key={step} step={step}>
										<StepperTrigger>
											<StepperIndicator className='data-[state=completed]:bg-primary data-[state=completed]:text-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-500'>
												{step}
											</StepperIndicator>
										</StepperTrigger>
										{steps.length > step && (
											<StepperSeparator className='group-data-[state=completed]/step:bg-primary' />
										)}
									</StepperItem>
								))}
							</div>
						</StepperNav>

						<StepperPanel>
							{steps.map(step => (
								<StepperContent className='w-full p-6' key={step} value={step}>
									{isPending && <p>loading...</p>}
									{step === 1 && cart?.items && (
										<CartItemsList cartItems={cart?.items} />
									)}
								</StepperContent>
							))}
						</StepperPanel>
					</Stepper>
					<div className='p-6 w-full flex justify-end gap-3'>
						<Button size={'lg'} variant={'secondary'}>
							Почати спочатку
						</Button>
						<Button size={'lg'}>Далі</Button>
					</div>
				</WhiteBlock>

				<WhiteBlock className='!p-0 h-max !w-[40%]'>
					<div className='p-6  border-b border-muted flex flex-col'>
						<p>Всього:</p>
						<p className='text-[20px] font-bold'>{cart?.totalPrice} грн</p>
					</div>
					<div className='p-6 flex gap-2 flex-col'>
						<div className='flex justify-between'>
							<p>Ціна товарів:</p>
							<p className='font-medium'>{cart?.totalPrice} грн</p>
						</div>
						<div className='flex justify-between'>
							<p>Доставка:</p>
							<p className='font-medium'>50 грн</p>
						</div>
					</div>
				</WhiteBlock>
			</div>
		</Container>
	)
}
