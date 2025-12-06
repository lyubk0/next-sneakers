import { eq } from 'drizzle-orm'
import { db } from './drizzle'
import { brand } from './schema/brand'
import { category } from './schema/category'
import { product } from './schema/product'
import { size } from './schema/size'

async function seed() {
	console.log('🧹 Очистка таблиц...')

	// Важно соблюдать порядок: сначала дочерние таблицы
	await db.delete(size)
	await db.delete(product)
	await db.delete(brand)
	// Если хочешь чистить категории — добавь ниже
	// await db.delete(category)

	console.log('✅ Таблицы очищены.')

	// --- Добавляем бренд Nike ---
	const [insertedNikeBrand] = await db
		.insert(brand)
		.values({
			name: 'Nike',
			slug: 'nike',
		})
		.returning({ id: brand.id })

	const nikeBrandId = insertedNikeBrand.id

	// --- Добавляем бренд New Balance ---
	const [insertedBrand] = await db
		.insert(brand)
		.values({
			name: 'New Balance',
			slug: 'new-balance',
		})
		.returning({ id: brand.id })

	const brandId = insertedBrand.id

	// --- Проверяем категорию (например, кроссовки) ---
	let categoryId = 1
	const existingCategory = await db
		.select()
		.from(category)
		.where(eq(category.slug, 'krosivky'))

	if (existingCategory.length === 0) {
		const [newCategory] = await db
			.insert(category)
			.values({
				name: 'Кросівки',
				slug: 'krosivky',
			})
			.returning({ id: category.id })
		categoryId = newCategory.id
	} else {
		categoryId = existingCategory[0].id
	}

	// --- Добавляем продукт Nike ---
	const [insertedNikeProduct] = await db
		.insert(product)
		.values({
			name: 'Nike Dunk Low Grey Fog DD1391-103',
			slug: 'nike-dunk-low-grey-fog-dd1391-103',
			description:
				'Nike Dunk Low Grey Fog — класичні кросівки з елегантним сірим дизайном. Ідеальний вибір для повсякденного носіння.',
			price: 3711,
			color: 'Grey Fog',
			inStock: true,
			categoryId,
			brandId: nikeBrandId,
			images: [
				'https://sneakers.com.ua/image/cache/catalog/image/catalog/image/catalog/image/nike/dunk/s-56604/62862.webp',
				'https://sneakers.com.ua/image/cache/catalog/image/cache/catalog/image/catalog/image/nike/dunk/s-56604/62861-623x627.webp',
			],
		})
		.returning({ id: product.id })

	const nikeProductId = insertedNikeProduct.id

	// --- Добавляем размеры для Nike ---
	const nikeSizes = [36, 37, 38, 39, 40, 41]
	await db.insert(size).values(
		nikeSizes.map(eur => ({
			eur_size: eur.toString(),
			cm_size: (eur * 0.667).toFixed(2),
			quantity: 10,
			product_id: nikeProductId,
		}))
	)

	console.log(
		`✅ Добавлен продукт: Nike Dunk Low Grey Fog DD1391-103 (${nikeSizes.length} размеров)`
	)

	// --- Добавляем продукт New Balance ---
	const [insertedProduct] = await db
		.insert(product)
		.values({
			name: 'New Balance 9060 Rain Cloud U9060GRY',
			slug: 'new-balance-9060-rain-cloud-u9060gry',
			description:
				'New Balance 9060 — це стильні кросівки, що поєднують сучасний дизайн і комфорт. Вони ідеально підходять для активного способу життя.',
			price: 3750,
			color: 'Rain Cloud',
			inStock: true,
			categoryId,
			brandId,
			images: [
				'https://sneakers.com.ua/image/cache/catalog/image/cache/catalog/image/catalog/image/newbalance/9060/fks56975/24321-623x627.webp',
				'https://sneakers.com.ua/image/cache/catalog/image/cache/catalog/image/catalog/image/newbalance/9060/fks56975/24322-623x627.webp',
			],
		})
		.returning({ id: product.id })

	const productId = insertedProduct.id

	// --- Добавляем размеры для New Balance ---
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
		`✅ Добавлен продукт: New Balance 9060 Rain Cloud U9060GRY (${sizes.length} размеров)`
	)
}

seed()
	.then(() => {
		console.log('🌱 Seeding завершён')
		process.exit(0)
	})
	.catch(err => {
		console.error('❌ Ошибка при сидировании:', err)
		process.exit(1)
	})
