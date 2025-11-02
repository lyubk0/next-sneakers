import { cart_item } from '@/db/schema'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { Product } from './product'
import { Size } from './size'

export type CartItem = InferSelectModel<typeof cart_item> & {
	product: Product
	size: Size
}
export type NewCartItem = InferInsertModel<typeof cart_item>
export type UpdateCartItem = Partial<NewCartItem> & { id: number }
