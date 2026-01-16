import { Brand } from '@/@types/brand'
import { useQueryState } from 'nuqs'

export const useBrandsFilter = (brands: Brand[] | null) => {
	const allBrandIds = brands?.map(b => b.id) ?? []

	const [brandsQuery, setBrandsQuery] = useQueryState<number[] | null>(
		'brands',
		{
			defaultValue: null,

			parse: value => {
				if (!value) return null
				return value.split(',').map(Number)
			},

			serialize: value => {
				if (!value || value.length === 0) return ''
				return value.join(',')
			},
		}
	)

	const selectedBrands = brandsQuery === null ? allBrandIds : brandsQuery

	const toggleBrand = (brandId: number) => {
		setBrandsQuery(prev => {
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
	}
}
