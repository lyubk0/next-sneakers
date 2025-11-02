import { relations } from 'drizzle-orm'
import {
	pgTable,
	serial,
	timestamp,
	uniqueIndex,
	varchar,
} from 'drizzle-orm/pg-core'
import { product } from './product'

export const category = pgTable(
	'category',
	{
		id: serial('id').primaryKey(),
		name: varchar('name', { length: 255 }).notNull(),
		slug: varchar('slug', { length: 255 }).notNull(),
		created_at: timestamp('created_at', { mode: 'date' })
			.defaultNow()
			.notNull(),
	},
	table => [uniqueIndex('category_slug_idx').on(table.slug)]
)

export const categoryRelation = relations(category, ({ many }) => ({
	product: many(product),
}))
