import { queryKeys } from '@/hooks/queries/query-keys'
import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const useBrands = () => {
	return useQuery({
		queryKey: [queryKeys.brands],
		queryFn: async () => {
			return await ApiClient.brands.getAll()
		},
	})
}
