import { createCart } from '@/actions/cart'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useCreateCart = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
		onError: () => {
			toast.error('Не вдалося створити кошик')
		},
	})
}
