import { Product } from '@/@types/product.types'
import { Sex } from '@/constants/product.constants'
import { db } from '@/db/drizzle'
import { favorite, product, size } from '@/db/schema'
import { getGuestId } from '@/lib/get-guest-id'
import { getOrderBy } from '@/lib/get-order-by'
import { and, eq, exists, gte, inArray, lte, sql } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_LIMIT = 8

export interface GetAllProductsApiResponse {
	items: Product[]
	pagination: {
		page: number
		limit: number
		total: number
		totalPages: number
		hasNextPage: boolean
		hasPrevPage: boolean
	}
}

export async function GET(
	req: NextRequest,
): Promise<NextResponse<GetAllProductsApiResponse>> {
	const guestId = await getGuestId()

	if (!guestId) {
		throw new Error('Guest ID not found')
	}

	const url = new URL(req.url)

	const limit = Number(url.searchParams.get('limit')) || DEFAULT_LIMIT
	const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
	const offset = (page - 1) * limit

	const sort = url.searchParams.get('sort') ?? undefined

	const brandIds = url.searchParams.get('brands')?.split(',').map(Number) ?? []
	const sexes = url.searchParams.get('sex')?.split(',') as Sex[] | undefined
	const priceFrom = url.searchParams.get('priceFrom')
		? Number(url.searchParams.get('priceFrom'))
		: undefined
	const priceTo = url.searchParams.get('priceTo')
		? Number(url.searchParams.get('priceTo'))
		: undefined
	const sizes = url.searchParams.get('sizes')?.split(',') ?? []
	const colors = url.searchParams.get('colors')?.split(',').map(Number) ?? []

	const whereConditions = and(
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
	)

	const [rawItems, [{ total }]] = await Promise.all([
		db.query.product.findMany({
			where: whereConditions,
			with: { sizes: true },
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
			limit,
			offset,
			orderBy: getOrderBy(sort),
		}),
		db
			.select({ total: sql<number>`cast(count(*) as int)` })
			.from(product)
			.where(whereConditions),
	])

	const items: Product[] = rawItems.map(item => ({
		...item,
		isFavorite: Boolean(item.isFavorite),
	}))

	const totalPages = Math.ceil(total / limit)

	return NextResponse.json<GetAllProductsApiResponse>({
		items,
		pagination: {
			page,
			limit,
			total,
			totalPages,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1,
		},
	})
}
