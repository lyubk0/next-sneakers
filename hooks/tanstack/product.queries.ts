import { Sex } from '@/constants/product.constants'
import { SortValue } from '@/constants/sort.constants'
import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

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
	lists: () => [...productKeys.all, 'list'] as const,
	filtered: (filters: ProductFilters & { sort?: SortValue; page?: number }) =>
		[...productKeys.lists(), filters] as const,
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
	sort,
	page = 1,
}: ProductFilters & { sort?: SortValue; page?: number }) => {
	const filters = {
		brands,
		sexes,
		priceFrom,
		priceTo,
		sizes,
		colors,
		sort,
		page,
	}

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
