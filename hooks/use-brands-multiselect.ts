import { Brand } from '@/@types/brand-types'
import { useBrandsFilter } from './nuqs'

export const useBrandsMultiselect = (brands: Brand[]) => {
	const { selectedBrandsQuery, setSelectedBrandsQuery } = useBrandsFilter()

	const allBrandIds = brands?.map(b => b.id) ?? []

	const selectedBrands =
		selectedBrandsQuery === null ? allBrandIds : selectedBrandsQuery

	const toggleBrand = (brandId: number) => {
		setSelectedBrandsQuery(prev => {
			const current = prev === null ? allBrandIds : prev
			const isSelected = current.includes(brandId)

			if (isSelected && current.length === 1) return current

			const next = isSelected
				? current.filter(id => id !== brandId)
				: [...current, brandId]

			if (next.length === allBrandIds.length) return null

			return next
		})
	}
	return {
		selectedBrands,
		toggleBrand,
		selectedBrandsQuery,
	}
}
