import { Sex } from '@/@types/product'

export const isSex = (value: string | null): value is Sex => {
	return value === 'unisex' || value === 'men' || value === 'women'
}
