-- CreateEnum
CREATE TYPE "CreatedAtFixReason" AS ENUM ('Low', 'High');

-- AlterTable
ALTER TABLE "TaskHistoryGroup" ADD COLUMN     "createdAtFixReason" "CreatedAtFixReason";
