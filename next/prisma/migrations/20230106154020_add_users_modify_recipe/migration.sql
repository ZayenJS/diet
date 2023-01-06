/*
  Warnings:

  - You are about to drop the column `images` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `calories` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `carbs` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `saturated` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `sugar` on the `recipes` table. All the data in the column will be lost.
  - Added the required column `creator_id` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "genders" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "activity_levels" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE');

-- DropIndex
DROP INDEX "macro_calories";

-- DropIndex
DROP INDEX "macro_protein";

-- DropIndex
DROP INDEX "recipe_rating";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "images",
ADD COLUMN     "calories" REAL,
ADD COLUMN     "carbs" REAL,
ADD COLUMN     "fat" REAL,
ADD COLUMN     "fiber" REAL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "protein" REAL,
ADD COLUMN     "saturated" REAL,
ADD COLUMN     "sugar" REAL;

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "calories",
DROP COLUMN "carbs",
DROP COLUMN "fat",
DROP COLUMN "protein",
DROP COLUMN "rating",
DROP COLUMN "saturated",
DROP COLUMN "sugar",
ADD COLUMN     "creator_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "auth_token" TEXT,
    "auth_token_expires" TIMESTAMP(3),
    "first_name" TEXT,
    "last_name" TEXT,
    "gender" "genders" NOT NULL,
    "role" "roles" NOT NULL DEFAULT 'USER',
    "birth_date" TIMESTAMP(3),
    "height" REAL,
    "weight" REAL,
    "activity_level" "activity_levels",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_ratings" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_users_favorite_recipes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "user_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "user_auth_token" ON "users"("auth_token");

-- CreateIndex
CREATE INDEX "user_auth_token_expires" ON "users"("auth_token_expires");

-- CreateIndex
CREATE UNIQUE INDEX "_users_favorite_recipes_AB_unique" ON "_users_favorite_recipes"("A", "B");

-- CreateIndex
CREATE INDEX "_users_favorite_recipes_B_index" ON "_users_favorite_recipes"("B");

-- CreateIndex
CREATE INDEX "product_calories" ON "products"("calories");

-- CreateIndex
CREATE INDEX "product_protein" ON "products"("protein");

-- CreateIndex
CREATE INDEX "product_sugar" ON "products"("sugar");

-- AddForeignKey
ALTER TABLE "recipe_ratings" ADD CONSTRAINT "recipe_ratings_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ratings" ADD CONSTRAINT "recipe_ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_favorite_recipes" ADD CONSTRAINT "_users_favorite_recipes_A_fkey" FOREIGN KEY ("A") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_favorite_recipes" ADD CONSTRAINT "_users_favorite_recipes_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
