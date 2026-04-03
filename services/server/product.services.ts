import { GetAllProductsApiResponse } from '@/app/api/products/route'
import { ProductSearchParams } from '@/constants/products-search-params.constants'
import { db } from '@/db/drizzle'
import { favorite, product, size } from '@/db/schema'
import { getGuestId } from '@/lib/get-guest-id'
import { getOrderBy } from '@/lib/get-order-by'
import { and, eq, exists, gte, inArray, lte, sql } from 'drizzle-orm'

const DEFAULT_LIMIT = 8

export async function getProducts(
	params: ProductSearchParams = {},
): Promise<GetAllProductsApiResponse> {
	const {
		brands = [],
		sexes = [],
		priceFrom,
		priceTo,
		sizes = [],
		colors = [],
		sort,
		page = 1,
		limit = DEFAULT_LIMIT,
	} = params

	const guestId = await getGuestId()
	if (!guestId) throw new Error('Guest ID not found')

	const offset = (page - 1) * limit

	const whereConditions = and(
		brands.length ? inArray(product.brandId, brands) : undefined,
		sexes.length ? inArray(product.sex, sexes) : undefined,
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
		colors.length ? inArray(product.colorId, colors.map(Number)) : undefined,
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

	const totalPages = Math.ceil(total / limit)

	return {
		items: rawItems.map(item => ({
			...item,
			isFavorite: Boolean(item.isFavorite),
		})),
		pagination: {
			page,
			limit,
			total,
			totalPages,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1,
		},
	}
}

export const getProductBySlug = async ({
	productSlug,
}: {
	productSlug: string
}) => {
	try {
		const productFull = await db.query.product.findFirst({
			where: eq(product.slug, productSlug),
			with: {
				sizes: true,
			},
		})

		return productFull
	} catch (error) {
		console.error('Error fetching product by slug:', error)
		throw error
	}
}
