import { Cart } from '@/@types/cart'
import { createOrder } from '@/actions/order'
import { useMutation } from '@tanstack/react-query'

export const useCreateOrder = () => {
	return useMutation({
		mutationFn: async ({
			cart,
			checkoutSessionUrl,
		}: {
			cart: Cart
			checkoutSessionUrl: string
		}) => await createOrder(cart, checkoutSessionUrl),
	})
}
