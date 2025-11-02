import { db } from '@/db/drizzle'
import { favorite } from '@/db/schema'
import { auth } from '@/lib/auth'
import { getOrCreateGuestId } from '@/lib/user'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

export const getAll = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	const userId = session?.user?.id
	const guestId = await getOrCreateGuestId()

	const favorites = await db.query.favorite.findMany({
		where: userId
			? eq(favorite.user_id, userId)
			: eq(favorite.guest_id, guestId),
		with: { product: true },
	})

	return favorites
}
