import { ProductSearchParams } from '@/constants/products-search-params.constants'
import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const productKeys = {
	all: ['products'] as const,
	lists: () => [...productKeys.all, 'list'] as const,
	filtered: (filters: ProductSearchParams) => {
		return [...productKeys.lists(), filters] as const
	},

	group: (groupSlug: string) =>
		[...productKeys.all, 'group', groupSlug] as const,
}

export const useProducts = (filters: ProductSearchParams) => {
	return useQuery({
		queryKey: productKeys.filtered(filters),
		queryFn: () => ApiClient.product.getAll(filters),
		staleTime: 300_000,
	})
}

export const useDefaultProducts = () => {
	return useQuery({
		queryKey: [...productKeys.all, 'default'],
		queryFn: () => ApiClient.product.getAll({ limit: 5 }),
		staleTime: 300_000,
	})
}

export const useProductsByGroup = (groupSlug: string) => {
	return useQuery({
		queryKey: productKeys.group(groupSlug),
		queryFn: () => ApiClient.product.getProductsByGroupSlug(groupSlug),
		enabled: !!groupSlug,
	})
}
