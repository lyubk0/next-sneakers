import { SEXES } from '@/constants/product-constants'
import { useBrandsFilter, usePriceRangeFilter, useSexFilter } from './nuqs'
import { useColorsFilter } from './nuqs/use-colors-filter'
import { useSizeFilter } from './nuqs/use-size-filters'
import { useBrands } from './tanstack/brand-queries'

const ALL_SEXES_COUNT = SEXES.length
const DEFAULT_PRICE_FROM = 0
const DEFAULT_PRICE_TO = 1000

export const useFiltersCount = () => {
	const { data: brands } = useBrands()

	const { selectedSizes } = useSizeFilter()
	const { selectedBrandsQuery } = useBrandsFilter()
	const { selectedColors } = useColorsFilter()
	const { priceFrom, priceTo } = usePriceRangeFilter()
	const { selectedSexes } = useSexFilter()

	const allBrandIds = brands?.map(b => b.id) ?? []
	const selectedBrands =
		selectedBrandsQuery === null ? allBrandIds : selectedBrandsQuery

	let count = 0

	// Бренды: считаем активным, если выбраны не все
	if (selectedBrands.length !== (brands?.length ?? 0)) {
		count++
	}

	// Размеры: считаем активным, если хоть один выбран
	if (selectedSizes.length > 0) {
		count++
	}

	// Цвета: считаем активным, если хоть один выбран
	if (selectedColors.length > 0) {
		count++
	}

	// Пол: считаем активным, если выбраны не все
	if (selectedSexes.length !== ALL_SEXES_COUNT) {
		count++
	}

	// Цена: считаем активным, если изменено хотя бы одно значение
	if (priceFrom !== DEFAULT_PRICE_FROM || priceTo !== DEFAULT_PRICE_TO) {
		count++
	}

	return { count }
}
