import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const searchKeys = {
	all: ['search'] as const,
	products: (query: string) => [...searchKeys.all, 'products', query] as const,
}

export const useSearchProducts = (query: string) => {
	return useQuery({
		queryKey: searchKeys.products(query),
		queryFn: () => ApiClient.product.searchProducts(query),
		enabled: query.length > 0,
	})
}
