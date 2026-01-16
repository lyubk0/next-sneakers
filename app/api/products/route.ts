import { Sex } from '@/@types/product'
import { db } from '@/db/drizzle'
import { favorite, product, size } from '@/db/schema'
import { getOrCreateGuestId } from '@/lib/user'
import { and, eq, exists, gte, inArray, lte } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const guestId = await getOrCreateGuestId()

	const url = new URL(req.url)

	//brands
	const brandsParam = url.searchParams.get('brands')
	const brandIds: number[] = brandsParam
		? brandsParam.split(',').map(Number)
		: []

	//sex
	const sexParam = url.searchParams.get('sex')

	const sexes = sexParam?.split(',') as Sex[] | undefined

	//price range
	const priceFromParam = url.searchParams.get('priceFrom')
	const priceFrom = priceFromParam ? Number(priceFromParam) : undefined

	const priceToParam = url.searchParams.get('priceTo')
	const priceTo = priceToParam ? Number(priceToParam) : undefined

	//sizes
	const sizesParam = url.searchParams.get('sizes')
	const sizes = sizesParam ? sizesParam.split(',') : []

	//colors
	const colorsParam = url.searchParams.get('colors')
	const colors = colorsParam ? colorsParam.split(',').map(Number) : []

	const products = await db.query.product.findMany({
		where: and(
			brandIds.length ? inArray(product.brandId, brandIds) : undefined,
			sexes?.length ? inArray(product.sex, sexes) : undefined,
			priceFrom ? gte(product.price, priceFrom) : undefined,
			priceTo ? lte(product.price, priceTo) : undefined,
			sizes.length
				? exists(
						db
							.select({ id: size.id })
							.from(size)
							.where(
								and(
									eq(size.product_id, product.id),
									inArray(size.eur_size, sizes)
								)
							)
				  )
				: undefined,
			colors.length ? inArray(product.colorId, colors) : undefined
		),
		with: { sizes: true },
	})

	const favoriteProducts = await db.query.favorite.findMany({
		where: eq(favorite.guest_id, guestId),
	})

	const favoriteIds = new Set(favoriteProducts.map(f => f.product_id))

	const productsWithFavorite = products.map(p => ({
		...p,
		isFavorite: favoriteIds.has(p.id),
	}))

	return NextResponse.json(productsWithFavorite)
}
