DROP INDEX "unique_favorite_idx";--> statement-breakpoint
ALTER TABLE "favorite" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "favorite" ADD COLUMN "guest_id" text;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_favorite_user_idx" ON "favorite" USING btree ("user_id","product_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_favorite_guest_idx" ON "favorite" USING btree ("guest_id","product_id");