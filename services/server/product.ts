import { db } from '@/db/drizzle'
import { product } from '@/db/schema'
import { auth } from '@/lib/auth'
import { getGuestId } from '@/lib/get-guest-id'
import { eq, sql } from 'drizzle-orm'
import { headers } from 'next/headers'

interface GetProductBySlugParams {
	productSlug: string
}

export const getProductBySlug = async ({
	productSlug,
}: GetProductBySlugParams) => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		})

		const guestId = await getGuestId()

		const productFull = await db.query.product.findFirst({
			where: eq(product.slug, productSlug),
			with: {
				sizes: true,
			},
			extras: fields => ({
				isFavorite: guestId
					? sql<boolean>`EXISTS (
        SELECT 1 FROM "favorite"
        WHERE "favorite"."product_id" = ${fields.id}
        AND "favorite"."guest_id" = ${guestId}
      )`.as('is_favorited')
					: sql<boolean>`false`.as('is_favorited'),
			}),
		})

		return productFull
	} catch (error) {
		console.error('Error fetching product by slug:', error)
		throw error
	}
}
