CREATE TABLE "color" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"hex" varchar(7) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "color_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "product" RENAME COLUMN "color" TO "color_id";--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "group_slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_color_id_color_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."color"("id") ON DELETE restrict ON UPDATE no action;