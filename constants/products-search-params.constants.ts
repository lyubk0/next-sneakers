import { ALL_SEXES_VALUES } from './filters.constants'
import { Sex } from './product.constants'
import { SortValue } from './sort.constants'

export const DEFAULT_PRODUCT_SEARCH_PARAMS: ProductSearchParams = {
	sexes: ALL_SEXES_VALUES,
	sizes: [] as string[],
	brands: [] as number[],
	colors: [] as string[],
	priceFrom: 0,
	priceTo: 1000,
	sort: 'recommended' as SortValue,
	page: 1,
} as const

export interface ProductSearchParams {
	brands?: number[]
	sexes?: Sex[]
	priceFrom?: number
	priceTo?: number
	sizes?: string[]
	colors?: string[]
	sort?: SortValue
	page?: number
	limit?: number
}
