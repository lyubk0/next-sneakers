import { db } from '@/db/drizzle'
import { category, favorite, product } from '@/db/schema'
import { auth } from '@/lib/auth'
import { getOrCreateGuestId } from '@/lib/user'
import { eq, getTableColumns, sql } from 'drizzle-orm'
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

	const favoriteCheck = userId
		? sql<boolean>`EXISTS (
        SELECT 1 FROM ${favorite}
        WHERE ${favorite.product_id} = ${product.id}
        AND ${favorite.user_id} = ${userId}
      )`
		: guestId
		? sql<boolean>`EXISTS (
        SELECT 1 FROM ${favorite}
        WHERE ${favorite.product_id} = ${product.id}
        AND ${favorite.guest_id} = ${guestId}
      )`
		: sql<boolean>`false`

	const products = await db
		.select({
			...getTableColumns(product),
			category: getTableColumns(category),
			isFavorite: favoriteCheck,
		})
		.from(product)
		.leftJoin(category, eq(category.id, product.categoryId))
		.where(eq(product.categoryId, cat.id))

	return NextResponse.json(products)
}
