/*
  Warnings:

  - You are about to drop the column `dueTo` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `plannedStart` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `startAfter` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `TaskHistoryGroup` table. All the data in the column will be lost.
  - Added the required column `dueToDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plannedStartDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAfterDate` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TaskHistoryKey" ADD VALUE 'startAfterDate';
ALTER TYPE "TaskHistoryKey" ADD VALUE 'startAfterOffset';
ALTER TYPE "TaskHistoryKey" ADD VALUE 'plannedStartDate';
ALTER TYPE "TaskHistoryKey" ADD VALUE 'plannedStartOffset';
ALTER TYPE "TaskHistoryKey" ADD VALUE 'dueToDate';
ALTER TYPE "TaskHistoryKey" ADD VALUE 'dueToOffset';

-- DropForeignKey
ALTER TABLE "TaskHistoryGroup" DROP CONSTRAINT "TaskHistoryGroup_taskId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "dueTo",
DROP COLUMN "plannedStart",
DROP COLUMN "startAfter",
ADD COLUMN     "dueToDate" DATE NOT NULL,
ADD COLUMN     "dueToOffset" INTEGER,
ADD COLUMN     "plannedStartDate" DATE NOT NULL,
ADD COLUMN     "plannedStartOffset" INTEGER,
ADD COLUMN     "startAfterDate" DATE NOT NULL,
ADD COLUMN     "startAfterOffset" INTEGER;

-- AlterTable
ALTER TABLE "TaskHistoryGroup" DROP COLUMN "taskId";

-- AddForeignKey
ALTER TABLE "TaskHistoryValue" ADD CONSTRAINT "TaskHistoryValue_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
