/*
  Warnings:

  - Changed the type of `unit` on the `ingredients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `difficulty` on the `recipes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "unit" AS ENUM ('GRAM', 'KILOGRAM', 'LITER', 'MILLILITER', 'TEASPOON', 'TABLESPOON', 'CUP', 'PINCH', 'PIECE');

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "unit",
ADD COLUMN     "unit" "unit" NOT NULL;

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "category_id" INTEGER,
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "difficulty" NOT NULL;

-- DropEnum
DROP TYPE "difficulty_enum";

-- DropEnum
DROP TYPE "unit_enum";

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recipe_difficulty" ON "recipes"("difficulty");

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
