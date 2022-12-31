/*
  Warnings:

  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Macro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quantity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Step` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Unit` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "difficulty_enum" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "unit_enum" AS ENUM ('GRAM', 'KILOGRAM', 'LITER', 'MILLILITER', 'TEASPOON', 'TABLESPOON', 'CUP', 'PINCH', 'PIECE');

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Macro" DROP CONSTRAINT "Macro_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Quantity" DROP CONSTRAINT "Quantity_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "Quantity" DROP CONSTRAINT "Quantity_unitId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeImage" DROP CONSTRAINT "RecipeImage_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToTag" DROP CONSTRAINT "_RecipeToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToTag" DROP CONSTRAINT "_RecipeToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToTool" DROP CONSTRAINT "_RecipeToTool_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToTool" DROP CONSTRAINT "_RecipeToTool_B_fkey";

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "Macro";

-- DropTable
DROP TABLE "Quantity";

-- DropTable
DROP TABLE "Recipe";

-- DropTable
DROP TABLE "RecipeImage";

-- DropTable
DROP TABLE "Step";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "Tool";

-- DropTable
DROP TABLE "Unit";

-- DropEnum
DROP TYPE "DifficultyEnum";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "UnitEnum";

-- CreateTable
CREATE TABLE "recipes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" "difficulty_enum" NOT NULL,
    "rating" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "preparation_time" INTEGER NOT NULL,
    "cooking_time" INTEGER NOT NULL,
    "rest_time" INTEGER NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "for_how_many" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "macros" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "calories" INTEGER,
    "protein" INTEGER,
    "fat" INTEGER,
    "saturated" INTEGER,
    "carbs" INTEGER,
    "sugar" INTEGER,

    CONSTRAINT "macros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tools" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "steps" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quantities" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quantities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_images" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "recipe_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recipe_name" ON "recipes"("name");

-- CreateIndex
CREATE INDEX "recipe_difficulty" ON "recipes"("difficulty");

-- CreateIndex
CREATE INDEX "recipe_rating" ON "recipes"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "recipes_name_key" ON "recipes"("name");

-- CreateIndex
CREATE INDEX "macro_calories" ON "macros"("calories");

-- CreateIndex
CREATE INDEX "macro_protein" ON "macros"("protein");

-- CreateIndex
CREATE INDEX "tool_name" ON "tools"("name");

-- CreateIndex
CREATE INDEX "ingredient_name" ON "ingredients"("name");

-- CreateIndex
CREATE INDEX "unit_name" ON "units"("name");

-- AddForeignKey
ALTER TABLE "macros" ADD CONSTRAINT "macros_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quantities" ADD CONSTRAINT "quantities_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quantities" ADD CONSTRAINT "quantities_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_images" ADD CONSTRAINT "recipe_images_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToTag" ADD CONSTRAINT "_RecipeToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToTag" ADD CONSTRAINT "_RecipeToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToTool" ADD CONSTRAINT "_RecipeToTool_A_fkey" FOREIGN KEY ("A") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToTool" ADD CONSTRAINT "_RecipeToTool_B_fkey" FOREIGN KEY ("B") REFERENCES "tools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
