'use server'

import { Cart } from '@/@types/cart.types'
import { getGuestId } from '@/lib/get-guest-id'
import Stripe from 'stripe'

export const createCheckoutSession = async (cartData: Cart) => {
	try {
		const guestId = await getGuestId()

		if (!guestId) {
			throw new Error('Guest ID not found')
		}

		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
		const { items } = cartData

		const session = await stripe.checkout.sessions.create({
			mode: 'payment',
			locale: 'auto',
			payment_method_types: ['card'],
			line_items: items.map(item => ({
				price_data: {
					currency: 'usd',
					product_data: {
						name: item.product.name,
					},
					unit_amount: item.product.price * 100,
				},
				quantity: item.quantity,
			})),
			phone_number_collection: { enabled: true },
			shipping_address_collection: {
				allowed_countries: ['US', 'PL', 'UA', 'GB', 'FR', 'DE', 'GM'],
			},
			success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
			cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
			metadata: {
				cartId: cartData.id,
				guestId,
			},
		})

		return session.url
	} catch (error) {
		console.error('Error creating invoice:', error)
		throw new Error('Failed to create invoice')
	}
}
