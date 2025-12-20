import { Cart } from '@/@types/cart'
import { createCheckoutSession } from '@/actions/stripe'
import { useMutation } from '@tanstack/react-query'

export const useCreateCheckoutSession = () => {
	return useMutation({
		mutationFn: async (cart: Cart) => await createCheckoutSession(cart),
	})
}
