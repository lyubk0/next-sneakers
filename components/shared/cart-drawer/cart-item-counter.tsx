'use client'

import { useRemoveCartItem } from '@/hooks/queries/cart/use-remove-cart-item'
import { useUpdateCartItemQuantity } from '@/hooks/queries/cart/use-update-cart-item-quantity'
import { cn } from '@/lib/utils'
import { MinusIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { useState } from 'react'

interface Props {
	cartItemId: number
	quantity: number
	className?: string
}

export const CartItemCounter = ({ cartItemId, quantity, className }: Props) => {
	const [disabled, setDisabled] = useState(false)

	const { mutateAsync: updateCartItemQuantity } = useUpdateCartItemQuantity()

	const { mutateAsync: removeCartItem, isPending: isRemoving } =
		useRemoveCartItem()

	const handleUpdateQuantity = async (action: 'increment' | 'decrement') => {
		setDisabled(true)

		await new Promise(resolve =>
			setTimeout(() => {
				setDisabled(false)

				resolve(true)
			}, 130)
		)
		await updateCartItemQuantity({
			action,
			cartItemId,
		})
	}

	const handleRemove = async () => {
		await removeCartItem(cartItemId)
	}

	return (
		<div className='rounded-[12px] gap-3 justify-center  bg-muted flex items-center px-2 py-1 w-max'>
			{quantity === 1 && (
				<button
					onClick={handleRemove}
					className={cn(
						disabled || (isRemoving && 'opacity-50 pointer-events-none'),
						'text-red-500 cursor-pointer'
					)}
				>
					<TrashIcon size={18} weight='duotone' />
				</button>
			)}
			{quantity > 1 && (
				<button
					className={cn(
						(disabled || isRemoving) && 'opacity-50 pointer-events-none',
						'text-muted-foreground/65 cursor-pointer hover:text-primary'
					)}
					onClick={() => handleUpdateQuantity('decrement')}
				>
					<MinusIcon size={18} weight='bold' />
				</button>
			)}
			{quantity}
			<button
				onClick={() => handleUpdateQuantity('increment')}
				className={cn(
					(disabled || isRemoving) && 'opacity-50 pointer-events-none',
					'text-muted-foreground/65 cursor-pointer hover:text-primary'
				)}
			>
				<PlusIcon size={18} weight='bold' />
			</button>
		</div>
	)
}
