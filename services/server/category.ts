import { db } from '@/db/drizzle'
import { category } from '@/db/schema'

export const getAll = async () => {
	const categories = await db.select().from(category)

	return categories
}
