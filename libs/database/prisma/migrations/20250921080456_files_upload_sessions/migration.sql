/*
  Warnings:

  - You are about to drop the column `hash` on the `StoredFile` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `StoredFile` table. All the data in the column will be lost.
  - You are about to drop the `ChatCounter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UploadedFile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[storageKey]` on the table `StoredFile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[checksum,sizeBytes]` on the table `StoredFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cdnUrl` to the `StoredFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checksum` to the `StoredFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `StoredFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalFilename` to the `StoredFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeBytes` to the `StoredFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storageKey` to the `StoredFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StoredFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedByUserId` to the `StoredFile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UploadStatus" AS ENUM ('ACTIVE', 'FAILED');

-- DropForeignKey
ALTER TABLE "public"."ChatCounter" DROP CONSTRAINT "ChatCounter_chatId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UploadedFile" DROP CONSTRAINT "UploadedFile_storedFileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UploadedFile" DROP CONSTRAINT "UploadedFile_uploaderId_fkey";

-- DropIndex
DROP INDEX "public"."StoredFile_hash_idx";

-- AlterTable
ALTER TABLE "public"."StoredFile" DROP COLUMN "hash",
DROP COLUMN "size",
ADD COLUMN     "cdnUrl" TEXT NOT NULL,
ADD COLUMN     "checksum" TEXT NOT NULL,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "originalFilename" TEXT NOT NULL,
ADD COLUMN     "sizeBytes" BIGINT NOT NULL,
ADD COLUMN     "storageKey" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uploadedByUserId" UUID NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;

-- DropTable
DROP TABLE "public"."ChatCounter";

-- DropTable
DROP TABLE "public"."UploadedFile";

-- CreateTable
CREATE TABLE "public"."UploadSession" (
    "id" UUID NOT NULL,
    "storageUploadId" TEXT NOT NULL,
    "fileId" UUID NOT NULL,
    "totalChunks" INTEGER NOT NULL,
    "status" "public"."UploadStatus" NOT NULL DEFAULT 'ACTIVE',
    "failReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UploadChunk" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "partNumber" INTEGER NOT NULL,
    "eTag" TEXT,

    CONSTRAINT "UploadChunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatEventsCounter" (
    "chatId" UUID NOT NULL,
    "lastNn" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "ChatEventsCounter_pkey" PRIMARY KEY ("chatId")
);

-- CreateTable
CREATE TABLE "public"."MessagesCounter" (
    "chatId" UUID NOT NULL,
    "lastNn" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "MessagesCounter_pkey" PRIMARY KEY ("chatId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UploadSession_storageUploadId_key" ON "public"."UploadSession"("storageUploadId");

-- CreateIndex
CREATE UNIQUE INDEX "UploadSession_fileId_key" ON "public"."UploadSession"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "UploadChunk_sessionId_partNumber_key" ON "public"."UploadChunk"("sessionId", "partNumber");

-- CreateIndex
CREATE UNIQUE INDEX "StoredFile_storageKey_key" ON "public"."StoredFile"("storageKey");

-- CreateIndex
CREATE INDEX "StoredFile_uploadedByUserId_idx" ON "public"."StoredFile"("uploadedByUserId");

-- CreateIndex
CREATE UNIQUE INDEX "StoredFile_checksum_sizeBytes_key" ON "public"."StoredFile"("checksum", "sizeBytes");

-- AddForeignKey
ALTER TABLE "public"."StoredFile" ADD CONSTRAINT "StoredFile_uploadedByUserId_fkey" FOREIGN KEY ("uploadedByUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UploadSession" ADD CONSTRAINT "UploadSession_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "public"."StoredFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UploadChunk" ADD CONSTRAINT "UploadChunk_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."UploadSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatEventsCounter" ADD CONSTRAINT "ChatEventsCounter_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MessagesCounter" ADD CONSTRAINT "MessagesCounter_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
