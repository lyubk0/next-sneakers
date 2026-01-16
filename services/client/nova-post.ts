import { NovaPoshtaData } from '@/@types/nova-poshta'
import axios from 'axios'

export const getCities = async (
	searchString: string
): Promise<NovaPoshtaData> => {
	try {
		const { data } = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
			apiKey: process.env.NOVA_POSHTA_API_KEY,
			modelName: 'Address',
			calledMethod: 'getCities',
			methodProperties: {
				FindByString: searchString,
				Limit: 5,
				Language: 'EN',
			},
		})
		return data
	} catch (error) {
		console.error('Error fetching cities:', error)
		throw new Error('Failed to fetch cities')
	}
}

export const getWarehouses = async (
	cityDescription: string,
	searchString: string
) => {
	try {
		const { data } = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
			apiKey: process.env.NOVA_POSHTA_API_KEY,
			modelName: 'AddressGeneral',
			calledMethod: 'getWarehouses',
			methodProperties: {
				FindByString: searchString,
				CityName: cityDescription,
				Limit: 5,
			},
		})
		return data
	} catch (error) {
		console.error('Error fetching warehouses:', error)
		throw new Error('Failed to fetch warehouses')
	}
}
