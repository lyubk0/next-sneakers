ALTER TABLE "product" ALTER COLUMN "sex" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."sex_enum";--> statement-breakpoint
CREATE TYPE "public"."sex_enum" AS ENUM('men', 'women');--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "sex" SET DATA TYPE "public"."sex_enum" USING "sex"::"public"."sex_enum";--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "sex" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "stripe_session_id" varchar(255);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "payment_intent_id" varchar(255);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "currency" varchar(10);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "payment_status" varchar(50);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "email" varchar(255);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "phone" varchar(50);--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shipping_address" text;--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "guest_id";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "checkout_session_url";--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_stripe_session_id_unique" UNIQUE("stripe_session_id");