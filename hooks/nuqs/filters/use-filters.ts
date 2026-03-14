import { Sex } from '@/@types/product'
import { ALL_SEXES_VALUES } from '@/constants/filters-constants'
import { useQueryStates } from 'nuqs'
import { filtersSchema } from './filters-schema'

export const useFilters = () => {
	const [filters, setFilters] = useQueryStates(filtersSchema)

	// --- Sizes ---
	const toggleSize = (size: string) => {
		setFilters(prev => {
			const current = prev.sizes ?? []
			const next = current.includes(size)
				? current.filter(s => s !== size)
				: [...current, size]
			return { sizes: next.length === 0 ? null : next }
		})
	}

	// --- Colors ---
	const toggleColor = (color: string) => {
		setFilters(prev => {
			const current = prev.colors ?? []
			const next = current.includes(color)
				? current.filter(c => c !== color)
				: [...current, color]
			return { colors: next.length === 0 ? null : next }
		})
	}

	// --- Price range ---
	const setPriceRange = ({
		from,
		to,
	}: {
		from?: number | null
		to?: number | null
	}) => {
		setFilters({
			...(from !== undefined && { priceFrom: from }),
			...(to !== undefined && { priceTo: to }),
		})
	}

	// --- Sex ---
	const selectSingleSex = (sex: Sex) => setFilters({ sex: [sex] })

	const toggleSex = (sex: Sex) => {
		setFilters(prev => {
			const current = prev.sex ?? ALL_SEXES_VALUES
			const isSelected = current.includes(sex)

			if (isSelected && current.length === 1) return prev

			const next = isSelected
				? current.filter(s => s !== sex)
				: [...current, sex]

			return { sex: next.length === ALL_SEXES_VALUES.length ? null : next }
		})
	}

	return {
		setFilters,
		// Sizes
		selectedSizes: filters.sizes ?? [],
		toggleSize,

		// Brands
		selectedBrandsQuery: filters.brands,
		setSelectedBrandsQuery: (brands: number[] | null) => setFilters({ brands }),

		// Colors
		selectedColors: filters.colors ?? [],
		toggleColor,

		// Price range
		priceFrom: filters.priceFrom,
		priceTo: filters.priceTo,
		setPriceRange,
		clearPriceFrom: () => setFilters({ priceFrom: null }),
		clearPriceTo: () => setFilters({ priceTo: null }),

		// Sex
		selectedSexes: filters.sex ?? ALL_SEXES_VALUES,
		selectSingleSex,
		toggleSex,
		clearSexes: () => setFilters({ sex: null }),
	}
}
