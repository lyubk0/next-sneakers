import { Product, Sex } from '@/@types/product'
import axios from 'axios'

interface GetAllParams {
	brands?: number[]
	sexes?: Sex[]
	priceFrom?: number
	priceTo?: number
	sizes?: string[]
	colors?: string[]
	cursor?: number
}
export const getAll = async ({
	brands,
	sexes,
	priceFrom,
	priceTo,
	sizes,
	colors,
	cursor,
}: GetAllParams): Promise<{ items: Product[]; nextCursor?: number }> => {
	try {
		const query = new URLSearchParams()

		if (brands?.length) query.set('brands', brands.join(','))
		if (sexes?.length) query.set('sex', sexes.join(','))
		if (priceFrom) query.set('priceFrom', priceFrom.toString())
		if (priceTo) query.set('priceTo', priceTo.toString())
		if (sizes?.length) query.set('sizes', sizes.join(','))
		if (colors?.length) query.set('colors', colors.join(','))
		if (cursor) query.set('cursor', cursor.toString())

		const { data } = await axios.get(`/api/products?${query.toString()}`)
		return data
	} catch {
		throw new Error('Failed to fetch products')
	}
}
export const searchProducts = async (search: string): Promise<Product[]> => {
	try {
		const query = new URLSearchParams()
		query.set('q', search)

		const { data } = await axios.get(`/api/products/search?${query.toString()}`)
		return data
	} catch {
		throw new Error('Failed to search products')
	}
}

export const getProductsByGroupSlug = async (
	groupSlug: string,
): Promise<Product[]> => {
	try {
		const { data } = await axios.get(`/api/products/group/${groupSlug}`)

		return data
	} catch (error) {
		throw new Error('Failed to get products by slug')
	}
}
