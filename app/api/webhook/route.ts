import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: Request) {
	const sig = req.headers.get('stripe-signature') as string

	let event

	try {
		const rawBody = await req.text()
		event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret!)
	} catch (err: any) {
		console.error('Webhook signature verification failed:', err.message)
		return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
	}

	switch (event.type) {
		case 'checkout.session.completed':
			console.log('Payment completed')
			break

		case 'invoice.payment_succeeded':
			console.log('Subscription payment succeeded')
			break

		default:
			console.log(`Unhandled event type: ${event.type}`)
	}

	return NextResponse.json({ received: true }, { status: 200 })
}
