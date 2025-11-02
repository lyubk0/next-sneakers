import { Cart } from '@/@types/cart'

export const getCart = async (): Promise<Cart> => {
	const response = await fetch(`/api/cart`)
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.error || 'Failed to fetch cart')
	}

	return data
}
