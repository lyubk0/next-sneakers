import { removeCartItem } from '@/actions/cart'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useRemoveCartItem = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (cartItemId: number) => removeCartItem(cartItemId),

		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['cart'] })
		},

		onError: () => {
			toast.error('Не вдалося видалити товар з кошика')
		},
	})
}
