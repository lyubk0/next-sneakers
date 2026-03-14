import { db } from '@/db/drizzle'
import { product } from '@/db/schema'
import { eq } from 'drizzle-orm'

interface GetProductBySlugParams {
	productSlug: string
}

export const getProductBySlug = async ({
	productSlug,
}: GetProductBySlugParams) => {
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
