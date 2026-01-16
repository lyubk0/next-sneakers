'use server'

import { db } from '@/db/drizzle'
import { favorite } from '@/db/schema'
import { getOrCreateGuestId } from '@/lib/user'
import { eq } from 'drizzle-orm'

export const toggleFavorite = async (
	productId: number
): Promise<{ added: boolean }> => {
	try {
		const favoriteItem = await db.query.favorite.findFirst({
			where: eq(favorite.product_id, productId),
		})

		if (favoriteItem) {
			await db.delete(favorite).where(eq(favorite.id, favoriteItem.id))
			return { added: false }
		} else {
			const guestId = await getOrCreateGuestId()

			await db.insert(favorite).values({
				product_id: productId,
				guest_id: guestId,
			})

			return { added: true }
		}
	} catch (error) {
		console.error('Error toggling favorite:', error)
		throw new Error('Failed to toggle favorite')
	}
}
