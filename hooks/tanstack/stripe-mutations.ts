import { Cart } from '@/@types/cart-types'
import { createCheckoutSession } from '@/actions/stripe'
import { useMutation } from '@tanstack/react-query'

export const useCreateCheckoutSession = () => {
	return useMutation({
		mutationFn: async (cart: Cart) => await createCheckoutSession(cart),
	})
}
