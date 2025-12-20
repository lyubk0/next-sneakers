'use server'

import { Cart } from '@/@types/cart'
import { db } from '@/db/drizzle'
import { cartItem } from '@/db/schema/cart-item'
import { order as orderTable } from '@/db/schema/order'
import { orderItem } from '@/db/schema/order-item'
import { eq } from 'drizzle-orm'

export const createOrder = async (cart: Cart, checkoutSessionUrl: string) => {
	if (!cart.items.length) {
		throw new Error('Cart is empty')
	}

	return await db.transaction(async tx => {
		const totalPrice = cart.items.reduce(
			(sum, item) => sum + item.product.price * item.quantity,
			0
		)

		const [createdOrder] = await tx
			.insert(orderTable)
			.values({
				userId: cart.user_id ?? undefined,
				guestId: cart.guest_id ?? undefined,
				checkoutSessionUrl,
				totalPrice,
			})
			.returning()

		await tx.insert(orderItem).values(
			cart.items.map(item => ({
				orderId: createdOrder.id,
				productId: item.product_id,
				sizeId: item.size_id,
				price: item.product.price,
				quantity: item.quantity,
			}))
		)

		await tx.delete(cartItem).where(eq(cartItem.cart_id, cart.id))

		return createdOrder
	})
}
