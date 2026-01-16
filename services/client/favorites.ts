import { Product } from '@/@types/product'
import axios from 'axios'

export const getAll = async (): Promise<Product[]> => {
	try {
		const { data } = await axios.get('/api/favorites')
		return data
	} catch (error) {
		throw new Error('Failed to fetch favorite products')
	}
}
