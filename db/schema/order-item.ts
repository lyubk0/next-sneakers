import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'
import { order } from './order'
import { product } from './product'
import { size } from './size'

export const orderItem = pgTable('order_item', {
	id: serial('id').primaryKey(),

	orderId: integer('order_id')
		.notNull()
		.references(() => order.id, {
			onDelete: 'cascade',
		}),

	productId: integer('product_id')
		.notNull()
		.references(() => product.id),

	sizeId: integer('size_id')
		.notNull()
		.references(() => size.id),

	price: integer('price').notNull(),

	quantity: integer('quantity').notNull(),

	createdAt: timestamp('created_at', { withTimezone: false })
		.notNull()
		.defaultNow(),
})

export const orderItemRelations = relations(orderItem, ({ one }) => ({
	order: one(order, {
		fields: [orderItem.orderId],
		references: [order.id],
	}),
	product: one(product, {
		fields: [orderItem.productId],
		references: [product.id],
	}),
	size: one(size, {
		fields: [orderItem.sizeId],
		references: [size.id],
	}),
}))
