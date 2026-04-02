import { relations } from 'drizzle-orm'
import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
} from 'drizzle-orm/pg-core'
import { product } from './product.schema'

export const favorite = pgTable(
	'favorite',
	{
		id: serial('id').primaryKey(),

		guest_id: text('guest_id'),

		product_id: integer('product_id')
			.references(() => product.id, { onDelete: 'cascade' })
			.notNull(),

		created_at: timestamp('created_at', { mode: 'date' })
			.defaultNow()
			.notNull(),
	},
	table => [
		uniqueIndex('unique_favorite_guest_idx').on(
			table.guest_id,
			table.product_id,
		),
	],
)

export const favoriteRelations = relations(favorite, ({ one }) => ({
	product: one(product, {
		fields: [favorite.product_id],
		references: [product.id],
	}),
}))
