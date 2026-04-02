import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const colorKeys = {
	all: ['colors'] as const,
}

export const useColors = () => {
	return useQuery({
		queryKey: colorKeys.all,
		queryFn: () => ApiClient.colors.getAll(),
		staleTime: Infinity,
	})
}
