import { useQueryState } from 'nuqs'

export const useBrandsFilter = () => {
	const [selectedBrandsQuery, setSelectedBrandsQuery] = useQueryState<
		number[] | null
	>('brands', {
		defaultValue: null,

		parse: value => {
			if (!value) return null
			return value.split(',').map(Number)
		},

		serialize: value => {
			if (!value || value.length === 0) return ''
			return value.join(',')
		},
	})

	return {
		selectedBrandsQuery,
		setSelectedBrandsQuery,
	}
}
