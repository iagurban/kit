/*
  Warnings:

  - Added the required column `authorId` to the `TaskHistoryGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskHistoryGroup" ADD COLUMN     "authorId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskHistoryGroup" ADD CONSTRAINT "TaskHistoryGroup_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
