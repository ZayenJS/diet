/*
  Warnings:

  - You are about to drop the `units` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unit` to the `quantities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "quantities" DROP CONSTRAINT "quantities_unit_id_fkey";

-- AlterTable
ALTER TABLE "quantities" ADD COLUMN     "unit" "unit_enum" NOT NULL;

-- DropTable
DROP TABLE "units";
