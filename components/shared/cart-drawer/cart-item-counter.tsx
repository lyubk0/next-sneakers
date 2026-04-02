'use client'

import { useUpdateCartItemQuantity } from '@/hooks/tanstack/cart/cart.mutations'
import { cn } from '@/lib/utils'
import { IconMinus, IconPlus } from '@tabler/icons-react'

interface Props {
	cartItemId: number
	quantity: number
	className?: string
}

export const CartItemCounter = ({ cartItemId, quantity, className }: Props) => {
	const { mutate, isPending, variables } = useUpdateCartItemQuantity()

	const isLoadingThisItem = isPending && variables?.cartItemId === cartItemId

	const handleUpdateQuantity = (action: 'increment' | 'decrement') => {
		if (quantity === 1 && action === 'decrement') return

		mutate({
			action,
			cartItemId,
		})
	}

	return (
		<div className='flex items-center gap-2'>
			<button
				className={cn(
					quantity === 1 && 'text-muted-foreground !cursor-not-allowed',
					'cursor-pointer',
				)}
				onClick={() => handleUpdateQuantity('decrement')}
				disabled={isLoadingThisItem}
			>
				<IconMinus size={18} />
			</button>

			<span className='inline-block w-5 text-sm font-semibold text-center'>
				{quantity}
			</span>

			<button
				className='cursor-pointer'
				onClick={() => handleUpdateQuantity('increment')}
				disabled={isLoadingThisItem}
			>
				<IconPlus size={18} />
			</button>
		</div>
	)
}
