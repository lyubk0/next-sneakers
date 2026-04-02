import { Cart } from '@/@types/cart.types'
import { createCheckoutSession } from '@/actions/stripe.actions'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useCreateCheckoutSession = () => {
	return useMutation({
		mutationFn: async (cart: Cart) => {
			await createCheckoutSession(cart)
		},
		onError: () => {
			toast.error("Can't create checkout for you right now")
		},
	})
}
