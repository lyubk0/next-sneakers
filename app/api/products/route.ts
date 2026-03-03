import { Sex } from '@/@types/product'
import { db } from '@/db/drizzle'
import { favorite, product, size } from '@/db/schema'
import { getGuestId } from '@/lib/get-guest-id'
import { and, eq, exists, gte, inArray, lt, lte } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

const LIMIT = 8

export async function GET(req: NextRequest) {
	const guestId = await getGuestId()

	if (!guestId) {
		throw new Error('Guest ID not found')
	}

	const url = new URL(req.url)

	// pagination
	const cursorParam = url.searchParams.get('cursor')
	const cursor = cursorParam ? Number(cursorParam) : undefined

	// brands
	const brandsParam = url.searchParams.get('brands')
	const brandIds: number[] = brandsParam
		? brandsParam.split(',').map(Number)
		: []

	// sex
	const sexParam = url.searchParams.get('sex')
	const sexes = sexParam?.split(',') as Sex[] | undefined

	// price range
	const priceFromParam = url.searchParams.get('priceFrom')
	const priceFrom = priceFromParam ? Number(priceFromParam) : undefined

	const priceToParam = url.searchParams.get('priceTo')
	const priceTo = priceToParam ? Number(priceToParam) : undefined

	// sizes
	const sizesParam = url.searchParams.get('sizes')
	const sizes = sizesParam ? sizesParam.split(',') : []

	// colors
	const colorsParam = url.searchParams.get('colors')
	const colors = colorsParam ? colorsParam.split(',').map(Number) : []

	const items = await db.query.product.findMany({
		where: and(
			cursor ? lt(product.id, cursor) : undefined,
			brandIds.length ? inArray(product.brandId, brandIds) : undefined,
			sexes?.length ? inArray(product.sex, sexes) : undefined,
			priceFrom !== undefined ? gte(product.price, priceFrom) : undefined,
			priceTo !== undefined ? lte(product.price, priceTo) : undefined,
			sizes.length
				? exists(
						db
							.select({ id: size.id })
							.from(size)
							.where(
								and(
									eq(size.product_id, product.id),
									inArray(size.eur_size, sizes),
								),
							),
					)
				: undefined,
			colors.length ? inArray(product.colorId, colors) : undefined,
		),
		with: {
			sizes: true,
		},
		extras: {
			isFavorite: exists(
				db
					.select({ id: favorite.product_id })
					.from(favorite)
					.where(
						and(
							eq(favorite.product_id, product.id),
							eq(favorite.guest_id, guestId),
						),
					),
			).as('isFavorite'),
		},
		limit: LIMIT + 1,
		orderBy: (product, { desc }) => desc(product.id),
	})

	const hasNextPage = items.length > LIMIT
	const products = hasNextPage ? items.slice(0, -1) : items
	const nextCursor = hasNextPage ? products.at(-1)?.id : undefined

	return NextResponse.json({ items: products, nextCursor })
}
