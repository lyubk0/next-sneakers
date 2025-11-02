import { cart } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { CartItem } from './cart-item'

export type Cart = InferSelectModel<typeof cart> & {
	items: CartItem[]
	totalPrice: number
}
