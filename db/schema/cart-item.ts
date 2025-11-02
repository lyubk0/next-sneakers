import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'
import { cart } from './cart'
import { product } from './product'
import { size } from './size'

export const cart_item = pgTable('cart_item', {
	id: serial('id').primaryKey(),

	cart_id: integer('cart_id')
		.references(() => cart.id, { onDelete: 'cascade' })
		.notNull(),

	product_id: integer('product_id')
		.references(() => product.id, { onDelete: 'cascade' })
		.notNull(),

	size_id: integer('size_id')
		.references(() => size.id, { onDelete: 'cascade' })
		.notNull(),

	quantity: integer('quantity').default(1).notNull(),

	created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
	updated_at: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

export const cartItemRelations = relations(cart_item, ({ one }) => ({
	cart: one(cart, {
		fields: [cart_item.cart_id],
		references: [cart.id],
	}),
	product: one(product, {
		fields: [cart_item.product_id],
		references: [product.id],
	}),
	size: one(size, {
		fields: [cart_item.size_id],
		references: [size.id],
	}),
}))
