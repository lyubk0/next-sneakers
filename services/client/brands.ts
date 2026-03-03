import { Brand } from '@/@types/brand-types'
import axios from 'axios'

export const getAll = async (): Promise<Brand[]> => {
	try {
		const { data } = await axios.get(`/api/brands`)

		return data
	} catch (error) {
		throw new Error('Failed to fetch brands')
	}
}
