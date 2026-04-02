import { product } from '@/db/schema'
import { asc, desc } from 'drizzle-orm'

export const getOrderBy = (sort: string | undefined) => {
	switch (sort) {
		case 'price_asc':
			return asc(product.price)
		case 'price_desc':
			return desc(product.price)
		default:
			return desc(product.id)
	}
}
