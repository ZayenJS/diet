-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_images" DROP CONSTRAINT "recipe_images_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_recipe_id_fkey";

-- AlterTable
ALTER TABLE "ingredients" ALTER COLUMN "recipe_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "recipe_images" ALTER COLUMN "recipe_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "steps" ALTER COLUMN "recipe_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_images" ADD CONSTRAINT "recipe_images_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
