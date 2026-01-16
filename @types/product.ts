import { product } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { Size } from './size'

export type Product = InferSelectModel<typeof product> & {
	sizes: Size[]
	isFavorite?: boolean
}

export const SEXES = [
	{ value: 'men', label: 'Men' },
	{ value: 'women', label: 'Women' },
	{ value: 'unisex', label: 'Unisex' },
] as const

export type Sex = (typeof SEXES)[number]['value']
