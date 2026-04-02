import { product } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { Size } from './size.types'

export type Product = InferSelectModel<typeof product> & {
	sizes: Size[]
	isFavorite?: boolean
}
