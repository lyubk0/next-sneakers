import { product } from 'db/schema/product'
import { size } from 'db/schema/size'
import 'dotenv/config'
import fs from 'fs'
import { db } from './drizzle'

async function seed() {
	const raw = fs.readFileSync('./products_with_sizes_full.json', 'utf-8')
	const data = JSON.parse(raw)

	console.log('Seeding started...')

	for (const item of data) {
		// 1. Создаём продукт
		const [createdProduct] = await db
			.insert(product)
			.values({
				name: item.name,
				slug: item.slug,
				price: item.price_usd,
				inStock: true,
				colorId: 1,
				brandId: 5,
				groupSlug: item.groupSlug,
				description: item.appearance_en,
				images: item.images_local,
				sex: 'men',
			})
			.returning()

		// 2. Создаём размеры, привязанные к продукту
		if (item.sizes?.length) {
			await db.insert(size).values(
				item.sizes.map((s: { eur_size: number; cm_size: number }) => ({
					eur_size: s.eur_size.toString(),
					cm_size: s.cm_size.toString(),
					product_id: createdProduct.id,
				})),
			)
		}
	}

	console.log('Seeding completed 🚀')
	process.exit(0)
}

seed().catch(err => {
	console.error(err)
	process.exit(1)
})
