import { Sex } from '@/@types/product'
import { SEXES } from '@/constants/product-constants'
import { useQueryState } from 'nuqs'

const ALL_SEXES_VALUES: Sex[] = SEXES.map(s => s.value)

export const useSexFilter = () => {
	const [sexes, setSexes] = useQueryState<Sex[] | null>('sex', {
		defaultValue: null,

		parse: value => {
			if (!value) return null
			return value.split(',') as Sex[]
		},

		serialize: value => {
			if (!value) return ''
			return value.join(',')
		},
	})

	const selectSingleSex = (sex: Sex) => {
		setSexes([sex])
	}

	const toggleSex = (sex: Sex) => {
		setSexes(prev => {
			const current = prev === null ? ALL_SEXES_VALUES : prev
			const isSelected = current.includes(sex)

			if (isSelected && current.length === 1) return current

			const next = isSelected
				? current.filter(s => s !== sex)
				: [...current, sex]

			if (next.length === ALL_SEXES_VALUES.length) return null

			return next
		})
	}

	const clearSexes = () => setSexes(null)

	return {
		selectedSexes: sexes ?? ALL_SEXES_VALUES,
		selectSingleSex,
		toggleSex,
		clearSexes,
	}
}
