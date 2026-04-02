import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const favoriteKeys = {
	isFavorite: (productId: number) => ['isFavorite', productId] as const,
}

export const useIsFavorite = (productId: number) => {
	return useQuery({
		queryKey: favoriteKeys.isFavorite(productId),
		queryFn: () => ApiClient.favorites.getIsFavorite(productId),
		enabled: !!productId,
	})
}
