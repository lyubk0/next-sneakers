import { Sex } from '@/@types/product'
import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

interface Props {
	brands?: number[]
	sexes?: Sex[]
	priceFrom?: number
	priceTo?: number
	sizes?: string[]
	colors?: string[]
}

export function useProducts({
	brands = [],
	sexes = [],
	priceFrom,
	priceTo,
	sizes = [],
	colors = [],
}: Props) {
	return useQuery({
		queryKey: ['products', brands, sexes, priceFrom, priceTo, sizes, colors],
		queryFn: async () =>
			await ApiClient.product.getAll({
				brands,
				sexes,
				priceFrom,
				priceTo,
				sizes,
				colors,
			}),
		enabled: brands.length > 0 || sexes.length > 0,
		placeholderData: prev => prev,
		staleTime: 300_000,
	})
}
