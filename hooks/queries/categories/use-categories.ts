import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const useCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			return await ApiClient.categories.getAll()
		},
	})
}
