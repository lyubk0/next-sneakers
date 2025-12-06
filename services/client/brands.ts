import { Brand } from '@/@types/brand'

export const getAll = async (): Promise<Brand[]> => {
	const response = await fetch(`/api/brands`)
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.error || 'Failed to fetch cart')
	}

	return data
}
