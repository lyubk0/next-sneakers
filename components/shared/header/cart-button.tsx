'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useCart } from '@/hooks/queries/cart/use-cart'
import { cn } from '@/lib/utils'
import { ShoppingBag01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { CartDrawer } from '../cart-drawer'

interface Props {
	className?: string
}

export const CartButton = ({ className }: Props) => {
	const { data: cart, isPending, error } = useCart()
	console.log('Cart', cart)
	const itemsCount =
		cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0

	return (
		<CartDrawer cart={cart}>
			<div
				role='button'
				className={cn(
					className,
					'flex items-center group gap-2 select-none ease-out text-foreground duration-150 active:scale-[0.97] hover:text-primary cursor-pointer relative'
				)}
			>
				{isPending ? (
					<Skeleton className='w-[100px] h-5 rounded-full' />
				) : (
					<div className='flex gap-2 items-center'>
						<HugeiconsIcon icon={ShoppingBag01Icon} strokeWidth={2} size={20} />
					</div>
				)}
			</div>
		</CartDrawer>
	)
}
