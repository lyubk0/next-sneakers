import { cartItem } from '@/db/schema'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { Product } from './product'
import { Size } from './size'

export type CartItem = InferSelectModel<typeof cartItem> & {
	product: Product
	size: Size
}
export type NewCartItem = InferInsertModel<typeof cartItem>
export type UpdateCartItem = Partial<NewCartItem> & { id: number }
