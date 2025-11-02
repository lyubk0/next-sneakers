ALTER TABLE "inventory" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "inventory" CASCADE;--> statement-breakpoint
ALTER TABLE "size" ADD COLUMN "color_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "size" ADD CONSTRAINT "size_color_id_product_color_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."product_color"("id") ON DELETE cascade ON UPDATE no action;