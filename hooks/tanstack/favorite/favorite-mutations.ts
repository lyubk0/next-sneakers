import type { Product } from '@/@types/product'
import { toggleFavorite } from '@/actions/favorite'
import {
	InfiniteData,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import { productKeys } from '../product-queries'
import { favoriteKeys } from './favorite-queries'

export const useToggleFavorite = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: toggleFavorite,

		onMutate: async (productId: number) => {
			await queryClient.cancelQueries({ queryKey: productKeys.all })
			await queryClient.cancelQueries({
				queryKey: favoriteKeys.isFavorite(productId),
			})

			const previousProducts = queryClient.getQueriesData({
				queryKey: productKeys.all,
			})
			const previousProduct = queryClient.getQueriesData({
				queryKey: favoriteKeys.isFavorite(productId),
			})

			// Обновляем InfiniteData
			queryClient.setQueriesData<
				InfiniteData<{ items: Product[]; nextCursor?: number }>
			>({ queryKey: productKeys.all }, old => {
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
			})

			queryClient.setQueriesData<Product>(
				{ queryKey: favoriteKeys.isFavorite(productId) },
				old => (old ? { ...old, isFavorite: !old.isFavorite } : old),
			)

			return { previousProducts, previousProduct }
		},

		onSuccess: (data, productId) => {
			queryClient.setQueriesData<
				InfiniteData<{ items: Product[]; nextCursor?: number }>
			>({ queryKey: productKeys.all }, old => {
				if (!old?.pages) return old
				return {
					...old,
					pages: old.pages.map(page => ({
						...page,
						items: page.items.map(p =>
							p.id === productId ? { ...p, isFavorite: data.added } : p,
						),
					})),
				}
			})

			queryClient.setQueriesData<Product>(
				{ queryKey: favoriteKeys.isFavorite(productId) },
				old => (old ? { ...old, isFavorite: data.added } : old),
			)
		},
	})
}
