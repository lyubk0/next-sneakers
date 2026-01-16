import { relations } from 'drizzle-orm'
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'
import { brand } from './brand'
import { color } from './color'
import { favorite } from './favorite'
import { size } from './size'

export const sexEnum = pgEnum('sex_enum', ['unisex', 'men', 'women'])

export const product = pgTable('product', {
	id: serial('id').primaryKey(),

	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).unique().notNull(),
	description: text('description'),
	price: integer('price').notNull(),

	images: text('images').array().notNull(),
	inStock: boolean('in_stock').default(true).notNull(),

	colorId: integer('color_id')
		.references(() => color.id, { onDelete: 'restrict' })
		.notNull(),

	brandId: integer('brand_id')
		.references(() => brand.id, { onDelete: 'cascade' })
		.notNull(),

	sex: sexEnum('sex').default('unisex').notNull(),

	groupSlug: varchar('group_slug', { length: 255 }).notNull(),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const productRelations = relations(product, ({ one, many }) => ({
	brand: one(brand, {
		fields: [product.brandId],
		references: [brand.id],
	}),
	color: one(color, {
		fields: [product.colorId],
		references: [color.id],
	}),
	favorites: many(favorite),
	sizes: many(size),
}))
