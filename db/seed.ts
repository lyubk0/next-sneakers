import { eq } from 'drizzle-orm'
import { db } from './drizzle'
import { product, size } from './schema'

async function seed() {
	// Проверяем, есть ли уже этот товар
	const existing = await db
		.select()
		.from(product)
		.where(eq(product.slug, 'new-balance-9060-rain-cloud-u9060gry'))

	if (existing.length > 0) {
		console.log('⚠️ Product already exists, skipping.')
		return
	}

	// Вставляем продукт
	const inserted = await db
		.insert(product)
		.values({
			name: 'New Balance 9060 Rain Cloud U9060GRY',
			slug: 'new-balance-9060-rain-cloud-u9060gry',
			description:
				'New Balance 9060 — ці кросівки є стильним і функціональним взуттям, яке поєднує в собі сучасний дизайн і передові технології. Вони є одними з нових моделей від всесвітньо відомого бренду New Balance, який славиться своєю якістю та комфортом. New Balance 9060 — це взуття, розроблене для тих, хто цінує комфорт, якість та стиль. Вони ідеально підходять для будь-якої активності, від спорту до повсякденного життя. Якщо Ви шукаєте надійну та сучасну пару кросівок, New Balance 9060 саме те, що Вам потрібно.',
			price: 3750,
			color: 'Rain Cloud',
			inStock: true,
			categoryId: 3, // ⚠️ замени на актуальную категорию
			images: [
				'https://sneakers.com.ua/image/cache/catalog/image/catalog/image/catalog/image/newbalance/9060/fks56975/24321.webp',
				'https://sneakers.com.ua/image/cache/catalog/image/catalog/image/catalog/image/newbalance/9060/fks56975/24322.webp',
			],
		})
		.returning({ id: product.id })

	const productId = inserted[0].id

	// Добавляем размеры 36–45
	const sizes = Array.from({ length: 10 }, (_, i) => 36 + i)

	await db.insert(size).values(
		sizes.map(eur => ({
			eur_size: eur.toString(),
			cm_size: (eur * 0.667).toFixed(2),
			quantity: 10,
			product_id: productId,
		}))
	)

	console.log(
		`✅ Product added: New Balance 9060 Rain Cloud U9060GRY with ${sizes.length} sizes`
	)
}

seed()
	.then(() => {
		console.log('🌱 Seeding finished')
		process.exit(0)
	})
	.catch(err => {
		console.error(err)
		process.exit(1)
	})
