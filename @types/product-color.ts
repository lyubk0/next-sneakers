import { product_color } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { Size } from './size'

export type ProductColor = InferSelectModel<typeof product_color>
export type ProductColorWithSize = ProductColor & {
	size: Size[]
}
