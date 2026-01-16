import { db } from '@/db/drizzle'
import { favorite } from '@/db/schema'
import { getOrCreateGuestId } from '@/lib/user'
import { eq } from 'drizzle-orm'

export const getAll = async () => {
	const guestId = await getOrCreateGuestId()

	const favorites = await db.query.favorite.findMany({
		where: eq(favorite.guest_id, guestId),
		with: { product: true },
	})

	return favorites
}
