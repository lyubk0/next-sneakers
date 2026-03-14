import { ALL_SEXES_VALUES } from '@/constants/filters-constants'
import {
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
	parseAsStringLiteral,
} from 'nuqs'

export const filtersSchema = {
	sizes: parseAsArrayOf(parseAsString),
	brands: parseAsArrayOf(parseAsInteger),
	colors: parseAsArrayOf(parseAsString),
	sex: parseAsArrayOf(parseAsStringLiteral(ALL_SEXES_VALUES)),
	priceFrom: parseAsInteger.withDefault(0),
	priceTo: parseAsInteger.withDefault(1000),
}
