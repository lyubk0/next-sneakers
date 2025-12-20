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

	guestId: varchar('guest_id', { length: 255 }),

	status: orderStatusEnum('status').notNull().default('IN_PENDING'),

	totalPrice: integer('total_price').notNull(),

	checkoutSessionUrl: text('checkout_session_url'),

	createdAt: timestamp('created_at', { withTimezone: false })
		.notNull()
		.defaultNow(),

	updatedAt: timestamp('updated_at', { withTimezone: false })
		.notNull()
		.defaultNow(),
})
