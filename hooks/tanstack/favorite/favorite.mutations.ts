import type { Product } from '@/@types/product.types'
import { toggleFavorite } from '@/actions/favorite.actions'
import { GetAllProductsApiResponse } from '@/app/api/products/route'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { productKeys } from '../product.queries'
import { favoriteKeys } from './favorite.queries'

export const useToggleFavorite = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: toggleFavorite,

		onMutate: async (productId: number) => {
			await queryClient.cancelQueries({ queryKey: productKeys.lists() })

			const previousProducts =
				queryClient.getQueriesData<GetAllProductsApiResponse>({
					queryKey: productKeys.lists(),
				})

			queryClient.setQueriesData<GetAllProductsApiResponse>(
				{ queryKey: productKeys.lists() },
				old => {
					if (!old?.items) return old
					return {
						...old,
						items: old.items.map(p =>
							p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p,
						),
					}
				},
			)

			queryClient.setQueryData<Product>(
				favoriteKeys.isFavorite(productId),
				old => (old ? { ...old, isFavorite: !old.isFavorite } : old),
			)

			return { previousProducts }
		},

		onError: (_, __, context) => {
			context?.previousProducts.forEach(([queryKey, data]) => {
				queryClient.setQueryData(queryKey, data)
			})
			toast.error('Failed to toggle favorite')
		},
	})
}
