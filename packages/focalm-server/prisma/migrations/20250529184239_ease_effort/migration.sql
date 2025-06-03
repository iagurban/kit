/*
  Warnings:

  - The values [priority,urgency] on the enum `TaskHistoryKey` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `priority` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `urgency` on the `Task` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskHistoryKey_new" AS ENUM ('title', 'state', 'archived', 'impact', 'ease', 'authorId', 'responsibleId', 'orderKey', 'parentId');
ALTER TABLE "TaskHistoryValue" ALTER COLUMN "key" TYPE "TaskHistoryKey_new" USING ("key"::text::"TaskHistoryKey_new");
ALTER TYPE "TaskHistoryKey" RENAME TO "TaskHistoryKey_old";
ALTER TYPE "TaskHistoryKey_new" RENAME TO "TaskHistoryKey";
DROP TYPE "TaskHistoryKey_old";
COMMIT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "priority",
DROP COLUMN "urgency",
ADD COLUMN     "ease" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
ADD COLUMN     "impact" DOUBLE PRECISION NOT NULL DEFAULT 0.5;
