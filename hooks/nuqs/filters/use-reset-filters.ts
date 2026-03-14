import { useFilters } from './use-filters'

export const useResetFilters = () => {
	const { setFilters } = useFilters()

	const resetFilters = () =>
		setFilters({
			sizes: null,
			brands: null,
			colors: null,
			sex: null,
			priceFrom: null,
			priceTo: null,
		})

	return { resetFilters }
}
