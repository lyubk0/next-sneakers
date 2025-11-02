'use server'

import { NewCartItem, UpdateCartItem } from '@/@types/cart-item'
import { db } from '@/db/drizzle'
import { cart, cart_item } from '@/db/schema'
import { UpdateCartItemQuantityParams } from '@/hooks/queries/cart/use-update-cart-item-quantity'
import { auth } from '@/lib/auth'
import { getOrCreateGuestId } from '@/lib/user'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

export const createOrUpdateCart = async () => {
	try {
		const guestId = await getOrCreateGuestId()
		const session = await auth.api.getSession({
			headers: await headers(),
		})

		const userId = session?.user?.id

		const guestCart = await db.query.cart.findFirst({
			where: eq(cart.guest_id, guestId),
		})

		if (!userId && !guestCart) {
			console.log('User not authenticated — using guest cart')
			const [createdCart] = await db
				.insert(cart)
				.values({ guest_id: guestId })
				.returning()
			return createdCart
		}

		if (userId && !guestCart) {
			console.log('Authenticated user without cart — creating cart for user')
			const [createdCart] = await db
				.insert(cart)
				.values({ user_id: userId })
				.returning()
			return createdCart
		}

		if (guestCart && userId) {
			const [updatedCart] = await db
				.update(cart)
				.set({ user_id: userId })
				.where(eq(cart.id, guestCart.id))
				.returning()
			return updatedCart
		}
	} catch (error) {
		console.error('Error creating cart:', error)
		throw new Error('Failed to create cart')
	}
}

export const addToCart = async (productData: NewCartItem) => {
	try {
		await db.insert(cart_item).values(productData)
	} catch (error) {
		console.error('Error adding to cart:', error)
		throw new Error('Failed to add to cart')
	}
}

export const updateCartItem = async (cartItemData: UpdateCartItem) => {
	try {
		const { id, ...data } = cartItemData

		await db.update(cart_item).set(data).where(eq(cart_item.id, id))
	} catch (error) {
		console.error('Error updating cart item:', error)
		throw new Error('Failed to update cart item')
	}
}

export const updateCartItemQuantity = async ({
	action,
	cartItemId,
}: UpdateCartItemQuantityParams) => {
	try {
		const cartItem = await db.query.cart_item.findFirst({
			where: eq(cart_item.id, cartItemId),
		})

		if (!cartItem) throw new Error('Cart item not found')

		const newQuantity =
			action === 'increment' ? cartItem.quantity + 1 : cartItem.quantity - 1

		await db
			.update(cart_item)
			.set({ quantity: newQuantity })
			.where(eq(cart_item.id, cartItemId))
	} catch (error) {
		console.error(error)
		throw new Error('Failed to update cart item quantity')
	}
}

export const removeCartItem = async (cartItemId: number) => {
	try {
		await db.delete(cart_item).where(eq(cart_item.id, cartItemId))
	} catch (error) {
		console.error('Error removing cart item:', error)
		throw new Error('Failed to remove cart item')
	}
}
