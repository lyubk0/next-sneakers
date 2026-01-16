import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const useColors = () => {
	return useQuery({
		queryKey: ['colors'],
		queryFn: async () => await ApiClient.colors.getAll(),
	})
}
