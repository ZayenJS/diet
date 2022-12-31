/*
  Warnings:

  - You are about to drop the column `images` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the `quantities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "quantities" DROP CONSTRAINT "quantities_ingredient_id_fkey";

-- DropIndex
DROP INDEX "ingredient_name";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "images",
DROP COLUMN "name",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "unit" "unit_enum" NOT NULL;

-- DropTable
DROP TABLE "quantities";

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_name" ON "products"("name");

-- CreateIndex
CREATE INDEX "ingredient_product_id" ON "ingredients"("product_id");

-- CreateIndex
CREATE INDEX "ingredient_recipe_id" ON "ingredients"("recipe_id");

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
