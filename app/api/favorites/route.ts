import { getOrCreateGuestId } from '@/actions/get-or-create-guest-id'
import { db } from '@/db/drizzle'
import { favorite } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const guestId = await getOrCreateGuestId()

	const favorites = await db.query.favorite.findMany({
		where: eq(favorite.guest_id, guestId),
		with: {
			product: {
				with: { category: true },
			},
		},
	})

	const favoriteProducts = favorites.map(fav => {
		return { ...fav.product, isFavorite: true }
	})

	return NextResponse.json(favoriteProducts)
}
