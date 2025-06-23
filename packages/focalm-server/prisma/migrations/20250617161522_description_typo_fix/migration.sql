/*
  Warnings:

  - You are about to drop the column `desctiption` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "desctiption",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';
