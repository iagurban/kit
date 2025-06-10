-- CreateTable
CREATE TABLE "UserInTask" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "taskId" UUID NOT NULL,

    CONSTRAINT "UserInTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInTaskTag" (
    "userInTaskId" UUID NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "UserInTaskTag_pkey" PRIMARY KEY ("userInTaskId","tag")
);

-- AddForeignKey
ALTER TABLE "UserInTask" ADD CONSTRAINT "UserInTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInTask" ADD CONSTRAINT "UserInTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInTaskTag" ADD CONSTRAINT "UserInTaskTag_userInTaskId_fkey" FOREIGN KEY ("userInTaskId") REFERENCES "UserInTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;
