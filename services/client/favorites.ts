import axios from 'axios'

export const getIsFavorite = async (
	productId: number,
): Promise<{ isFavorite: boolean }> => {
	try {
		const { data } = await axios.get(`/api/products/${productId}/favorite`)
		return data
	} catch (error) {
		throw new Error('Failed to fetch favorite status')
	}
}
