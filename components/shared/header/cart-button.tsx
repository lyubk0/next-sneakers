'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useCart } from '@/hooks/queries/cart/use-cart'
import { cn } from '@/lib/utils'
import { ShoppingCartIcon } from '@phosphor-icons/react'
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
					'flex items-center group gap-2 select-none ease-out text-muted-foreground duration-150 active:scale-[0.97] hover:text-primary cursor-pointer relative'
				)}
			>
				{isPending ? (
					<Skeleton className='w-[100px] h-5 rounded-full' />
				) : (
					<div className='flex gap-2 items-center'>
						{itemsCount > 0 && (
							<span
								className={cn(
									'text-muted-foreground group-hover:text-primary duration-150 ease-out font-medium ',
									itemsCount > 9 && ' -right-2.5'
								)}
							>
								{itemsCount > 9 ? '9+' : itemsCount}
							</span>
						)}
						{itemsCount > 0 && <div className='h-[25] w-[1px] bg-muted'></div>}
						<ShoppingCartIcon size={22} weight='duotone' />
					</div>
				)}
			</div>
		</CartDrawer>
	)
}
