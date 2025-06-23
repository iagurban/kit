/*
  Warnings:

  - You are about to drop the column `desctiptionHtml` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "desctiptionHtml",
ADD COLUMN     "desctiption" TEXT NOT NULL DEFAULT '';
