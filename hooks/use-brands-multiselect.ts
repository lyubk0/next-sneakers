import { Brand } from '@/@types/brand-types'
import { useFilters } from './nuqs'

export const useBrandsMultiselect = (brands: Brand[]) => {
	const { selectedBrandsQuery, setSelectedBrandsQuery } = useFilters()

	const allBrandIds = brands?.map(b => b.id) ?? []

	const selectedBrands =
		selectedBrandsQuery === null ? allBrandIds : selectedBrandsQuery

	const toggleBrand = (brandId: number) => {
		const isSelected = selectedBrands.includes(brandId)

		if (isSelected && selectedBrands.length === 1) return

		const next = isSelected
			? selectedBrands.filter(id => id !== brandId)
			: [...selectedBrands, brandId]

		setSelectedBrandsQuery(next.length === allBrandIds.length ? null : next)
	}

	return {
		selectedBrands,
		toggleBrand,
		selectedBrandsQuery,
	}
}
