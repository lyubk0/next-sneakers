import { db } from '@/db/drizzle'
import { cart } from '@/db/schema'
import { calculateTotal } from '@/lib/calculate-total'
import { getGuestId } from '@/lib/get-guest-id'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const CART_WITH = {
	items: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		orderBy: (items: any, { desc }: any) => [desc(items.created_at)],
		with: {
			product: {
				with: {
					sizes: true,
				},
			},
			size: true,
		},
	},
} as const

export async function GET() {
	try {
		const guestId = await getGuestId()

		if (!guestId) {
			throw new Error('Guest ID not found')
		}

		let userCart = await db.query.cart.findFirst({
			where: eq(cart.guest_id, guestId),
			with: CART_WITH,
		})

		if (!userCart) {
			const [newCart] = await db
				.insert(cart)
				.values({
					guest_id: guestId,
				})
				.returning()

			userCart = {
				...newCart,
				items: [],
			}
		}

		const totalPrice = calculateTotal(userCart.items || [])

		return NextResponse.json({ ...userCart, totalPrice }, { status: 200 })
	} catch (error) {
		console.error('API Error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		)
	}
}
