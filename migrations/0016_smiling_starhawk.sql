ALTER TABLE "category" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "category" CASCADE;--> statement-breakpoint
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_category_id_fk";
--> statement-breakpoint
DROP INDEX "unique_favorite_user_idx";--> statement-breakpoint
ALTER TABLE "cart" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "favorite" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN "category_id";