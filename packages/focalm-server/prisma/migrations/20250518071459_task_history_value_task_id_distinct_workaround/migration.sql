/*
  Warnings:

  - Added the required column `taskId` to the `TaskHistoryValue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskHistoryValue" ADD COLUMN     "taskId" UUID NOT NULL;
