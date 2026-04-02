import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { product } from './product.schema'

export const color = pgTable('color', {
	id: serial('id').primaryKey(),

	name: varchar('name', { length: 100 }).notNull(),

	slug: varchar('slug', { length: 100 }).unique().notNull(),

	hex: varchar('hex', { length: 7 }).notNull(),

	createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const colorRelations = relations(color, ({ many }) => ({
	products: many(product),
}))
