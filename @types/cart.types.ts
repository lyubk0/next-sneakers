import { cart } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { CartItem } from './cart-item.types'

export type Cart = InferSelectModel<typeof cart> & {
	items: CartItem[]
	totalPrice: number
}
