import { useQueryState } from 'nuqs'

export const useSizeFilter = (sizes: string[] | null) => {
	const [selectedSizes, setSelectedSizes] = useQueryState<string[] | null>(
		'sizes',
		{
			defaultValue: null,

			parse: value => {
				if (!value) return null
				return value.split(',')
			},

			serialize: value => {
				if (!value || value.length === 0) return ''
				return value.join(',')
			},
		}
	)

	const toggleSize = (size: string) => {
		setSelectedSizes(prev => {
			const current = prev === null ? [] : prev
			const isSelected = current.includes(size)

			const next = isSelected
				? current.filter(id => id !== size)
				: [...current, size]

			if (next.length === 0) return null

			return next
		})
	}

	return {
		selectedSizes: selectedSizes || [],
		toggleSize,
	}
}
