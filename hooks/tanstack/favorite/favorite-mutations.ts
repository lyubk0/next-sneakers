import type { Product } from '@/@types/product'
import { toggleFavorite } from '@/actions/favorite'
import {
	InfiniteData,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { productKeys } from '../product-queries'
import { favoriteKeys } from './favorite-queries'

type ProductsInfinite = InfiniteData<{
	items: Product[]
	nextCursor?: number
}>

export const useToggleFavorite = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: toggleFavorite,

		onMutate: async (productId: number) => {
			await queryClient.cancelQueries({ queryKey: productKeys.all })

			const previousProducts = queryClient.getQueriesData<ProductsInfinite>({
				queryKey: productKeys.all,
			})

			const previousFavorite = queryClient.getQueryData<Product>(
				favoriteKeys.isFavorite(productId),
			)

			// optimistic update
			queryClient.setQueriesData<ProductsInfinite>(
				{ queryKey: productKeys.all },
				old => {
					if (!old?.pages) return old

					return {
						...old,
						pages: old.pages.map(page => ({
							...page,
							items: page.items.map(p =>
								p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p,
							),
						})),
					}
				},
			)

			queryClient.setQueryData<Product>(
				favoriteKeys.isFavorite(productId),
				old => (old ? { ...old, isFavorite: !old.isFavorite } : old),
			)

			return { previousProducts, previousFavorite }
		},

		onError: (_, productId, context) => {
			context?.previousProducts.forEach(([key, data]) => {
				queryClient.setQueryData(key, data)
			})

			queryClient.setQueryData(
				favoriteKeys.isFavorite(productId),
				context?.previousFavorite,
			)

			toast.error('Failed to toggle favorite')
		},
	})
}
