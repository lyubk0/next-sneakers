import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const sizeKeys = {
	all: ['sizes'] as const,
}

export const useSizes = () => {
	return useQuery({
		queryKey: sizeKeys.all,
		queryFn: () => ApiClient.sizes.getAll(),
		staleTime: Infinity,
	})
}
