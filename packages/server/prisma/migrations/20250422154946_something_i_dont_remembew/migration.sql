/*
  Warnings:

  - A unique constraint covering the columns `[menuId,parentId,orderKey]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Item_parentId_orderKey_key";

-- CreateIndex
CREATE UNIQUE INDEX "Item_menuId_parentId_orderKey_key" ON "Item"("menuId", "parentId", "orderKey");
