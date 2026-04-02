import { db } from '@/db/drizzle'
import { product } from '@/db/schema/product.schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ groupSlug: string }> },
) {
	const { groupSlug } = await params

	const products = await db.query.product.findMany({
		where: eq(product.groupSlug, groupSlug),
	})

	if (!products.length) {
		return NextResponse.json({ error: 'Not found' }, { status: 404 })
	}

	return NextResponse.json(products)
}
