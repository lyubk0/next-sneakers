import { useQueryState } from 'nuqs'

export const useColorsFilter = (colors: string[] | null) => {
	const [selectedColors, setSelectedColors] = useQueryState<string[] | null>(
		'colors',
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

	const toggleColor = (color: string) => {
		setSelectedColors(prev => {
			const current = prev === null ? [] : prev
			const isSelected = current.includes(color)

			const next = isSelected
				? current.filter(colorName => colorName !== color)
				: [...current, color]

			if (next.length === 0) return null

			return next
		})
	}

	return {
		selectedColors: selectedColors || [],
		toggleColor,
	}
}
