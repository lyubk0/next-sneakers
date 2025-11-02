ALTER TABLE "color_image" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "product_color" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "color_image" CASCADE;--> statement-breakpoint
DROP TABLE "product_color" CASCADE;--> statement-breakpoint
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_color_id_product_color_id_fk";
--> statement-breakpoint
ALTER TABLE "size" DROP CONSTRAINT "size_color_id_product_color_id_fk";
--> statement-breakpoint
DROP INDEX "product_slug_idx";--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "in_stock" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "color" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "images" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "size" ADD COLUMN "product_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "size" ADD CONSTRAINT "size_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_item" DROP COLUMN "color_id";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN "preview_image_url";--> statement-breakpoint
ALTER TABLE "size" DROP COLUMN "color_id";--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_slug_unique" UNIQUE("slug");