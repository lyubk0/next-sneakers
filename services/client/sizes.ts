import axios from 'axios'

export const getAll = async (): Promise<string[]> => {
	try {
		const { data } = await axios.get(`/api/sizes`)

		return data
	} catch (error) {
		throw new Error('Failed to fetch sizes')
	}
}
