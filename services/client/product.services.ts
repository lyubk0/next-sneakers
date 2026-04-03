import { Product } from '@/@types/product.types'
import { ProductSearchParams } from '@/constants/products-search-params.constants'
import axios from 'axios'

interface Pagination {
	page: number
	limit: number
	total: number
	totalPages: number
	hasNextPage: boolean
	hasPrevPage: boolean
}

export const getAll = async ({
	limit,
	brands,
	sexes,
	priceFrom,
	priceTo,
	sizes,
	colors,
	sort,
	page,
}: ProductSearchParams): Promise<{
	items: Product[]
	pagination: Pagination
}> => {
	try {
		const query = new URLSearchParams()

		if (limit) query.set('limit', limit.toString())
		if (brands?.length) query.set('brands', brands.join(','))
		if (sexes?.length) query.set('sex', sexes.join(','))
		if (priceFrom) query.set('priceFrom', priceFrom.toString())
		if (priceTo) query.set('priceTo', priceTo.toString())
		if (sizes?.length) query.set('sizes', sizes.join(','))
		if (colors?.length) query.set('colors', colors.join(','))
		if (sort) query.set('sort', sort)
		if (page) query.set('page', page.toString())

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
