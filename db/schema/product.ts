import { relations } from 'drizzle-orm'
import {
	boolean,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'
import { category } from './category'
import { favorite } from './favorite'
import { size } from './size'

export const product = pgTable('product', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).unique().notNull(),
	description: text('description'),
	price: integer('price').notNull(),
	inStock: boolean('in_stock').default(true).notNull(),

	color: varchar('color', { length: 100 }).notNull(),

	images: text('images').array().notNull(),

	categoryId: integer('category_id')
		.references(() => category.id, { onDelete: 'cascade' })
		.notNull(),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const productRelations = relations(product, ({ one, many }) => ({
	category: one(category, {
		fields: [product.categoryId],
		references: [category.id],
	}),
	favorites: many(favorite),
	sizes: many(size),
}))
