import { Cart } from '@/@types/cart'
import axios from 'axios'

export const getCart = async (): Promise<Cart> => {
	try {
		const { data } = await axios.get(`/api/cart`)

		return data
	} catch (error) {
		throw new Error('Failed to fetch cart data')
	}
}
