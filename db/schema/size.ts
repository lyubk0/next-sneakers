import { relations } from 'drizzle-orm'
import { decimal, integer, pgTable, serial } from 'drizzle-orm/pg-core'
import { product } from './product'

export const size = pgTable('size', {
	id: serial('id').primaryKey(),

	eur_size: decimal('eur_size', { precision: 5, scale: 2 }),
	cm_size: decimal('cm_size', { precision: 5, scale: 2 }),

	product_id: integer('product_id')
		.references(() => product.id, { onDelete: 'cascade' })
		.notNull(),
})

export const sizeRelations = relations(size, ({ one }) => ({
	product: one(product, {
		fields: [size.product_id],
		references: [product.id],
	}),
}))
