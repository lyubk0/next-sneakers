import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'

import { pgEnum } from 'drizzle-orm/pg-core'
import { user } from './auth'

export const orderStatusEnum = pgEnum('order_status', [
	'IN_PENDING',
	'PAID',
	'CANCELED',
	'SHIPPED',
	'DELIVERED',
])

export const order = pgTable('order', {
	id: serial('id').primaryKey(),

	userId: text('user_id').references(() => user.id, {
		onDelete: 'set null',
	}),

	status: orderStatusEnum('status').notNull().default('IN_PENDING'),

	totalPrice: integer('total_price').notNull(),

	stripeSessionId: varchar('stripe_session_id', { length: 255 })
		.unique()
		.notNull(),

	paymentIntentId: varchar('payment_intent_id', { length: 255 }).notNull(),

	currency: varchar('currency', { length: 10 }).notNull().default('USD'),

	paymentStatus: varchar('payment_status', { length: 50 })
		.notNull()
		.default('pending'),

	email: varchar('email', { length: 255 }).notNull(),
	phone: varchar('phone', { length: 50 }).notNull(),

	shippingName: varchar('shipping_name', { length: 255 }),
	shippingCity: varchar('shipping_city', { length: 255 }),
	shippingCountry: varchar('shipping_country', { length: 10 }),
	shippingLine1: varchar('shipping_line1', { length: 255 }),
	shippingLine2: varchar('shipping_line2', { length: 255 }),
	shippingPostalCode: varchar('shipping_postal_code', { length: 50 }),

	createdAt: timestamp('created_at', { withTimezone: false })
		.notNull()
		.defaultNow(),

	updatedAt: timestamp('updated_at', { withTimezone: false })
		.notNull()
		.defaultNow(),
})
