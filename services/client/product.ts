import { Product } from '@/@types/product'

interface getAllByCategoryParams {
	category: string
}

export const getAllByCategory = async ({
	category,
}: getAllByCategoryParams): Promise<Product[]> => {
	const response = await fetch(`/api/products?category=${category}`)
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.error || 'Failed to fetch products')
	}

	return data
}
