import { Cart } from '@/@types/cart'
import { CartItem } from '@/@types/cart-item'
import { updateCartItemQuantity } from '@/actions/cart'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface UpdateCartItemQuantityParams {
	action: 'increment' | 'decrement'
	cartItemId: number
}

export const useUpdateCartItemQuantity = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			action,
			cartItemId,
		}: UpdateCartItemQuantityParams) => {
			return updateCartItemQuantity({ action, cartItemId })
		},

		onMutate: async ({ action, cartItemId }) => {
			await queryClient.cancelQueries({ queryKey: ['cart'] })

			const previousCart = queryClient.getQueryData<Cart>(['cart'])

			queryClient.setQueryData(['cart'], (old: Cart) => {
				if (!old) return old

				const updatedItems = old.items.map((item: CartItem) => {
					if (item.id === cartItemId) {
						const newQuantity =
							action === 'increment'
								? item.quantity + 1
								: Math.max(item.quantity - 1, 1)
						return { ...item, quantity: newQuantity }
					}
					return item
				})

				const totalPrice = updatedItems.reduce(
					(sum: number, item: CartItem) =>
						sum + item.product.price * item.quantity,
					0
				)

				return { ...old, items: updatedItems, totalPrice }
			})

			return { previousCart }
		},

		onError: (_error, _vars, context) => {
			if (context?.previousCart) {
				queryClient.setQueryData(['cart'], context.previousCart)
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
	})
}
