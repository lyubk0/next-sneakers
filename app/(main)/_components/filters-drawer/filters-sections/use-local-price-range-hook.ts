import { useFilters } from '@/hooks/nuqs'
import { useDebounce } from '@/hooks/use-debounce'
import { useEffect, useState } from 'react'

export const useLocalPriceRange = () => {
	const { priceFrom, priceTo, setPriceRange } = useFilters()
	const [localPrice, setLocalPrice] = useState<[number, number]>([
		Number(priceFrom) || 0,
		Number(priceTo) || 1000,
	])
	const debouncedPrice = useDebounce(localPrice, 400)

	useEffect(() => {
		setPriceRange({ from: debouncedPrice[0], to: debouncedPrice[1] })
	}, [debouncedPrice])

	useEffect(() => {
		setLocalPrice([Number(priceFrom) || 0, Number(priceTo) || 1000])
	}, [priceFrom, priceTo])

	return { localPrice, setLocalPrice }
}
