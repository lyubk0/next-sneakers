import { category } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { Product } from './product'

export type Category = InferSelectModel<typeof category>
export type CategoryWithProducts = Category & {
	products: Product[]
}
