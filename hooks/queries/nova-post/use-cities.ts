import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'

export const useCities = (searchString: string) => {
	return useQuery({
		queryKey: queryKeys.novaPoshtaCities(searchString),
		queryFn: async () => {
			return await ApiClient.nova.getCities(searchString)
		},
		placeholderData: previousData => previousData,
	})
}
