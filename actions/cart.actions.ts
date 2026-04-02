'use server'

import { NewCartItem } from '@/@types/cart-item.types'
import { Db, Tx } from '@/@types/db'
import { db } from '@/db/drizzle'
import { cart, cartItem } from '@/db/schema'
import { UpdateCartItemQuantityParams } from '@/hooks/tanstack/cart/cart.mutations'

import { getGuestId } from '@/lib/get-guest-id'
import { and, eq } from 'drizzle-orm'

export const addToCart = async (productData: NewCartItem) => {
	try {
		const guestId = await getGuestId()

		if (!guestId) {
			throw new Error('Guest ID not found')
		}

		console.log('Adding to cart for guestId:', guestId)
		const userCart = await db.query.cart.findFirst({
			where: eq(cart.guest_id, guestId),
		})

		const existingCartItem = await db.query.cartItem.findFirst({
			where: and(
				eq(cartItem.size_id, productData.size_id),
				eq(cartItem.cart_id, userCart!.id),
			),
		})

		if (existingCartItem) {
			const newQuantity = existingCartItem.quantity + 1
			await db
				.update(cartItem)
				.set({ quantity: newQuantity })
				.where(eq(cartItem.id, existingCartItem.id))
			return
		}

		await db.insert(cartItem).values(productData)
	} catch (error) {
		console.error('Error adding to cart:', error)
		throw new Error('Failed to add to cart')
	}
}

export const updateCartItemQuantity = async ({
	action,
	cartItemId,
}: UpdateCartItemQuantityParams) => {
	try {
		const existingCartItem = await db.query.cartItem.findFirst({
			where: eq(cartItem.id, cartItemId),
		})

		if (!existingCartItem) throw new Error('Cart item not found')

		if (existingCartItem.quantity === 1 && action === 'decrement') {
			return
		}

		const newQuantity =
			action === 'increment'
				? existingCartItem.quantity + 1
				: existingCartItem.quantity - 1

		await db
			.update(cartItem)
			.set({ quantity: newQuantity })
			.where(eq(cartItem.id, cartItemId))
	} catch (error) {
		console.error(error)
		throw new Error('Failed to update cart item quantity')
	}
}

export const removeCartItem = async (cartItemId: number) => {
	try {
		await db.delete(cartItem).where(eq(cartItem.id, cartItemId))
	} catch (error) {
		console.error('Error removing cart item:', error)
		throw new Error('Failed to remove cart item')
	}
}

export const clearCart = async (guestId: string, dbClient: Db | Tx = db) => {
	try {
		const userCart = await dbClient.query.cart.findFirst({
			where: eq(cart.guest_id, guestId),
		})

		await dbClient.delete(cartItem).where(eq(cartItem.cart_id, userCart!.id))
	} catch (error) {
		console.error('Error clearing cart:', error)
		throw new Error('Failed to clear cart')
	}
}
