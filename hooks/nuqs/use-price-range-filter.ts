import { parseAsInteger, useQueryState } from 'nuqs'

export const usePriceRangeFilter = () => {
	const [priceFrom, setPriceFrom] = useQueryState('priceFrom', parseAsInteger)
	const [priceTo, setPriceTo] = useQueryState('priceTo', parseAsInteger)

	const setPriceRange = ({
		from,
		to,
	}: {
		from?: number | null
		to?: number | null
	}) => {
		if (from !== undefined) {
			setPriceFrom(from)
		}

		if (to !== undefined) {
			setPriceTo(to)
		}
	}

	const clearPriceFrom = () => {
		setPriceFrom(null)
	}

	const clearPriceTo = () => {
		setPriceTo(null)
	}

	return {
		priceFrom,
		priceTo,
		setPriceRange,
		clearPriceFrom,
		clearPriceTo,
	}
}
