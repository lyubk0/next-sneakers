CREATE TYPE "public"."order_status" AS ENUM('IN_PENDING', 'PAID', 'CANCELED', 'SHIPPED', 'DELIVERED');--> statement-breakpoint
CREATE TABLE "order" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"guest_id" varchar(255),
	"status" "order_status" DEFAULT 'IN_PENDING' NOT NULL,
	"total_price" integer NOT NULL,
	"checkout_session_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;