import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const brandKeys = {
	all: ['brands'] as const,
}

export const useBrands = () => {
	return useQuery({
		queryKey: brandKeys.all,
		queryFn: () => ApiClient.brands.getAll(),
		staleTime: Infinity,
	})
}
