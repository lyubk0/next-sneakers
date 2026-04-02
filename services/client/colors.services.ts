import { Color } from '@/@types/color.types'
import axios from 'axios'

export const getAll = async (): Promise<Color[]> => {
	try {
		const { data } = await axios.get('/api/colors')
		return data
	} catch (error) {
		console.error('Failed to fetch colors', error)
		throw new Error('Failed to fetch colors')
	}
}
