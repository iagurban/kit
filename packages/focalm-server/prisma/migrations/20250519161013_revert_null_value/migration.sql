/*
  Warnings:

  - Made the column `value` on table `TaskHistoryValue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TaskHistoryValue" ALTER COLUMN "value" SET NOT NULL;
