CREATE TYPE "public"."sex_enum" AS ENUM('unisex', 'men', 'women');--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "sex" "sex_enum" DEFAULT 'unisex' NOT NULL;