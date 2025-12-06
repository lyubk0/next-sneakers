import { Cart } from '@/@types/cart'
import { createInvoice } from '@/actions/stripe'
import { useMutation } from '@tanstack/react-query'

export const useCreateInvoice = () => {
	return useMutation({
		mutationFn: async (cartData: Cart) => {
			return await createInvoice(cartData)
		},
	})
}
