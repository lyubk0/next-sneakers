import { Product, Sex } from '@/@types/product'
import axios from 'axios'

interface GetAllParams {
	brands?: number[]
	sexes?: Sex[]
	priceFrom?: number
	priceTo?: number
	sizes?: string[]
	colors?: string[]
}

export const getAll = async ({
	brands,
	sexes,
	priceFrom,
	priceTo,
	sizes,
	colors,
}: GetAllParams): Promise<Product[]> => {
	try {
		const query = new URLSearchParams()

		if (brands?.length) {
			query.set('brands', brands.join(','))
		}

		if (sexes?.length) {
			query.set('sex', sexes.join(','))
		}

		if (priceFrom) {
			query.set('priceFrom', priceFrom.toString())
		}

		if (priceTo) {
			query.set('priceTo', priceTo.toString())
		}

		if (sizes?.length) {
			query.set('sizes', sizes.join(','))
		}

		if (colors?.length) {
			query.set('colors', colors.join(','))
		}

		const { data } = await axios.get(`/api/products?${query.toString()}`)
		return data
	} catch {
		throw new Error('Failed to fetch products')
	}
}
