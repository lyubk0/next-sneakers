import { product } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { Category } from './category'
import { Size } from './size'

export type Product = InferSelectModel<typeof product> & {
	category: Category
	sizes: Size[]
	isFavorite: boolean
}
