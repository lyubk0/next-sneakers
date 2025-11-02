import { createOrUpdateCart } from '@/actions/cart'
import { db } from '@/db/drizzle'
import { cart } from '@/db/schema'
import { auth } from '@/lib/auth'
import { getOrCreateGuestId } from '@/lib/user'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		})

		const userId = session?.user?.id
		const guestId = await getOrCreateGuestId()

		let cartData

		if (userId) {
			const userCart = await db.query.cart.findFirst({
				where: eq(cart.user_id, userId),
				with: {
					items: {
						orderBy: (items, { desc }) => [desc(items.created_at)],
						with: {
							product: true,

							size: true,
						},
					},
				},
			})

			cartData = userCart
		} else {
			const guestCart = await db.query.cart.findFirst({
				where: eq(cart.guest_id, guestId),
				with: {
					items: {
						orderBy: (items, { desc }) => [desc(items.created_at)],
						with: {
							product: true,

							size: true,
						},
					},
				},
			})
			cartData = guestCart
		}

		if (!cartData) {
			const newOrUpdatedCart = await createOrUpdateCart()
			return NextResponse.json(
				{ ...newOrUpdatedCart, items: [], totalPrice: 0 },
				{
					status: 200,
				}
			)
		}

		const totalPrice = cartData?.items.reduce((sum, item) => {
			const price = item.product?.price ?? 0
			return sum + price * item.quantity
		}, 0)

		return NextResponse.json(
			{ ...cartData, totalPrice },
			{
				status: 200,
			}
		)
	} catch (error) {
		console.error('API Error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{
				status: 500,
			}
		)
	}
}
