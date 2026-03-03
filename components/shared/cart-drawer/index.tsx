'use client'

import { Cart } from '@/@types/cart-types'
import { CartDrawerItem } from '@/components/shared/cart-drawer/cart-drawer-item'
import { cn } from '@/lib/utils'
import { Calligraph } from 'calligraph'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useState } from 'react'
import { Button } from '../../ui/button'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../../ui/drawer'
import { Title } from '../../ui/title'

import { useCreateCheckoutSession } from '@/hooks/tanstack/stripe-mutations'
import useIsMobile from '@/hooks/use-is-mobile'
import monokleEmoji from '@/public/emojis/monokle.json'
import Lottie from 'lottie-react'

interface Props {
	cart?: Cart
	className?: string
}

export const CartDrawer = ({
	cart,
	className,
	children,
}: PropsWithChildren<Props>) => {
	const { isMobile } = useIsMobile()
	const [open, setOpen] = useState(false)
	const router = useRouter()

	const { mutateAsync, isPending } = useCreateCheckoutSession()

	const handleClose = () => {
		setOpen(false)
	}

	const handleCheckout = async () => {
		if (!cart) return

		try {
			const sessionUrl = await mutateAsync(cart)
			router.push(sessionUrl!)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}
			direction={isMobile ? 'bottom' : 'right'}
		>
			<DrawerTrigger>{children}</DrawerTrigger>
			<DrawerContent
				className={cn(className, 'md:!w-[420px] h-[80%] md:h-full !max-w-none')}
			>
				<DrawerHeader>
					<DrawerTitle className='text-xl font-bold uppercase'>bag</DrawerTitle>
				</DrawerHeader>
				{cart && cart?.items.length === 0 && (
					<div className='flex flex-col  h-full justify-center items-center'>
						<Lottie
							className='size-[120px]'
							animationData={monokleEmoji}
							loop
							autoplay
						/>
						<Title size='sm2' className='font-bold text-center uppercase mb-1'>
							YOUR SHOPPING BAG IS EMPTY
						</Title>
					</div>
				)}

				{cart && cart.items?.length > 0 && (
					<>
						<ul className='flex flex-1 overflow-x-hidden overflow-y-auto flex-col gap-9'>
							{cart?.items?.map(item => (
								<li key={item.id}>
									<CartDrawerItem cartItem={item} />
								</li>
							))}
						</ul>
					</>
				)}

				<div className='-mx-7 p-5 bg-white'>
					<div className='flex gap-6 flex-col'>
						<div className='flex flex-col gap-2'>
							<div className='flex justify-between text-sm items-center'>
								<p className='flex items-center font-medium gap-1'>Total</p>
								<p className='font-semibold'>
									<Calligraph variant='number'>
										{`${cart?.totalPrice} USD`}
									</Calligraph>
								</p>
							</div>
							<div className='flex justify-between text-sm items-center'>
								<p className='flex items-center font-medium gap-1'>Shipping</p>
								<p className='font-semibold'>Calculated at checkout</p>
							</div>
						</div>

						<Button
							onClick={handleCheckout}
							isLoading={isPending}
							disabled={cart?.items.length === 0}
							className='w-full uppercase'
							size={'xl'}
						>
							Go to Checkout
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
