/*
  Warnings:

  - The primary key for the `StoredFile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `storagePath` on the `StoredFile` table. All the data in the column will be lost.
  - The `id` column on the `StoredFile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `storedFileId` on the `UploadedFile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "UploadedFile" DROP CONSTRAINT "UploadedFile_storedFileId_fkey";

-- AlterTable
ALTER TABLE "StoredFile" DROP CONSTRAINT "StoredFile_pkey",
DROP COLUMN "storagePath",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "StoredFile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UploadedFile" DROP COLUMN "storedFileId",
ADD COLUMN     "storedFileId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_storedFileId_fkey" FOREIGN KEY ("storedFileId") REFERENCES "StoredFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
