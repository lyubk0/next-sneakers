import {
	addToCart,
	removeCartItem,
	updateCartItemQuantity,
} from '@/actions/cart'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useRemoveCartItem = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (cartItemId: number) => removeCartItem(cartItemId),

		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
	})
}

export const useAddToCart = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: addToCart,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
	})
}

export interface UpdateCartItemQuantityParams {
	action: 'increment' | 'decrement'
	cartItemId: number
}

export const useUpdateCartItemQuantity = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateCartItemQuantity,

		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
	})
}
