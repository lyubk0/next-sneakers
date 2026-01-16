'use server'

import { NewCartItem, UpdateCartItem } from '@/@types/cart-item'
import { db } from '@/db/drizzle'
import { cart, cartItem } from '@/db/schema'
import { UpdateCartItemQuantityParams } from '@/hooks/queries/cart/use-update-cart-item-quantity'
import { getOrCreateGuestId } from '@/lib/user'
import { and, eq } from 'drizzle-orm'

export const createCart = async (guestId: string) => {
	const [newCart] = await db
		.insert(cart)
		.values({
			guest_id: guestId,
		})
		.returning()

	return {
		...newCart,
		items: [],
	}
}

export const addToCart = async (productData: NewCartItem) => {
	try {
		const guestId = await getOrCreateGuestId()

		const userCart = await db.query.cart.findFirst({
			where: eq(cart.guest_id, guestId),
		})

		const existingCartItem = await db.query.cartItem.findFirst({
			where: and(
				eq(cartItem.size_id, productData.size_id),
				eq(cartItem.cart_id, userCart!.id)
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

export const updateCartItem = async (cartItemData: UpdateCartItem) => {
	try {
		const { id, ...data } = cartItemData

		await db.update(cartItem).set(data).where(eq(cartItem.id, id))
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
		const existingCartItem = await db.query.cartItem.findFirst({
			where: eq(cartItem.id, cartItemId),
		})

		if (!existingCartItem) throw new Error('Cart item not found')

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
