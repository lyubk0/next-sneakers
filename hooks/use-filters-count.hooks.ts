import { SEXES } from '@/constants/product.constants'
import { useFilters } from './nuqs/filters/use-filters'
import { useBrands } from './tanstack/brand.queries'

const ALL_SEXES_COUNT = SEXES.length
const DEFAULT_PRICE_FROM = 0
const DEFAULT_PRICE_TO = 1000

export const useFiltersCount = () => {
	const { data: brands } = useBrands()

	const {
		selectedSizes,
		selectedBrandsQuery,
		selectedColors,
		priceFrom,
		priceTo,
		selectedSexes,
	} = useFilters()

	const allBrandIds = brands?.map(b => b.id) ?? []
	const selectedBrands =
		selectedBrandsQuery === null ? allBrandIds : selectedBrandsQuery

	let count = 0

	if (selectedBrands.length !== (brands?.length ?? 0)) count++
	if (selectedSizes.length > 0) count++
	if (selectedColors.length > 0) count++
	if (selectedSexes.length !== ALL_SEXES_COUNT) count++
	if (priceFrom !== DEFAULT_PRICE_FROM || priceTo !== DEFAULT_PRICE_TO) count++

	return { count }
}
