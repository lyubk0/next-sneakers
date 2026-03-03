import { db } from '@/db/drizzle'
import { favorite } from '@/db/schema'
import { eq } from 'drizzle-orm/sql/expressions/conditions'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
	params: Promise<{
		productId: string
	}>
}
export async function GET(request: NextRequest, { params }: Params) {
	const { productId } = await params

	if (!productId) {
		return NextResponse.json(
			{ error: 'Product ID is required' },
			{ status: 400 },
		)
	}

	const favoriteProduct = await db.query.favorite.findFirst({
		where: eq(favorite.product_id, Number(productId)),
	})

	return NextResponse.json({ isFavorite: !!favoriteProduct })
}
