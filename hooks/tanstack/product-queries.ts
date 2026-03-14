import { Sex } from '@/@types/product'
import { ApiClient } from '@/services/api-client'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

interface ProductFilters {
	brands?: number[]
	sexes?: Sex[]
	priceFrom?: number
	priceTo?: number
	sizes?: string[]
	colors?: string[]
}

export const productKeys = {
	all: ['products'] as const,
	filtered: (filters: ProductFilters) => [...productKeys.all, filters] as const,
	group: (groupSlug: string) =>
		[...productKeys.all, 'group', groupSlug] as const,
}

export const useProducts = ({
	brands = [],
	sexes = [],
	priceFrom,
	priceTo,
	sizes = [],
	colors = [],
}: ProductFilters) => {
	const filters = { brands, sexes, priceFrom, priceTo, sizes, colors }

	return useInfiniteQuery({
		queryKey: productKeys.filtered(filters),
		queryFn: ({ pageParam }) =>
			ApiClient.product.getAll({ ...filters, cursor: pageParam }),
		initialPageParam: undefined as number | undefined,
		getNextPageParam: lastPage => lastPage.nextCursor,
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
