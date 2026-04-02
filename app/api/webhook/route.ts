import { clearCart } from '@/actions/cart.actions'
import { createOrder } from '@/actions/order.actions'
import { db } from '@/db/drizzle'
import { order } from '@/db/schema/order.schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: Request) {
	const sig = req.headers.get('stripe-signature') as string

	let event

	try {
		const rawBody = await req.text()

		if (!endpointSecret) {
			return new NextResponse('Stripe webhook secret not configured', {
				status: 500,
			})
		}

		event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret)
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : 'Unknown webhook error'

		return new NextResponse(`Webhook Error: ${message}`, { status: 400 })
	}

	switch (event.type) {
		case 'checkout.session.completed': {
			const session = event.data.object as Stripe.Checkout.Session

			if (session.payment_status !== 'paid') break

			const exists = await db.query.order.findFirst({
				where: eq(order.stripeSessionId, session.id),
			})

			if (exists) break

			await db.transaction(async tx => {
				await createOrder(session, tx)
				const guestId = session.metadata?.guestId
				if (!guestId) {
					throw new Error('Guest ID is missing in session metadata')
				}

				await clearCart(guestId, tx)
			})

			break
		}
		default:
			console.log(`Unhandled event type: ${event.type}`)
	}

	return NextResponse.json({ received: true }, { status: 200 })
}
