import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { product } from './product.schema'

export const size = pgTable('size', {
	id: serial('id').primaryKey(),
	eur_size: varchar('eur_size', { length: 10 }),
	cm_size: varchar('cm_size', { length: 10 }),
	quantity: integer('quantity').notNull().default(0),
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
