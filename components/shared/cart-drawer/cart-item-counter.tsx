'use client'

import { useUpdateCartItemQuantity } from '@/hooks/queries/cart/use-update-cart-item-quantity'
import { cn } from '@/lib/utils'
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

	return (
		<div className='flex items-center gap-2'>
			<button
				className={cn(
					quantity === 1 && 'text-muted-foreground !cursor-not-allowed',
					'cursor-pointer'
				)}
				onClick={() => handleUpdateQuantity('decrement')}
				disabled={disabled}
			>
				<IconMinus size={18} />
			</button>

			<span className='inline-block w-5 text-sm font-semibold text-center'>
				{quantity}
			</span>

			<button
				className='cursor-pointer'
				onClick={() => handleUpdateQuantity('increment')}
				disabled={disabled}
			>
				<IconPlus size={18} />
			</button>
		</div>
	)
}
