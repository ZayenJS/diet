/*
  Warnings:

  - A unique constraint covering the columns `[recipe_id]` on the table `macros` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "macros" DROP CONSTRAINT "macros_recipe_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "macros_recipe_id_key" ON "macros"("recipe_id");

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_id_fkey" FOREIGN KEY ("id") REFERENCES "macros"("recipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;
