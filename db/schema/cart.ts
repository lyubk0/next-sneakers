import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { cart_item } from './cart-item'

export const cart = pgTable('cart', {
	id: serial('id').primaryKey(),
	user_id: varchar('user_id', { length: 255 }),
	guest_id: varchar('guest_id', { length: 255 }).unique(),
	created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
	updated_at: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

export const cartRelation = relations(cart, ({ many }) => ({
	items: many(cart_item),
}))
