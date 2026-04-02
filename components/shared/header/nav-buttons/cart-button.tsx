'use client'

import { CartDrawer } from '@/components/shared/cart-drawer/cart-drawer'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useCart } from '@/hooks/tanstack/cart/cart.queries'
import { cn } from '@/lib/utils'
import { ShoppingBag01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface Props {
	className?: string
}

export const CartButton = ({ className }: Props) => {
	const { data: cart, isPending, error } = useCart()

	const itemsCount =
		cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0

	return (
		<CartDrawer cart={cart}>
			<div
				role='button'
				className={cn(
					className,
					'flex items-center group gap-2 select-none ease-out text-foreground duration-150 active:scale-[0.97] hover:text-primary cursor-pointer relative',
				)}
			>
				{isPending ? (
					<Skeleton className='w-[20px] h-5 rounded-full' />
				) : (
					<div className='flex items-center gap-2'>
						{itemsCount > 0 && (
							<Badge className='-top-1.5 -right-1.5' count={itemsCount} />
						)}
						<HugeiconsIcon icon={ShoppingBag01Icon} strokeWidth={2} size={20} />
					</div>
				)}
			</div>
		</CartDrawer>
	)
}
