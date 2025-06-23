-- CreateEnum
CREATE TYPE "PermissionKind" AS ENUM ('read', 'update', 'create', 'delete');

-- CreateEnum
CREATE TYPE "PermissionInProject" AS ENUM ('tasks', 'participants');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "tasksCounter" BIGINT NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "UserInProject" (
    "userId" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "permission" "PermissionInProject" NOT NULL,
    "kind" "PermissionKind" NOT NULL,

    CONSTRAINT "UserInProject_pkey" PRIMARY KEY ("userId","projectId","permission","kind")
);

-- AddForeignKey
ALTER TABLE "UserInProject" ADD CONSTRAINT "UserInProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInProject" ADD CONSTRAINT "UserInProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
