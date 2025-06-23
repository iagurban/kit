/*
  Warnings:

  - The primary key for the `TaskHistoryValue` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "TaskHistoryValue" DROP CONSTRAINT "TaskHistoryValue_pkey",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "TaskHistoryValue_pkey" PRIMARY KEY ("id");
