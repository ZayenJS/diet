/*
  Warnings:

  - You are about to drop the column `slug` on the `ingredients` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ingredients_slug_key";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "slug";
