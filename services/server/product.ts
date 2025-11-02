import { db } from '@/db/drizzle'
import { product } from '@/db/schema'
import { auth } from '@/lib/auth'
import { getOrCreateGuestId } from '@/lib/user'
import { eq, sql } from 'drizzle-orm'
import { headers } from 'next/headers'

interface GetProductBySlugParams {
	productSlug: string
}

export const getProductBySlug = async ({
	productSlug,
}: GetProductBySlugParams) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	const userId = session?.user?.id
	const guestId = await getOrCreateGuestId()

	const productFull = await db.query.product.findFirst({
		where: eq(product.slug, productSlug),
		with: {
			sizes: true,
		},
		extras: fields => ({
			isFavorited: userId
				? sql<boolean>`EXISTS (
            SELECT 1 FROM ${sql.raw('"favorite"')}
            WHERE ${sql.raw('"favorite"."product_id"')} = ${fields.id}
            AND ${sql.raw('"favorite"."user_id"')} = ${userId}
          )`.as('is_favorited')
				: guestId
				? sql<boolean>`EXISTS (
            SELECT 1 FROM ${sql.raw('"favorite"')}
            WHERE ${sql.raw('"favorite"."product_id"')} = ${fields.id}
            AND ${sql.raw('"favorite"."guest_id"')} = ${guestId}
          )`.as('is_favorited')
				: sql<boolean>`false`.as('is_favorited'),
		}),
	})

	return productFull
}
