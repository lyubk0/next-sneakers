import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const useSizes = () => {
	return useQuery({
		queryKey: ['sizes'],
		queryFn: async () => await ApiClient.sizes.getAll(),
	})
}
