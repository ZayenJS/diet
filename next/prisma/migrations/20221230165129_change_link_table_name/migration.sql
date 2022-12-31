/*
  Warnings:

  - You are about to drop the `_RecipeToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecipeToTool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RecipeToTag" DROP CONSTRAINT "_RecipeToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToTag" DROP CONSTRAINT "_RecipeToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToTool" DROP CONSTRAINT "_RecipeToTool_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToTool" DROP CONSTRAINT "_RecipeToTool_B_fkey";

-- DropTable
DROP TABLE "_RecipeToTag";

-- DropTable
DROP TABLE "_RecipeToTool";

-- CreateTable
CREATE TABLE "_recipes_tags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_recipes_tools" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_recipes_tags_AB_unique" ON "_recipes_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_recipes_tags_B_index" ON "_recipes_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_recipes_tools_AB_unique" ON "_recipes_tools"("A", "B");

-- CreateIndex
CREATE INDEX "_recipes_tools_B_index" ON "_recipes_tools"("B");

-- AddForeignKey
ALTER TABLE "_recipes_tags" ADD CONSTRAINT "_recipes_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recipes_tags" ADD CONSTRAINT "_recipes_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recipes_tools" ADD CONSTRAINT "_recipes_tools_A_fkey" FOREIGN KEY ("A") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recipes_tools" ADD CONSTRAINT "_recipes_tools_B_fkey" FOREIGN KEY ("B") REFERENCES "tools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
