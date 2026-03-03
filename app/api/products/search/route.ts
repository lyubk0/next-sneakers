import { db } from '@/db/drizzle'
import { product } from '@/db/schema/product'
import { ilike } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const q = searchParams.get('q')

	if (!q) {
		return NextResponse.json({ products: [] }, { status: 200 })
	}

	const products = await db
		.select()
		.from(product)
		.where(ilike(product.name, `%${q}%`))
		.limit(5)

	return NextResponse.json(products)
}
