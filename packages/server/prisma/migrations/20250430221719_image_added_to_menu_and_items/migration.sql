/*
  Warnings:

  - Added the required column `menuId` to the `UploadedFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "UploadedFile" ADD COLUMN     "menuId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "UploadedFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
