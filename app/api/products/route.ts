import { db } from '@/db/drizzle'
import { category, favorite } from '@/db/schema'
import { auth } from '@/lib/auth'
import { getOrCreateGuestId } from '@/lib/user'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)

	const session = await auth.api.getSession({
		headers: await headers(),
	})

	const userId = session?.user?.id
	const guestId = await getOrCreateGuestId()
	const categoryParam = searchParams.get('category')

	const cat = await db.query.category.findFirst({
		where: eq(category.name, categoryParam as string),
	})

	if (!cat) return NextResponse.json([])

	const products = await db.query.product.findMany({
		with: {
			category: true,
			sizes: true,
		},
	})

	const favoriteProducts = await db.query.favorite.findMany({
		where: userId
			? eq(favorite.user_id, userId)
			: eq(favorite.guest_id, guestId),
	})

	const favoriteIds = new Set(favoriteProducts.map(f => f.product_id))

	const productsWithFavorite = products.map(p => ({
		...p,
		isFavorite: favoriteIds.has(p.id),
	}))

	return NextResponse.json(productsWithFavorite)
}
