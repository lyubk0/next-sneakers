import { ALL_SEXES_VALUES } from '@/constants/filters.constants'
import { SORT_OPTION_VALUES } from '@/constants/sort.constants'
import {
	createSearchParamsCache,
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
	parseAsStringLiteral,
} from 'nuqs/server'

export const filtersSchema = {
	sizes: parseAsArrayOf(parseAsString),
	brands: parseAsArrayOf(parseAsInteger),
	colors: parseAsArrayOf(parseAsString),
	sex: parseAsArrayOf(parseAsStringLiteral(ALL_SEXES_VALUES)),
	priceFrom: parseAsInteger.withDefault(0),
	priceTo: parseAsInteger.withDefault(1000),
}

export const sortSchema = {
	sort: parseAsStringLiteral(SORT_OPTION_VALUES).withDefault('recommended'),
}

export const paginationSchema = {
	page: parseAsInteger.withDefault(1),
}

export const searchParamsCache = createSearchParamsCache({
	...filtersSchema,
	...sortSchema,
	...paginationSchema,
})
