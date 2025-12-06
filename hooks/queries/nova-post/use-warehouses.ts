import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'

export const useWarehouses = (
	cityDescription: string,
	searchString: string
) => {
	return useQuery({
		queryKey: queryKeys.novaPoshtaWarehouses(cityDescription, searchString),
		queryFn: () => ApiClient.nova.getWarehouses(cityDescription, searchString),
		placeholderData: previousData => previousData,
		enabled: !!cityDescription,
	})
}
