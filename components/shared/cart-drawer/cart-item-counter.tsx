'use client'

import { Button } from '@/components/ui/button'
import { useRemoveCartItem } from '@/hooks/queries/cart/use-remove-cart-item'
import { useUpdateCartItemQuantity } from '@/hooks/queries/cart/use-update-cart-item-quantity'
import { IconMinus, IconPlus } from '@tabler/icons-react'
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
		if (quantity === 1 && action === 'decrement') return
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
		<div className='flex p-1 bg-muted rounded-2xl items-center gap-3'>
			<Button
				className='bg-white rounded-xl hover:bg-white'
				onClick={() => handleUpdateQuantity('decrement')}
				variant={'secondary'}
				size={'icon'}
			>
				<IconMinus />
			</Button>
			<span className='inline-block w-5 text-center'>{quantity}</span>
			<Button
				className='rounded-xl'
				onClick={() => handleUpdateQuantity('increment')}
				size={'icon'}
			>
				<IconPlus />
			</Button>
		</div>
	)
}
