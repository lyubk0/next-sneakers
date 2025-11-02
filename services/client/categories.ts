import { Category } from '@/@types/category'

export const getAll = async (): Promise<Category[]> => {
	const response = await fetch('/api/categories')
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.error || 'Failed to fetch categories')
	}

	return data
}
