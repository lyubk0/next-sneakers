'use client'

import { Cart } from '@/@types/cart.types'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useState } from 'react'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../../ui/drawer'

import { useCreateCheckoutSession } from '@/hooks/tanstack/stripe.mutations'
import useIsMobile from '@/hooks/use-is-mobile.hooks'
import { CartDrawerItemsList } from './cart-drawer-items-list'
import { CartDrawerSummary } from './cart-drawer-summary'
import { EmptyCartState } from './empty-cart-state'

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
				{cart && cart?.items.length === 0 && <EmptyCartState />}

				{cart && cart.items?.length > 0 && (
					<CartDrawerItemsList items={cart.items} />
				)}

				<CartDrawerSummary
					cart={cart}
					isLoading={isPending}
					onCheckout={handleCheckout}
				/>
			</DrawerContent>
		</Drawer>
	)
}
