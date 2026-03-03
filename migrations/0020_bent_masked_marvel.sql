ALTER TABLE "order" ALTER COLUMN "stripe_session_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "payment_intent_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "currency" SET DEFAULT 'USD';--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "currency" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "payment_status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "payment_status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "phone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipping_name" varchar(255);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipping_city" varchar(255);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipping_country" varchar(10);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipping_line1" varchar(255);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipping_line2" varchar(255);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipping_postal_code" varchar(50);--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "shipping_address";