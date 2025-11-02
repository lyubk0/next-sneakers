import { relations } from 'drizzle-orm'
import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
} from 'drizzle-orm/pg-core'
import { user } from './auth'
import { product } from './product'

export const favorite = pgTable(
	'favorite',
	{
		id: serial('id').primaryKey(),

		user_id: text('user_id').references(() => user.id, {
			onDelete: 'cascade',
		}),

		guest_id: text('guest_id'),

		product_id: integer('product_id')
			.references(() => product.id, { onDelete: 'cascade' })
			.notNull(),

		created_at: timestamp('created_at', { mode: 'date' })
			.defaultNow()
			.notNull(),
	},
	table => [
		uniqueIndex('unique_favorite_user_idx').on(table.user_id, table.product_id),
		uniqueIndex('unique_favorite_guest_idx').on(
			table.guest_id,
			table.product_id
		),
	]
)

export const favoriteRelations = relations(favorite, ({ one }) => ({
	user: one(user, {
		fields: [favorite.user_id],
		references: [user.id],
	}),
	product: one(product, {
		fields: [favorite.product_id],
		references: [product.id],
	}),
}))
