ALTER TABLE "cart_item" ALTER COLUMN "quantity" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN "color_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN "size_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_color_id_product_color_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."product_color"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_size_id_size_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."size"("id") ON DELETE cascade ON UPDATE no action;