import { SORT_OPTION_VALUES } from '@/constants/sort.constants'
import { parseAsStringLiteral, useQueryState } from 'nuqs'

export const useSort = () => {
	const [sort, setSort] = useQueryState(
		'sort',
		parseAsStringLiteral(SORT_OPTION_VALUES).withDefault('recommended'),
	)

	return {
		sort,
		setSort,
	}
}
