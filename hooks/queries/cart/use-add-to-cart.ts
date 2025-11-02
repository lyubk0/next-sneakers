import { addToCart } from '@/actions/cart'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

export const useAddToCart = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: addToCart,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
		onError: () => {
			toast.error('Не вдалося додати товар до кошика')
		},
	})
}
