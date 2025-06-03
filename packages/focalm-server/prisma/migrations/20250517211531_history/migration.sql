-- CreateEnum
CREATE TYPE "TaskHistoryKey" AS ENUM ('title', 'state', 'archived', 'priority', 'urgency');

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_responsibleId_fkey";

-- CreateTable
CREATE TABLE "TaskHistoryValue" (
    "groupId" UUID NOT NULL,
    "key" "TaskHistoryKey" NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "TaskHistoryValue_pkey" PRIMARY KEY ("groupId","key")
);

-- CreateTable
CREATE TABLE "TaskHistoryGroup" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "taskId" UUID NOT NULL,
    "localCreatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskHistoryGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskHistoryValue" ADD CONSTRAINT "TaskHistoryValue_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "TaskHistoryGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskHistoryGroup" ADD CONSTRAINT "TaskHistoryGroup_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
