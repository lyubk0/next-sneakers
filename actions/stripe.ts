'use server'

import { Cart } from '@/@types/cart'
import Stripe from 'stripe'

export const createInvoice = async (cartData: Cart) => {
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
		const { items } = cartData

		const session = await stripe.checkout.sessions.create({
			mode: 'payment',
			locale: 'auto',
			payment_method_types: ['card'],
			line_items: items.map(item => ({
				price_data: {
					currency: 'uah',
					product_data: {
						name: item.product.name,
					},
					unit_amount: item.product.price * 100,
				},
				quantity: item.quantity,
			})),
			success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
		})

		return session.url
	} catch (error) {
		console.error('Error creating invoice:', error)
		throw new Error('Failed to create invoice')
	}
}
