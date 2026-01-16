import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'

export const useFavorites = () => {
	return useQuery({
		queryKey: queryKeys.favorites(),
		queryFn: async () => {
			return await ApiClient.favorites.getAll()
		},
	})
}
