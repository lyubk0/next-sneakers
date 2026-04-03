import {
	DEFAULT_PRODUCT_SEARCH_PARAMS,
	ProductSearchParams,
} from '@/constants/products-search-params.constants'

type NullableProductSearchParams = {
	[K in keyof ProductSearchParams]: ProductSearchParams[K] | null
}

export const parseProductSearchParams = (
	params: NullableProductSearchParams,
): ProductSearchParams => ({
	sexes: params.sexes ?? DEFAULT_PRODUCT_SEARCH_PARAMS.sexes,
	sizes: params.sizes ?? DEFAULT_PRODUCT_SEARCH_PARAMS.sizes,
	brands: params.brands ?? DEFAULT_PRODUCT_SEARCH_PARAMS.brands,
	colors: params.colors ?? DEFAULT_PRODUCT_SEARCH_PARAMS.colors,
	priceFrom: params.priceFrom ?? DEFAULT_PRODUCT_SEARCH_PARAMS.priceFrom,
	priceTo: params.priceTo ?? DEFAULT_PRODUCT_SEARCH_PARAMS.priceTo,
	sort: params.sort ?? DEFAULT_PRODUCT_SEARCH_PARAMS.sort,
	page: params.page ?? DEFAULT_PRODUCT_SEARCH_PARAMS.page,
})
