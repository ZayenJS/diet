/*
  Warnings:

  - You are about to drop the column `recipeId` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `macros` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientId` on the `quantities` table. All the data in the column will be lost.
  - You are about to drop the column `unitId` on the `quantities` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `recipe_images` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `steps` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `tools` table. All the data in the column will be lost.
  - Added the required column `recipe_id` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `macros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredient_id` to the `quantities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_id` to the `quantities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `recipe_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `tools` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "macros" DROP CONSTRAINT "macros_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "quantities" DROP CONSTRAINT "quantities_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "quantities" DROP CONSTRAINT "quantities_unitId_fkey";

-- DropForeignKey
ALTER TABLE "recipe_images" DROP CONSTRAINT "recipe_images_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_recipeId_fkey";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "recipeId",
ADD COLUMN     "recipe_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "macros" DROP COLUMN "recipeId",
ADD COLUMN     "recipe_id" INTEGER NOT NULL,
ALTER COLUMN "protein" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "saturated" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "carbs" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "sugar" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "quantities" DROP COLUMN "ingredientId",
DROP COLUMN "unitId",
ADD COLUMN     "ingredient_id" INTEGER NOT NULL,
ADD COLUMN     "unit_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "recipe_images" DROP COLUMN "recipeId",
ADD COLUMN     "recipe_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "steps" DROP COLUMN "recipeId",
ADD COLUMN     "recipe_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tools" DROP COLUMN "recipeId",
ADD COLUMN     "recipe_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "macros" ADD CONSTRAINT "macros_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quantities" ADD CONSTRAINT "quantities_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quantities" ADD CONSTRAINT "quantities_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_images" ADD CONSTRAINT "recipe_images_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
