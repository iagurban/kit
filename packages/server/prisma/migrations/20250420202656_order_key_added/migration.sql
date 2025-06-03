/*
  Warnings:

  - A unique constraint covering the columns `[parentId,orderKey]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderKey` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "orderKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Item_parentId_orderKey_key" ON "Item"("parentId", "orderKey");
