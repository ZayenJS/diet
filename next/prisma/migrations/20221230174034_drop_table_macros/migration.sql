/*
  Warnings:

  - You are about to drop the `macros` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_id_fkey";

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "calories" INTEGER,
ADD COLUMN     "carbs" DOUBLE PRECISION,
ADD COLUMN     "fat" DOUBLE PRECISION,
ADD COLUMN     "protein" DOUBLE PRECISION,
ADD COLUMN     "saturated" DOUBLE PRECISION,
ADD COLUMN     "sugar" DOUBLE PRECISION;

-- DropTable
DROP TABLE "macros";

-- CreateIndex
CREATE INDEX "macro_calories" ON "recipes"("calories");

-- CreateIndex
CREATE INDEX "macro_protein" ON "recipes"("protein");
