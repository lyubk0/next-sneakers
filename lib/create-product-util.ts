import 'dotenv/config'
;('use server')

import { db } from '@/db/drizzle'
import { brand, product, size } from '@/db/schema'
import * as readline from 'readline'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

function question(prompt: string): Promise<string> {
	return new Promise(resolve => {
		rl.question(prompt, resolve)
	})
}

async function createProduct() {
	console.log('\n=== Создание нового продукта ===\n')

	try {
		// Показываем доступные бренды
		const brands = await db.select().from(brand)
		console.log('Доступные бренды:')
		brands.forEach(b => console.log(`  ${b.id}. ${b.name}`))
		console.log('')

		// Собираем данные
		const name = await question('Название продукта: ')
		const slug = await question('Slug (URL): ')
		const description = await question('Описание: ')
		const priceStr = await question('Цена (в копейках, например 5990): ')
		const price = parseInt(priceStr)
		const color = await question('Цвет: ')
		const brandIdStr = await question('ID бренда: ')
		const brandId = parseInt(brandIdStr)

		// Изображения
		console.log(
			'\nВведите пути к изображениям (по одному на строку, пустая строка для завершения):'
		)
		const images: string[] = []
		while (true) {
			const img = await question(`Изображение ${images.length + 1}: `)
			if (!img) break
			images.push(img)
		}

		// Создаём продукт
		const [newProduct] = await db
			.insert(product)
			.values({
				name,
				slug,
				description: description || null,
				price,
				color,
				images,
				brandId,
				inStock: true,
			})
			.returning()

		console.log(`\n✅ Продукт создан! ID: ${newProduct.id}`)

		// Добавляем размеры
		const addSizes = await question('\nДобавить размеры? (y/n): ')
		if (addSizes.toLowerCase() === 'y') {
			console.log('\nВводите размеры (пустая строка для завершения):')

			while (true) {
				const eurSizeStr = await question('  EUR размер (например, 42.5): ')
				if (!eurSizeStr) break

				const cmSizeStr = await question('  CM размер (например, 27.5): ')
				const quantityStr = await question('  Количество: ')

				await db.insert(size).values({
					eur_size: eurSizeStr || null,
					cm_size: cmSizeStr || null,
					quantity: parseInt(quantityStr) || 0,
					product_id: newProduct.id,
				})

				console.log('  ✅ Размер добавлен\n')
			}
		}

		console.log('\n🎉 Продукт полностью создан!')

		// Создать ещё один?
		const createAnother = await question('\nСоздать ещё один продукт? (y/n): ')
		if (createAnother.toLowerCase() === 'y') {
			await createProduct()
		} else {
			rl.close()
			process.exit(0)
		}
	} catch (error) {
		console.error('❌ Ошибка:', error)
		rl.close()
		process.exit(1)
	}
}

// Запуск
createProduct()
