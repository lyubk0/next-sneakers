import { updateCartItem } from '@/actions/cart'
import { useMutation } from '@tanstack/react-query'

export const useUpdateCartItem = () => {
	return useMutation({
		mutationFn: updateCartItem,
	})
}
