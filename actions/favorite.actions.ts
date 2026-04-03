'use server'

import { db } from '@/db/drizzle'
import { favorite } from '@/db/schema'
import { getGuestId } from '@/lib/get-guest-id'
import { and, eq } from 'drizzle-orm'

export const toggleFavorite = async (
	productId: number,
): Promise<{ added: boolean }> => {
	const guestId = await getGuestId()

	if (!guestId) {
		throw new Error('Guest id not found')
	}

	const favoriteItem = await db.query.favorite.findFirst({
		where: and(
			eq(favorite.product_id, productId),
			eq(favorite.guest_id, guestId),
		),
	})

	if (favoriteItem) {
		await db.delete(favorite).where(eq(favorite.id, favoriteItem.id))
		console.log('deleted')
		return { added: false }
	} else {
		await db
			.insert(favorite)
			.values({ product_id: productId, guest_id: guestId })
		console.log('inserted')
		return { added: true }
	}
}
