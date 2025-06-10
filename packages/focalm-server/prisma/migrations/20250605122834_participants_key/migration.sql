-- CreateEnum
CREATE TYPE "TaskHistoryOperation" AS ENUM ('Set', 'Add', 'Remove');

-- AlterEnum
ALTER TYPE "TaskHistoryKey" ADD VALUE 'participants';

-- AlterTable
ALTER TABLE "TaskHistoryValue" ADD COLUMN     "op" "TaskHistoryOperation" NOT NULL DEFAULT 'Set';
