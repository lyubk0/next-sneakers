import { Product } from '@/@types/product'
import { toggleFavorite } from '@/actions/favorite'
import { useCategoryParams } from '@/hooks/nuqs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useToggleFavorite = () => {
	const [category] = useCategoryParams()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (productId: number) => {
			return await toggleFavorite(productId)
		},

		onMutate: async (productId: number) => {
			await queryClient.cancelQueries({ queryKey: ['products', category] })

			const previousProducts: Product[] | undefined = queryClient.getQueryData([
				'products',
				category,
			])

			const newProducts = previousProducts?.map(product => {
				if (product.id === productId) {
					return {
						...product,
						isFavorite: !product.isFavorite,
					}
				}

				return product
			})

			queryClient.setQueryData(['products', category], newProducts)

			return { previousProducts }
		},
		onError: (err, _, context) => {
			toast.error('Не вдалося додати товар в обране')
			queryClient.setQueryData(
				['products', category],
				context?.previousProducts
			)
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['products', category] })
		},
	})
}
