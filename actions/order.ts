'use server'

import { Db, Tx } from '@/@types/db'
import { CART_WITH } from '@/app/api/cart/route'
import { db } from '@/db/drizzle'
import { cart } from '@/db/schema'
import { order as orderTable } from '@/db/schema/order'
import { orderItem } from '@/db/schema/order-item'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { Stripe } from 'stripe'

export const createOrder = async (
	stripeSession: Stripe.Checkout.Session,
	dbClient: Db | Tx = db,
) => {
	try {
		const guestId = stripeSession.metadata?.guestId

		console.log('Creating order for guestId:', guestId)

		if (!guestId) {
			throw new Error('Guest ID is missing')
		}

		const session = await auth.api.getSession({
			headers: await headers(),
		})

		const cartData = await dbClient.query.cart.findFirst({
			where: eq(cart.guest_id, guestId),
			with: CART_WITH,
		})

		if (!cartData?.items.length) {
			throw new Error('Cart is empty')
		}

		return await dbClient.transaction(async tx => {
			const totalPrice = cartData.items.reduce(
				(sum, item) => sum + item.product.price * item.quantity,
				0,
			)

			const [createdOrder] = await tx
				.insert(orderTable)
				.values({
					// у сессии нету юзера, потомучто экшен вызывается через вебхук, а не напрямую из приложения, поэтому юзера там нету
					userId: session?.user?.id ?? null,

					stripeSessionId: stripeSession.id,
					paymentIntentId: stripeSession.payment_intent as string,

					email: stripeSession.customer_details?.email ?? 'unknown@email.com',

					phone: stripeSession.customer_details?.phone ?? 'unknown',

					totalPrice,
					currency: stripeSession.currency?.toUpperCase() ?? 'USD',

					paymentStatus: stripeSession.payment_status,

					shippingName: stripeSession.customer_details?.name,
					shippingCity: stripeSession.customer_details?.address?.city,
					shippingCountry: stripeSession.customer_details?.address?.country,
					shippingLine1: stripeSession.customer_details?.address?.line1,
					shippingLine2: stripeSession.customer_details?.address?.line2,
					shippingPostalCode:
						stripeSession.customer_details?.address?.postal_code,
				})
				.returning()

			await tx.insert(orderItem).values(
				cartData.items.map(item => ({
					orderId: createdOrder.id,
					productId: item.product_id,
					sizeId: item.size_id,
					price: item.product.price,
					quantity: item.quantity,
				})),
			)

			return createdOrder
		})
	} catch (error) {
		console.error('Error creating order:', error)
		throw new Error('Failed to create order')
	}
}
