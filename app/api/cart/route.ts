import { createCart } from '@/actions/cart'
import { getOrCreateGuestId } from '@/actions/get-or-create-guest-id'
import { db } from '@/db/drizzle'
import { cart } from '@/db/schema'
import { calculateTotal } from '@/lib/calculate-total'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const CART_WITH = {
	items: {
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
		const guestId = await getOrCreateGuestId()

		let userCart = await db.query.cart.findFirst({
			where: eq(cart.guest_id, guestId),
			with: CART_WITH,
		})

		if (!userCart) {
			userCart = await createCart(guestId)
		}

		const totalPrice = calculateTotal(userCart.items || [])

		return NextResponse.json({ ...userCart, totalPrice }, { status: 200 })
	} catch (error) {
		console.error('API Error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
