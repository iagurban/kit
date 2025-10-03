-- AlterEnum
ALTER TYPE "public"."UploadStatus" ADD VALUE 'FINALIZING';

-- DropForeignKey
ALTER TABLE "public"."UploadSession" DROP CONSTRAINT "UploadSession_fileId_fkey";

-- AddForeignKey
ALTER TABLE "public"."UploadSession" ADD CONSTRAINT "UploadSession_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "public"."StoredFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
